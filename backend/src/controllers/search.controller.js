const crypto = require('crypto');
const { compare } = require('../services/comparison.service');
const { success } = require('../utils/apiResponse');

async function search(req, res) {
    const { location, checkIn, checkOut, guests, rooms, currency } = req.body;
    const comparison = await compare({ location, checkIn, checkOut, guests, rooms, currency });

    return success(res, {
        searchId: crypto.randomUUID(),
        query: { location, checkIn, checkOut, guests, rooms, currency },
        results: comparison.results,
        providers: comparison.providers
    });
}

module.exports = { search };
