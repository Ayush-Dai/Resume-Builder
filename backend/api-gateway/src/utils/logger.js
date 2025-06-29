const winston = require('winston');
const path = require('path');


const logDir = path.join(__dirname, '..', 'logs');

const isProduction = process.env.NODE_ENV === 'production';

const logger = winston.createLogger({
    level: isProduction ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'api-service' },

    transports: [

        new winston.transports.Console({
            format: isProduction
                ? winston.format.simple()
                : winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                ),
        }),


        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
        }),


        new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
            level: 'debug',
        }),
    ],
});

module.exports = logger;
