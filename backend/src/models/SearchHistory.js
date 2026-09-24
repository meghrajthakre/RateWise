const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    clientId: { type: String, required: true, index: true },
    query: {
        location: { type: String, required: true },
        checkIn: { type: String, required: true },
        checkOut: { type: String, required: true },
        guests: { type: Number, required: true },
        rooms: { type: Number, required: true },
        currency: { type: String, default: 'INR' }
    }
}, { timestamps: true });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
