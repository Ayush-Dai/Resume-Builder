const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectToDB = async () => {
    try {
        console.log(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL);
        logger.info('Connected to Database');
    } catch (e) {
        console.log(e);
        logger.error('Error while connecting to the database: %s', e.message);
        process.exit(1);
    }
};

module.exports = connectToDB;
