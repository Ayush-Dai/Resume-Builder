require('dotenv').config();
const PORT = process.env.PORT;
const connectToDB = require('./database/connectDB');
const helmet = require('helmet');
const { configureCors } = require('./config/corsConfig');
const express = require('express');
const app = express();
const routes = require('./routes/identity-routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const cookieParser = require('cookie-parser');



//middleware
app.use(helmet());
app.use(configureCors());
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);



app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next();
});

//database
connectToDB();

//routes
app.use('/api/auth', routes);

//server start
async function startServer() {
    try {
        app.listen(PORT, () => {
            logger.info(`Post service running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to connect to server');
        process.exit(1);
    }
}

startServer();


//unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
    logger.error('unhandledRejection at', promise, "reason:", reason);
})



