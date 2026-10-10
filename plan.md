# Levinor project plan

## Completed
- Frontend redesign and stable build
- Backend MongoDB foundation with Express and Mongoose
- Product API and catalog connection
- Product seed cleanup and malformed-record protection
- Contact form, validation, and storage
- Admin auth with JWT and protected dashboard

## Current focus
- AI assistant integration
- Deployment and production environment setup
- Final polish, README, and defense preparation

## How to test admin
1. Start backend:
   - `cd backend`
   - `npm run dev`
2. Start frontend:
   - `cd frontend`
   - `npm run dev`
3. Open `http://localhost:5173/#/admin`
4. Login with:
   - username: `admin`
   - password: `levinor123`
5. Verify dashboard loads product count and message count.
6. Log out and confirm session clears.

## Next milestones
- Add AI conversation flow using the product catalog and brand rules
- Deploy frontend and backend to production
- Verify live API communication and final behavior
- Prepare final defense checklist and demo
