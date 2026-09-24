const app = require('./app');
const env = require('./config/env');
const { connectDB } = require('./config/db');
const logger = require('./utils/logger');

async function startServer() {
    await connectDB();
    app.listen(env.port, () => {
        logger.info(`Server listening on port ${env.port}`);
    });
}

startServer().catch((error) => {
    logger.error(`Server startup failed: ${error.message}`);
    process.exitCode = 1;
});
