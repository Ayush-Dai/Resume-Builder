const RefreshToken = require('../models/refreshToken');
const User = require('../models/AuthModel');
const { generateTokens } = require('../utils/generateToken');
const axios = require('axios');
const logger = require('../utils/logger');
const { validateRegistration, validateLogin } = require('../utils/validation');

const crypto = require('crypto');
const { invalid } = require('joi');

async function invalidateCache(req) {
    try {
        const cacheKey = "usersList";
        await req.redisClient.del(cacheKey);
        logger.info("Cache invalidated for user list");
    } catch (error) {
        logger.error("Error invalidating cache:", error);
        throw new Error("Cache invalidation failed");
    }
}


//User registration
const registerUser = async (req, res) => {
    try {
        // Validate input using your Joi or custom schema
        const { error } = validateRegistration(req.body);
        if (error) {
            logger.warn(`Validation error: ${error.details[0].message}`);
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`Registration failed: User with email ${email} already exists`);
            return res.status(400).json({
                success: false,
                message: `User already exists!`
            });
        }

        // Create and save new user
        const user = new User({ firstName, lastName, email, password });
        await user.save();

        //invalidate cache after user registration
        await invalidateCache(req);


        logger.info(`User registered successfully. ID: ${user._id}`);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: user._id
        });

    } catch (error) {
        logger.error(`Registration failed: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


//Login User
const loginUser = async (req, res) => {
    logger.info(`Login endpoint hit...`);
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            logger.warn("Validation error:", error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { email, password } = req.body;
        console.log("Email:", email, "Password:", password)
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            logger.warn('Invalid credentials (user not found)');
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            logger.warn('Invalid password');
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        const cookieOptions = {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            path: '/',
            priority: 'high'
        };

        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'lax';
        }

        user.password = undefined;

        res.cookie('jwtPrac', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });
        return res.status(200).json({
            success: true,
            message: "user loged in successfully",
            user:{
                _id: user._id,
                email: user.email,
                name: user.firstName + ' ' + user.lastName,               
            }
        });

    } catch (error) {
        logger.error(`Login failed: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//google login
const googleLoginController = async (req, res) => {
    logger.info("Google login controller hit");
    try {
        const { access_token } = req.body;
        if (!access_token) {
            logger.warn("No access_token provided for Google login");
            return res.status(400).json({
                success: false,
                message: "No access_token provided"
            });
        }

        // Get user info from Google using the access_token
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const { email, name, picture } = userRes.data;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                firstName: name.split(' ')[0],
                lastName: name.split(' ')[1] || '',
                email,
                image: picture,
                password: crypto.randomBytes(32).toString("hex")
            });
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        const cookieOptions = {
            httpOnly: true,
            // maxAge: 3 * 24 * 60 * 60 * 1000,
            maxAge: 15 * 60 * 1000,
            path: '/',
            priority: 'high'
        };
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'lax';
        }
        res.cookie('jwtPrac', accessToken, cookieOptions);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "user loged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.firstName + ' ' + user.lastName,
                image: user.image
            }
        });

    } catch (error) {
        logger.error(`Login failed: ${error.message}`);
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}


//Refresh Token
const refreshTokenController = async (req, res) => {
    logger.info('Refresh Token endpoint hit...');
    try {
        const refreshToken = req.cookies?.refreshToken;
        console.log(refreshToken)
        if (!refreshToken) {
            logger.warn(`Refresh token missing`);
            return res.status(400).json({
                success: false,
                message: "Refresh token missing"
            });
        }

        const storedToken = await RefreshToken.findOne({ token: refreshToken });

        if (!storedToken || storedToken.expiresAt < new Date()) {
            logger.warn(`Invalid or expired refresh token`);
            return res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token"
            });
        }

        const user = await User.findById(storedToken.user);
        if (!user) {
            logger.warn('User not found');
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(user);

        await RefreshToken.deleteOne({ _id: storedToken._id });

        // Set new access token in cookie
        res.cookie('jwtPrac', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,

            path: '/'
        });

        // Set new refresh token in HttpOnly cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });
        logger.info(`Refresh token generated successfully for user ID: ${user._id}`);
        // Also return new access token
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        logger.error(`Refresh token failed: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

const logoutUser = async (req, res) => {
    logger.info(`Logout endpoint hit...`);
    try {
        const refreshToken = req.cookies?.refreshToken;
        console.log(refreshToken)
        if (!refreshToken) {
            logger.warn(`Refresh token missing`);
            return res.status(400).json({
                success: false,
                message: "Refresh Token missing"
            });
        }

        const result = await RefreshToken.deleteOne({ token: refreshToken });

        // Clear cookies
        res.clearCookie('jwtPrac', { path: '/' });
        res.clearCookie('refreshToken', { path: '/' });

        if (result.deletedCount === 0) {
            logger.warn(`Refresh token not found in database`);
            return res.status(200).json({
                success: true,
                message: "Refresh token not found, but logout completed"
            });
        }

        logger.info(`User logged out successfully`);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        logger.error(`Error while logging out: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



module.exports = {
    registerUser, loginUser,
    googleLoginController, refreshTokenController, logoutUser
};