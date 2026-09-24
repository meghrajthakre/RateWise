const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    clientId: { type: String, required: true, index: true },
    provider: { type: String, required: true },
    hotelId: { type: String, required: true },
    hotelName: { type: String, required: true },
    location: { type: Object, default: null },
    price: { type: Object, default: null },
    bookingUrl: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
