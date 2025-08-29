GovConnect Backend

Simple Express backend with in-memory storage.

Setup

1. Install deps

```
npm install
```

2. Run (dev)

```
npm run dev
```

3. Env (optional)

Create `.env` and set:

```
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

API

- GET `/health`
- GET `/api/projects`
- GET `/api/feedback`
- POST `/api/feedback` { rating: 1-5, comment?, feedbackType? }


