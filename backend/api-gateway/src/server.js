require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const { AuthProxy,PdfDownloaderProxy, AdminPanelProxy } = require('./config/proxyConfiguration');
const { configureCors } = require('./config/corsConfig');

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(helmet());
app.use(configureCors());
app.use(express.json());
app.use(errorHandler);


app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next();
});



//proxies for services
app.use('/v1/auth', AuthProxy);
app.use('/v1/resume', PdfDownloaderProxy);
app.use('/v1/admin-dashboard', AdminPanelProxy);



//server start
app.listen(PORT, () => {
    logger.info(`Api gateway is running on port ${PORT}`);
    logger.info(`Auth service is running on port ${process.env.AUTH_SERVICE_URL}`);
    logger.info(`Pdf downloader service is running on port ${process.env.PDF_DOWNLOADER_SERVICE_URL}`);
})

