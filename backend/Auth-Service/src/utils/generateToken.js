const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/refreshToken');

const generateTokens = async (user) => {
    const accessToken = jwt.sign({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.role
    }, process.env.JWT_SECRET, { expiresIn: '120m' });

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt
    });

    return { accessToken, refreshToken };
};

module.exports = { generateTokens };
