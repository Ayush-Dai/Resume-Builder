const cors = require('cors');
const logger = require('../utils/logger');
const configureCors = () => {
    const allowedOrigins = [
        "http://localhost:5173"
    ];

    return cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin); 
            } else {
                logger.warn(`🌐 Blocked by CORS: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With'
        ],
        exposedHeaders: [
            'X-Total-Count',
            'Content-Range'
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 600
    });
};

module.exports = { configureCors };
