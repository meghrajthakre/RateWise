const SearchHistory = require('../models/SearchHistory');
const { isDatabaseReady } = require('../config/db');
const { success, failure } = require('../utils/apiResponse');

function clientIdFrom(req) {
    return req.get('x-client-id') || req.body.clientId || req.query.clientId;
}

function requireDatabase(res) {
    if (!isDatabaseReady()) {
        failure(res, 'MongoDB is not connected', 'DATABASE_UNAVAILABLE', 503);
        return false;
    }
    return true;
}

async function createHistory(req, res) {
    if (!requireDatabase(res)) return;
    const clientId = clientIdFrom(req);
    if (!clientId) return failure(res, 'clientId or x-client-id is required', 'CLIENT_ID_REQUIRED', 400);
    const { location, checkIn, checkOut, guests, rooms, currency = 'INR' } = req.body;
    if (!location || !checkIn || !checkOut || guests < 1 || rooms < 1) {
        return failure(res, 'A complete valid search query is required', 'INVALID_HISTORY', 400);
    }
    return success(res, await SearchHistory.create({
        clientId, query: { location, checkIn, checkOut, guests, rooms, currency }
    }), 201);
}

async function listHistory(req, res) {
    if (!requireDatabase(res)) return;
    const clientId = clientIdFrom(req);
    if (!clientId) return failure(res, 'clientId or x-client-id is required', 'CLIENT_ID_REQUIRED', 400);
    return success(res, await SearchHistory.find({ clientId }).sort({ createdAt: -1 }));
}

async function deleteHistory(req, res) {
    if (!requireDatabase(res)) return;
    const clientId = clientIdFrom(req);
    if (!clientId) return failure(res, 'clientId or x-client-id is required', 'CLIENT_ID_REQUIRED', 400);
    const history = await SearchHistory.findOneAndDelete({ _id: req.params.id, clientId });
    if (!history) return failure(res, 'History entry not found', 'HISTORY_NOT_FOUND', 404);
    return success(res, { deleted: true });
}

module.exports = { createHistory, listHistory, deleteHistory };
