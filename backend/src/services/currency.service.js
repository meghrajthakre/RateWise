const ratesFromInr = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    AED: 0.044
};

function convert(amount, fromCurrency, toCurrency) {
    const from = fromCurrency.toUpperCase();
    const to = toCurrency.toUpperCase();
    if (from === to) return Number(amount);
    if (!ratesFromInr[from] || !ratesFromInr[to]) {
        throw new Error(`Unsupported currency conversion: ${from} to ${to}`);
    }
    return Number((amount / ratesFromInr[from] * ratesFromInr[to]).toFixed(2));
}

function convertResult(result, targetCurrency) {
    if (!targetCurrency || result.price.currency === targetCurrency) return result;
    const price = result.price;
    return {
        ...result,
        price: {
            ...price,
            amount: convert(price.amount, price.currency, targetCurrency),
            taxes: price.taxes === null ? null : convert(price.taxes, price.currency, targetCurrency),
            fees: price.fees === null ? null : convert(price.fees, price.currency, targetCurrency),
            total: price.total === null ? null : convert(price.total, price.currency, targetCurrency),
            currency: targetCurrency
        }
    };
}

module.exports = { convert, convertResult };
