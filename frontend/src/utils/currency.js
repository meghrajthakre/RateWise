export const currencies = ['INR', 'USD', 'EUR', 'GBP'];

export function currencySymbol(currency) {
  return { INR: '₹', USD: '$', EUR: '€', GBP: '£' }[currency] || currency;
}