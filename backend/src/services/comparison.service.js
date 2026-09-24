const env = require('../config/env');
const { normalizeResult } = require('../providers/base/provider.interface');
const MockProvider = require('../providers/mock/mock.provider');
const BookingProvider = require('../providers/booking/booking.provider');
const ExpediaProvider = require('../providers/expedia/expedia.provider');
const KayakProvider = require('../providers/kayak/kayak.provider');
const OyoProvider = require('../providers/oyo/oyo.provider');
const AirbnbProvider = require('../providers/airbnb/airbnb.provider');
const { convertResult } = require('./currency.service');
const { recordAuthorizedPrices } = require('./history.service');
const logger = require('../utils/logger');

const providers = {
    mock: new MockProvider(),
    booking: new BookingProvider(),
    expedia: new ExpediaProvider(),
    kayak: new KayakProvider(),
    oyo: new OyoProvider(),
    airbnb: new AirbnbProvider()
};

async function compare(query) {
    const results = [];
    const statuses = {};
    const enabled = Object.entries(env.providers).filter(([, isEnabled]) => isEnabled);

    await Promise.all(enabled.map(async ([name]) => {
        try {
            const providerResults = await providers[name].search(query);
            const normalizedResults = providerResults.map(normalizeResult);
            results.push(...normalizedResults.map((result) => convertResult(result, query.currency)));
            statuses[name] = 'success';
        } catch (error) {
            statuses[name] = 'error';
            logger.warn(`${name} provider failed: ${error.message}`);
        }
    }));

    for (const name of Object.keys(providers)) {
        if (!env.providers[name]) statuses[name] = 'disabled';
    }

    try {
        await recordAuthorizedPrices(results);
    } catch (error) {
        logger.warn(`Price history was not recorded: ${error.message}`);
    }

    return { results, providers: statuses };
}

module.exports = { compare };
