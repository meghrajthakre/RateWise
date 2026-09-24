const PriceHistory = require('../models/PriceHistory');
const { isDatabaseReady } = require('../config/db');

async function recordAuthorizedPrices(results) {
    if (!results.length || !isDatabaseReady()) return;
    await PriceHistory.insertMany(results.map((result) => ({
        provider: result.provider,
        hotelId: result.hotelId,
        hotelName: result.hotelName,
        price: result.price.total,
        currency: result.price.currency,
        availability: result.available,
        timestamp: result.fetchedAt || new Date()
    })));
}

module.exports = { recordAuthorizedPrices };
