import { useState } from 'react';
import Header from '../components/Header';
import CurrentStay from '../components/CurrentStay';
import SearchForm from '../components/SearchForm';
import ComparisonList from '../components/ComparisonList';
import StatusRow from '../components/StatusRow';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import useHotelDetection from '../hooks/useHotelDetection';
import { searchHotels } from '../services/api';

const initialQuery = { location: '', checkIn: '', checkOut: '', guests: 2, rooms: 1, currency: 'INR' };

export default function SidePanel({ detection }) {
    const detected = useHotelDetection(detection);
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState(null);
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [manualOpen, setManualOpen] = useState(false);

    const runSearch = async (event, submittedQuery = query) => {
        event?.preventDefault();
        setLoading(true); setError(false);
        try {
            const data = await searchHotels({ ...submittedQuery, guests: Number(submittedQuery.guests), rooms: Number(submittedQuery.rooms) });
            setResults(Array.isArray(data.results) ? data.results : []); setProviders(data.providers || null);
        } catch { setError(true); setResults(null); }
        finally { setLoading(false); }
    };

    const searchFromDetection = () => {
        const nextQuery = { ...query, location: detected?.location || '', guests: detected?.guests || 2 };
        setQuery(nextQuery); setManualOpen(true);
    };

    return <main className="shell"><Header /><div className="content"><CurrentStay detection={detected} query={query} onRefresh={() => globalThis.location.reload()} />
        {!loading && !results && !error ? <EmptyState onSearch={() => setManualOpen(true)} /> : null}
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState onRetry={(event) => runSearch(event)} /> : null}
        {results ? <><ComparisonList results={results} query={query} /><StatusRow providers={providers} />{!results.length ? <EmptyState onSearch={() => setManualOpen(true)} /> : null}</> : null}
        {manualOpen ? <SearchForm values={query} onChange={setQuery} onSubmit={runSearch} loading={loading} /> : (!loading && !results && !error && detected ? <button className="text-button" type="button" onClick={searchFromDetection}>Use detected stay details →</button> : null)}
    </div><footer>RateWise only compares data supplied by your connected backend.</footer></main>;
}