const { ProviderInterface } = require('../base/provider.interface');

class BookingProvider extends ProviderInterface {
    constructor() { super('booking'); }

    async search() {
        throw new Error('Booking official API adapter is not configured');
    }
}

module.exports = BookingProvider;
