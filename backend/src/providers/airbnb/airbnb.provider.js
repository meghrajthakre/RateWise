const { ProviderInterface } = require('../base/provider.interface');

class AirbnbProvider extends ProviderInterface {
    constructor() { super('airbnb'); }

    async search() {
        throw new Error('Airbnb official API adapter is not configured');
    }
}

module.exports = AirbnbProvider;
