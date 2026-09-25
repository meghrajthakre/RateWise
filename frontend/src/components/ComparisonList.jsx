import ProviderCard from './ProviderCard';
import { formatPrice, nightsBetween } from '../utils/formatPrice';

export default function ComparisonList({ results, query }) {
    const validResults = results.filter((result) => result?.available !== false && result?.price?.total !== null && result?.price?.total !== undefined);
    const lowest = validResults.reduce((current, result) => !current || result.price.total < current.price.total ? result : current, null);
    const nights = nightsBetween(query.checkIn, query.checkOut);
    if (!validResults.length) return null;
    return <section className="results-section" aria-label="Comparison results">
        <div className="section-heading"><div><span className="eyebrow">Live comparison</span><h2>Available rates</h2></div><span className="result-count">{validResults.length} found</span></div>
        {lowest ? <div className="lowest-banner"><span className="lowest-icon">↓</span><div><span>Lowest price</span><strong>{formatPrice(lowest.price.total, lowest.price.currency)}</strong></div><small>{lowest.provider === 'mock' ? 'RateWise mock' : lowest.provider}</small></div> : null}
        <div className="provider-list">{validResults.map((result) => <ProviderCard key={`${result.provider}-${result.hotelId}`} result={result} nights={nights} />)}</div>
    </section>;
}