# Levinor backend

Express API for the Levinor catalog, contact form, admin panel, and assistant.

## Run

Create `.env` with:

```env
PORT=3030
HOST=0.0.0.0
MONGO_URI=mongodb+srv://...
FRONTEND_URL=http://localhost:5173,https://nikobntz.github.io
JWT_SECRET=replace-in-production
MISTRAL_API_KEY=optional
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace-in-production
```

Use:

```bash
npm install
npm run dev
```

The HTTP server starts even when MongoDB is unavailable. `/health` returns
`503` with `"status": "degraded"` until MongoDB connects. Database-backed routes
also return `503`, while the connection worker retries every 10 seconds.

`HOST=0.0.0.0` exposes the backend on all local network interfaces. During Vite
development, the frontend proxies `/api` and `/health` through port `5173`, so
other devices only need access to the frontend port. For a direct frontend
build, set `VITE_API_URL` to the computer's LAN address, for example
`http://192.168.1.20:3030`, and add its frontend origin to `FRONTEND_URL`.

## Checks

```bash
npm test
node --check server.js
```

`GET /health` is the readiness check. `GET /` confirms the API process is
running. Do not commit `.env` or any real credentials.
