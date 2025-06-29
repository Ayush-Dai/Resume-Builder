const proxy = require('express-http-proxy');
const logger = require('../utils/logger');

const proxyOptions = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1/, "/api");
    },
    proxyErrorHandler: (err, res, next) => {
        logger.error(`Proxy error: ${err.message}`);
        res.status(500).json({
            message: `Internal server error`,
            error: err.message
        })
    }
}

//Auth service proxy management
const AuthProxy = proxy(process.env.AUTH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, scrReq) => {
        proxyReqOpts.headers["Content-Type"] = "application/json"
        return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response received from auth service : ${proxyRes.statusCode}`);
        return proxyResData
    }

})

// Pdf Downloader service proxy management
const PdfDownloaderProxy = proxy(process.env.PDF_DOWNLOADER_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, scrReq) => {
        proxyReqOpts.headers["Content-Type"] = "application/json"
        return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response received from pdf downloader service : ${proxyRes.statusCode}`);
        return proxyResData
    }
})

// Admin Panem service proxy management
const AdminPanelProxy= proxy(process.env.ADMIN_PANEL_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, scrReq) => {
        proxyReqOpts.headers["Content-Type"] = "application/json"
        return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response received from admin panel service : ${proxyRes.statusCode}`);
        return proxyResData
    }
})

module.exports = { AuthProxy ,PdfDownloaderProxy, AdminPanelProxy };