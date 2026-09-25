import { formatPrice } from '../utils/formatPrice';

const providerNames = { mock: 'RateWise mock', booking: 'Booking.com', expedia: 'Expedia', kayak: 'KAYAK', oyo: 'OYO', airbnb: 'Airbnb' };

export default function ProviderCard({ result, nights }) {
  const price = result.price || {};
  return (
    <article className="provider-card">
      <div className="provider-top"><div className="provider-icon">{(providerNames[result.provider] || result.provider || '?').slice(0, 1)}</div><div><strong>{providerNames[result.provider] || result.provider || 'Provider'}</strong><span>{result.roomName || 'Available room'}</span></div><span className="available-dot" aria-label="Available" /></div>
      <div className="provider-bottom"><div><strong className="price">{formatPrice(price.total, price.currency)}</strong><span>{nights || 1} nights{result.rating ? ` · ${result.rating} ★` : ''}</span></div>{result.bookingUrl ? <a className="deal-link" href={result.bookingUrl} target="_blank" rel="noreferrer">View deal <span aria-hidden="true">↗</span></a> : <span className="muted-label">Rate found</span>}</div>
    </article>
  );
}