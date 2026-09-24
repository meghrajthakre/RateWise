const { ProviderInterface } = require('../base/provider.interface');

class OyoProvider extends ProviderInterface {
    constructor() { super('oyo'); }

    async search() {
        throw new Error('OYO official API adapter is not configured');
    }
}

module.exports = OyoProvider;
