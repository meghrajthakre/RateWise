const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const { success } = require('./utils/apiResponse');
const searchRoutes = require('./routes/search.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const historyRoutes = require('./routes/history.routes');
const { validateSearch } = require('./middleware/validation.middleware');
const notFoundMiddleware = require('./middleware/notFound.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
const allowedOrigins = env.clientUrl === '*' ? true : env.clientUrl.split(',').map((origin) => origin.trim());

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (req, res) => success(res, {
    status: 'ok',
    timestamp: new Date().toISOString()
}));
app.use('/api/search', validateSearch, searchRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/history', historyRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
