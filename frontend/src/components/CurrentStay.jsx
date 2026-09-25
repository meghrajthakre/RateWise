import { nightsBetween } from '../utils/formatPrice';

export default function CurrentStay({ detection, query, onRefresh }) {
  const stay = detection || query;
  if (!stay?.location && !stay?.name) return null;
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  return (
    <section className="stay-panel" aria-label="Current stay">
      <div className="stay-icon" aria-hidden="true">⌂</div>
      <div className="stay-details">
        <span className="eyebrow">Current stay</span>
        <strong>{stay.name || 'Accommodation search'}</strong>
        <span>{stay.location || 'Location detected from your search'}</span>
        {(stay.guests || nights) ? <small>{stay.guests || 2} guests{nights ? ` · ${nights} nights` : ''}</small> : null}
      </div>
      <button className="icon-button muted" type="button" onClick={onRefresh} aria-label="Refresh detected stay" title="Refresh detected stay">↻</button>
    </section>
  );
}