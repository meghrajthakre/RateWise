const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

async function connectDB() {
    if (!env.mongoUri) {
        logger.warn('MONGO_URI is not configured; MongoDB-backed APIs will be unavailable.');
        return false;
    }

    try {
        await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 });
        logger.info('MongoDB connected');
        return true;
    } catch (error) {
        logger.error(`MongoDB connection failed: ${error.message}`);
        return false;
    }
}

function isDatabaseReady() {
    return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isDatabaseReady };
