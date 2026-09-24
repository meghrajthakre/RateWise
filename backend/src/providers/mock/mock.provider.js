const { ProviderInterface, normalizeResult } = require('../base/provider.interface');

class MockProvider extends ProviderInterface {
    constructor() {
        super('mock');
    }

    async search({ location }) {
        const city = location.trim();
        const fetchedAt = new Date().toISOString();
        const hotels = [
            {
                provider: 'mock', hotelId: 'mock-001', hotelName: `${city} Grand Hotel`,
                location: { city, country: 'India' },
                price: { amount: 4200, currency: 'INR', taxes: 500, fees: 0, total: 4700 },
                rating: 4.4, reviewCount: 1200, roomName: 'Deluxe Room',
                cancellationPolicy: 'Free cancellation', available: true, bookingUrl: null, fetchedAt
            },
            {
                provider: 'mock', hotelId: 'mock-002', hotelName: `${city} Central Suites`,
                location: { city, country: 'India' },
                price: { amount: 3650, currency: 'INR', taxes: 438, fees: 100, total: 4188 },
                rating: 4.1, reviewCount: 864, roomName: 'Executive Suite',
                cancellationPolicy: null, available: true, bookingUrl: null, fetchedAt
            },
            {
                provider: 'mock', hotelId: 'mock-003', hotelName: `The ${city} Residency`,
                location: { city, country: 'India' },
                price: { amount: 2800, currency: 'INR', taxes: 336, fees: 0, total: 3136 },
                rating: 3.9, reviewCount: 512, roomName: 'Standard Room',
                cancellationPolicy: 'Non-refundable', available: true, bookingUrl: null, fetchedAt
            }
        ];

        return hotels.map(normalizeResult);
    }
}

module.exports = MockProvider;
