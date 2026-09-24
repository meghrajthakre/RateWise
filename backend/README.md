# Hotel Price Comparison Backend

Backend foundation for a Chrome Extension that compares accommodation prices through official provider APIs. This project does not scrape websites, use private endpoints, bypass bot protection, or connect to real provider APIs yet.

> Authentication is intentionally not implemented in the current version and will be added in a later phase.

## Architecture

- `src/providers`: common provider contract, a working mock provider, and explicit adapters for Booking.com, Expedia, KAYAK, OYO, and Airbnb.
- `src/services`: comparison orchestration, static currency conversion, and authorized price-history persistence.
- `src/models`: Mongoose schemas for anonymous search history, favorites, and price history.
- `src/controllers` and `src/routes`: REST API boundaries.
- `src/middleware`: validation, security error handling, and not-found handling.

## Installation

```bash
cd backend
npm install
copy .env.example .env
```

On macOS/Linux, use `cp .env.example .env` instead of `copy`.

## Environment Variables

See `.env.example`. `MONGO_URI`, `PORT`, `CLIENT_URL`, provider enabled flags, and placeholder provider credentials are supported. Provider API keys are never returned by the API. The mock provider is enabled by default.

## MongoDB Setup

Install MongoDB locally or use an authorized MongoDB deployment. Set `MONGO_URI` in `.env`, for example:

```text
MONGO_URI=mongodb://127.0.0.1:27017/hotel_price_comparison
```

The server still starts when MongoDB is unavailable so health and mock search can be tested. Favorites, history, and price-history persistence return `503 DATABASE_UNAVAILABLE` until MongoDB connects.

## Running Locally

```bash
npm run dev
```

Or:

```bash
npm start
```

The default base URL is `http://localhost:5000`.

## API Endpoints

- `GET /api/health`
- `POST /api/search`
- `POST /api/favorites`
- `GET /api/favorites?clientId=...`
- `DELETE /api/favorites/:id?clientId=...`
- `POST /api/history`
- `GET /api/history?clientId=...`
- `DELETE /api/history/:id?clientId=...`

Favorites and history use the `x-client-id` header or temporary `clientId` request/query value. This is anonymous and is not authentication.

All responses follow `{ success, data }` on success and `{ success, message, code }` on error.

## Search Example

```http
POST /api/search
Content-Type: application/json

{
  "location": "Mumbai",
  "checkIn": "2026-10-12",
  "checkOut": "2026-10-14",
  "guests": 2,
  "rooms": 1,
  "currency": "INR"
}
```

The response contains normalized results from enabled providers and a provider status map. With defaults, `mock` is `success` and all real providers are `disabled`.

## Provider Architecture

Every provider implements `search({ location, checkIn, checkOut, guests, rooms })` and returns normalized accommodation records. Enable a provider only after an official/authorized API adapter is implemented and its credentials are configured. Provider calls run independently; a failure is reported as that provider's `error` status while successful results remain in the response.

The mock provider returns realistic deterministic hotel data and lets the complete comparison flow run without external credentials.

### Adding a Provider

1. Extend `ProviderInterface` in a new provider directory.
2. Integrate only documented, authorized APIs using environment configuration.
3. Return normalized records through `normalizeResult`.
4. Register the provider and its enabled flag in `comparison.service.js` and `env.js`.
5. Add focused integration tests before enabling it in production.

## Price History

Price history is written only after a provider adapter successfully returns normalized results. There is no scheduler or scraping job.

## Authentication Later

Authentication can be added by introducing a User model, authentication routes, token middleware, and replacing the temporary `clientId` ownership field with a migration-compatible user reference. No authentication code, User model, password handling, JWT, or auth routes exist in this phase.
