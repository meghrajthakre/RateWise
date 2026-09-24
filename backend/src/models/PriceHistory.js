const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
    provider: { type: String, required: true },
    hotelId: { type: String, required: true },
    hotelName: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    availability: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('PriceHistory', priceHistorySchema);
