const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Log error with timestamp and stack trace
  logger.error(`[${new Date().toISOString()}] ${err.stack || err}`);

  // Default to 500 Internal Server Error if status not set
  const statusCode = err.status || 500;

  // Build error response
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Optionally include error details in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
    // For validation errors (e.g., Mongoose), include error details if available
    if (err.errors) {
      response.errors = err.errors;
    }
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
