import { currencies } from '../utils/currency';

export default function SearchForm({ values, onChange, onSubmit, loading }) {
  const update = (event) => onChange({ ...values, [event.target.name]: event.target.value });
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="form-heading"><span className="eyebrow">Manual search</span><h2>Find your stay</h2></div>
      <label>Location<input name="location" value={values.location} onChange={update} placeholder="e.g. Mumbai" required /></label>
      <div className="form-grid">
        <label>Check-in<input type="date" name="checkIn" value={values.checkIn} onChange={update} required /></label>
        <label>Check-out<input type="date" name="checkOut" value={values.checkOut} onChange={update} required /></label>
      </div>
      <div className="form-grid three">
        <label>Guests<input type="number" min="1" max="20" name="guests" value={values.guests} onChange={update} required /></label>
        <label>Rooms<input type="number" min="1" max="10" name="rooms" value={values.rooms} onChange={update} required /></label>
        <label>Currency<select name="currency" value={values.currency} onChange={update}>{currencies.map((currency) => <option key={currency}>{currency}</option>)}</select></label>
      </div>
      <button className="primary-button" type="submit" disabled={loading}>{loading ? 'Comparing…' : 'Compare prices'} <span aria-hidden="true">→</span></button>
    </form>
  );
}