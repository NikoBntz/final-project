# Levinor

Levinor is a React/Vite frontend with an Express/Mongoose backend for a custom furniture catalog, contact form, admin dashboard, and AI assistant.

## Local setup

### Backend

Create `backend/.env`:

```env
MONGO_URI=<mongodb-connection-string>
PORT=3030
FRONTEND_URL=http://localhost:5173
MISTRAL_API_KEY=<mistral-api-key>
```

Run:

```bash
cd backend
npm install
npm run dev
```

The API runs on `http://localhost:3030`.

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3030
```

Run:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Assistant checks

1. Confirm `GET http://localhost:3030/health` returns `"ok": true`.
2. Open `/#/assistant`.
3. Send a catalog question in Spanish.
4. Confirm the response uses current MongoDB products.
5. If Mistral returns `429`, the UI shows a retry message. It does not invent a catalog fallback.

The Mistral key stays server-side. Never commit either `.env` file.

## Admin check

1. Open `/#/admin`.
2. Sign in with the configured admin credentials.
3. Confirm product and message counts load.
4. Test logout and session clearing.

## Validation

```bash
cd frontend
npm run lint
npm run build
```