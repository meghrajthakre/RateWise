const { ProviderInterface } = require('../base/provider.interface');

class KayakProvider extends ProviderInterface {
    constructor() { super('kayak'); }

    async search() {
        throw new Error('KAYAK official API adapter is not configured');
    }
}

module.exports = KayakProvider;
