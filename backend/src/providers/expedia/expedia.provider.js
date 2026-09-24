const { ProviderInterface } = require('../base/provider.interface');

class ExpediaProvider extends ProviderInterface {
    constructor() { super('expedia'); }

    async search() {
        throw new Error('Expedia official API adapter is not configured');
    }
}

module.exports = ExpediaProvider;
