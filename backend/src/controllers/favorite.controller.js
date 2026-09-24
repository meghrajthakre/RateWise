const Favorite = require('../models/Favorite');
const { isDatabaseReady } = require('../config/db');
const { success, failure } = require('../utils/apiResponse');

function requireDatabase(res) {
    if (!isDatabaseReady()) {
        failure(res, 'MongoDB is not connected', 'DATABASE_UNAVAILABLE', 503);
        return false;
    }
    return true;
}

function clientIdFrom(req) {
    return req.get('x-client-id') || req.body.clientId || req.query.clientId;
}

async function createFavorite(req, res) {
    if (!requireDatabase(res)) return;
    const clientId = clientIdFrom(req);
    if (!clientId) return failure(res, 'clientId or x-client-id is required', 'CLIENT_ID_REQUIRED', 400);
    const { provider, hotelId, hotelName, location, price, bookingUrl } = req.body;
    if (!provider || !hotelId || !hotelName) {
        return failure(res, 'provider, hotelId and hotelName are required', 'INVALID_FAVORITE', 400);
    }
    const favorite = await Favorite.create({ clientId, provider, hotelId, hotelName, location, price, bookingUrl });
    return success(res, favorite, 201);
}

async function listFavorites(req, res) {
    if (!requireDatabase(res)) return;
    const clientId = clientIdFrom(req);
    if (!clientId) return failure(res, 'clientId or x-client-id is required', 'CLIENT_ID_REQUIRED', 400);
    return success(res, await Favorite.find({ clientId }).sort({ createdAt: -1 }));
}

async function deleteFavorite(req, res) {
    if (!requireDatabase(res)) return;
    const clientId = clientIdFrom(req);
    if (!clientId) return failure(res, 'clientId or x-client-id is required', 'CLIENT_ID_REQUIRED', 400);
    const favorite = await Favorite.findOneAndDelete({ _id: req.params.id, clientId });
    if (!favorite) return failure(res, 'Favorite not found', 'FAVORITE_NOT_FOUND', 404);
    return success(res, { deleted: true });
}

module.exports = { createFavorite, listFavorites, deleteFavorite };
