const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function asBoolean(value, defaultValue = false) {
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true';
}

const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    mongoUri: process.env.MONGO_URI || '',
    clientUrl: process.env.CLIENT_URL || '*',
    providers: {
        booking: asBoolean(process.env.BOOKING_ENABLED),
        expedia: asBoolean(process.env.EXPEDIA_ENABLED),
        kayak: asBoolean(process.env.KAYAK_ENABLED),
        oyo: asBoolean(process.env.OYO_ENABLED),
        airbnb: asBoolean(process.env.AIRBNB_ENABLED),
        mock: asBoolean(process.env.MOCK_PROVIDER_ENABLED, true)
    }
};

module.exports = env;
