import { currencySymbol } from './currency';

export function formatPrice(amount, currency = 'INR') {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return '—';
  return `${currencySymbol(currency)}${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(Number(amount))}`;
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, Math.round((new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) / 86400000));
}