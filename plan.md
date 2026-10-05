# Levinor Final Project: Master TODO (Oct 4 to Oct 31, 2026)

**Stack:** React (Vite) on GitHub Pages, Express API on Render, MongoDB Atlas, Mistral API (key only in backend).
**Rules from the brief:** Git with 15+ commits, GitHub repo, deployed on GitHub Pages, responsive, animations allowed via libraries.
**Working rules:** one branch per task, merge to `main` only when it works, commit small and often, no secrets in Git.

---

## Phase 0: Decisions and setup (Oct 4 to 5)

- [x] Decide content with mom: 8 to 10 products (name, category, description, photo)
- [x] Choose logo, 2 to 3 brand colors, 1 or 2 fonts
- [x] Write "about" text and contact data (WhatsApp, Instagram, city)
- [x] Sketch Home and Catalog (paper or Canva)
- [x] Create GitHub repo with `frontend/` and `backend/`
- [x] Add `.gitignore` (`node_modules`, `.env`, `dist`) and a first `README.md`
- [x] Vite + React in `frontend/`, set `base` for GitHub Pages
- [x] Use `HashRouter` and create pages: Home, Catalog, Contact, Admin
- [ ] **Deploy to GitHub Pages and check the live URL**

## Phase 1: Frontend base (Oct 6 to 8)

- [ ] CSS variables for colors, fonts, spacing
- [ ] Responsive navbar, hero, about section, featured products, footer
- [ ] Reusable `ProductCard` and catalog grid with local `products.json`
- [ ] Category filter and empty state
- [ ] Test at mobile width and desktop, then redeploy

## Phase 2: Backend and catalog from DB (Oct 8 to 12)

- [ ] MongoDB Atlas cluster, DB user, connection string in `.env`
- [ ] Express server with `GET /health`, `cors` limited to your GitHub Pages origin
- [ ] `Product` model (name, category, description, imageUrl, createdAt)
- [ ] Seed script with your real products
- [ ] `GET /api/products` working locally
- [ ] **Deploy API to Render and set environment variables**
- [ ] Frontend: API URL in `.env` (`VITE_API_URL`), fetch products with loading and error states
- [ ] Redeploy frontend and check it shows DB data on the live URL

## Phase 3: Contact form (Oct 13 to 15)

- [ ] `Message` model (name, email/phone, message, createdAt)
- [ ] `POST /api/contact` with validation (zod or express-validator)
- [ ] Add `express-rate-limit` to this route
- [ ] Frontend form: controlled inputs, validation messages, sending state, success and error feedback
- [ ] Check that messages arrive in MongoDB
- [ ] (Optional) Email or WhatsApp notification

## Phase 4: Admin login and panel (Oct 16 to 19)

- [ ] Seed one admin user with a `bcrypt` hashed password
- [ ] `POST /api/auth/login` returns a JWT
- [ ] Auth middleware that checks `Authorization: Bearer <token>`
- [ ] Protected routes: create, update, delete products; list messages
- [ ] Frontend login page, token storage, protected admin route, logout
- [ ] Admin panel: product list, add/edit/delete form, messages list
- [ ] Image handling: paste an image URL first, then Cloudinary upload if time allows
- [ ] Test: unauthenticated requests to admin routes must fail

## Phase 5: AI assistant (Oct 20 to 22)

- [ ] Create the Mistral API key (stored only in backend `.env` and Render env vars)
- [ ] `POST /api/chat`: receives message history, builds a system prompt with brand tone and the product list from DB, calls Mistral
- [ ] Prompt rules: only talk about Levinor, never invent products or prices, say "contact us" when unsure
- [ ] Limit message length and history size, add rate limiting
- [ ] Frontend chat UI: message bubbles, typing/loading state, error state
- [ ] Test prompt injection attempts ("ignore your instructions...")
- [ ] (Optional) Let the assistant produce a pre-quote request that is saved as a message

## Phase 6: Polish (Oct 23 to 26)

- [ ] Responsive pass on every page, including admin and chat
- [ ] Basic animations (entrance effects, hover, page transitions) without overdoing it
- [ ] Loading, empty, and error states on every fetch
- [ ] Clear form validation messages
- [ ] Clean folder structure and useful comments explaining technical decisions
- [ ] Remove unused code and console logs
- [ ] Check there are no secrets in the repo or its history
- [ ] README: description, stack, how to run locally, live URLs, environment variables list (no values)

## Phase 7: Final checks and defense prep (Oct 27 to 29)

- [ ] 15+ commits visible with clear messages (aim for 40+)
- [ ] Live frontend URL works from a phone
- [ ] Render API is awake before the defense (first request after sleep is slow)
- [ ] Test the full flow on the live site: browse, contact, admin login, CRUD, chatbot
- [ ] Prepare to explain: folder structure, a request from React to MongoDB, how login and JWT work, how the AI prompt is built, why the key is not in the frontend, why GitHub Pages plus Render
- [ ] Practice a 5 minute demo

## Buffer (Oct 30 to 31)

- [ ] No new features. Only bug fixes and rehearsal.

---

## Brief deliverables checklist

- [ ] 01 GitHub repository with organized code and history
- [ ] 02 App published with a working URL
- [ ] 03 Brand and home page
- [ ] 04 Catalog of products
- [ ] 05 Admin with login
- [ ] 06 Real contact form
- [ ] 07 Personalized AI

---

## Stretch goals (only if everything above is done)

- [ ] Oracle Cloud server with Caddy HTTPS
- [ ] n8n automation (contact message to WhatsApp or email)
- [ ] Cloudinary image upload from admin
- [ ] Better animations with Framer Motion or AOS

## If you fall behind, cut in this order

1. Stretch goals
2. Optional items inside each phase
3. Extra animations
4. Image upload (use URLs)

Never cut: live deployment, real content, admin login, contact saving to DB, the AI feature in its simplest form.

## Study map (when you need it)

| Phase  | Study                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------- |
| 0 to 1 | React components and props, Vite, GitHub Pages, flexbox/grid, media queries                               |
| 2      | Express routes and middleware, MongoDB and Mongoose, `fetch` with async/await, `useEffect`, env variables |
| 3      | Controlled forms, validation, REST status codes, rate limiting                                            |
| 4      | bcrypt, JWT, auth middleware, protected routes in React, CRUD                                             |
| 5      | Mistral chat API, system prompts, prompt injection, conversation history                                  |
| 6 to 7 | Responsive testing, error handling, clean code, explaining your own architecture                          |
