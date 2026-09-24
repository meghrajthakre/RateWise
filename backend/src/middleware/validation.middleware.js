const { failure } = require('../utils/apiResponse');

function isValidDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function validateSearch(req, res, next) {
    const { location, checkIn, checkOut, guests, rooms } = req.body || {};
    const numericGuests = Number(guests);
    const numericRooms = Number(rooms);

    if (typeof location !== 'string' || !location.trim()) {
        return failure(res, 'location is required', 'LOCATION_REQUIRED', 400);
    }
    if (!isValidDate(checkIn) || !isValidDate(checkOut)) {
        return failure(res, 'checkIn and checkOut must be valid dates in YYYY-MM-DD format', 'INVALID_DATE', 400);
    }
    if (checkOut <= checkIn) {
        return failure(res, 'checkOut must be after checkIn', 'INVALID_DATE_RANGE', 400);
    }
    if (!Number.isInteger(numericGuests) || numericGuests < 1 || numericGuests > 20) {
        return failure(res, 'guests must be an integer between 1 and 20', 'INVALID_GUESTS', 400);
    }
    if (!Number.isInteger(numericRooms) || numericRooms < 1 || numericRooms > 10) {
        return failure(res, 'rooms must be an integer between 1 and 10', 'INVALID_ROOMS', 400);
    }
    if (req.body.currency !== undefined && !/^[A-Za-z]{3}$/.test(req.body.currency)) {
        return failure(res, 'currency must be a three-letter currency code', 'INVALID_CURRENCY', 400);
    }

    req.body.guests = numericGuests;
    req.body.rooms = numericRooms;
    req.body.currency = (req.body.currency || 'INR').toUpperCase();
    req.body.location = location.trim();
    next();
}

module.exports = { validateSearch };
