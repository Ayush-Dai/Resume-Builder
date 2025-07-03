const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLoginController, logoutUser, refreshTokenController } = require('../controllers/identity-controller');
const authMiddleware  = require('../middleware/authMiddleware');
const adminMiddleware  = require('../middleware/adminMiddleware');
const checkAuth  = require('../controllers/checkAuthController');
const Redis=require('ioredis');
const redisClient= new Redis(process.env.REDIS_URL);


router.post('/register',(req,res,next)=>{
    req.redisClient=redisClient;
    next();
}, registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLoginController);
router.post('/logout', logoutUser);
router.get('/check-auth', authMiddleware, checkAuth);
router.post('/refresh', refreshTokenController);
module.exports = router;