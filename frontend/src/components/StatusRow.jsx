const labels = { mock: 'RateWise mock', booking: 'Booking.com', expedia: 'Expedia', kayak: 'KAYAK', oyo: 'OYO', airbnb: 'Airbnb' };

export default function StatusRow({ providers }) {
    if (!providers) return null;
    return <details className="status-details"><summary>Provider connections</summary><div className="status-list">{Object.entries(providers).map(([provider, status]) => <div key={provider}><span className={`status-dot ${status}`} />{labels[provider] || provider}<span className="status-text">{status === 'success' ? 'Connected' : status === 'disabled' ? 'Not connected' : 'Unavailable'}</span></div>)}</div></details>;
}