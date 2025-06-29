const jwt = require('jsonwebtoken');
const User = require('../models/AuthModel');
const logger = require('../utils/logger');


const authMiddleware = async (req, res, next) => {
    try {
        logger.info('Auth middleware running');
        logger.info('Cookies received:', req.cookies);

        const token = req.cookies.jwtPrac;

        if (!token) {
            console.log('No jwtPrac cookie found');
            return res.status(401).json({
                success: false,
                message: "You are not logged in. Please log in to get access"
            });
        }

        logger.info('Token found, verifying...');

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });
        console.log('Token verified, user ID:', decoded._id);

        const currentUser = await User.findById(decoded.userId);
        if (!currentUser) {
            console.log('User not found in database');
            return res.status(401).json({
                success: false,
                message: 'Token expired, please log in again'
            });
        }

        console.log('User found:', currentUser.email);

        currentUser.password = undefined;
        req.user = currentUser;
        console.log('Middleware - User attached to req:', req.user);
        next();

    } catch (err) {
        console.error('Auth middleware error:', err);

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again.'
            });
        }

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Your token has expired. Please log in again."
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = authMiddleware;