import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const client = axios.create({ baseURL: API_URL, timeout: 15000, headers: { 'Content-Type': 'application/json' } });

export async function searchHotels(payload) {
  const response = await client.post('/search', payload);
  return response.data?.data || response.data;
}