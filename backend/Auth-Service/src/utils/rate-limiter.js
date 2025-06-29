const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const logger = require('../utils/logger');


//DDOS protection and rate limiting
const redisClient = new Redis(process.env.REDIS_URL);

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 200,          // 200 requests
    duration: 600          // per 10 minutes
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
        .consume(req.ip)
        .then(() => next())
        .catch(() => {
            logger.warn(`Rate Limit exceeded for IP: ${req.ip}`);
            res.status(429).json({
                success: false,
                message: "Too many requests"
            });
        });
};

//IP based rate limiting for sensitive endpoints
const sensitiveEndPointsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn(`sensitive endpoint rate limit exceeded for IP : ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many requests'
        })

    },
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args)
    }),
})

module.exports = { rateLimiterMiddleware, sensitiveEndPointsLimiter };
