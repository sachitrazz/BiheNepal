# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BiheNepal is a privacy-first matrimony web application for Nepal. Users authenticate via phone OTP, build a profile with personal/preference data, and submit identity documents for manual verification.

## Commands

### Backend (from `backend/`)
```
npm run dev       # nodemon, auto-restart on changes
npm start         # production start
npm run migrate   # prisma migrate dev --name init
npm run generate  # prisma generate (after schema changes)
```

### Frontend (from `frontend/`)
```
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # production build
npm run lint      # eslint
npm run preview   # preview production build
```

## Environment Setup

Copy `backend/.env.example` to `backend/.env` and fill in:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — signing secret for JWTs
- `CLOUDINARY_*` — cloud name, API key, API secret for document uploads

Frontend API URL defaults to `http://localhost:4000/api`; override with `VITE_API_URL` in `frontend/.env`.

## Architecture

### Backend (`backend/src/`)
- **CommonJS** (`"type": "commonjs"`) with Express v5
- Entry: `src/index.js` — mounts three route groups under `/api`
- Route → Controller pattern; `src/middleware/auth.js` is a single JWT-verification middleware used on all protected routes
- **OTP flow**: `otpService.js` stores OTPs in a plain JS object (in-memory, lost on restart, 5-minute TTL). OTPs are only `console.log`'d — there is no SMS integration yet
- **Database**: Prisma with PostgreSQL. Three models: `User` (phone, role), `Profile` (one-to-one with User, all personal/preference fields), `Document` (uploads with `verificationStatus`)
- **Uploads**: Multer writes to `/tmp/uploads`, then `cloudinaryService.js` uploads to Cloudinary; only the `secure_url` is stored in the DB

### Frontend (`frontend/src/`)
- **ESM** React 19 with Vite + TailwindCSS
- `AuthContext.jsx` is the central auth state — persists `bihe_token` and `bihe_user` to `localStorage`, validates token on load via `GET /api/auth/me`
- `routes/AppRoutes.jsx` defines all routes; `ProtectedRoute` redirects unauthenticated users to `/login`
- Services (`services/`) are thin wrappers around an axios instance (`api.js`) configured with `VITE_API_URL`
- Auth flow: `LoginPage` (phone input) → `VerifyOtpPage` (OTP entry) → `DashboardPage`. After OTP verify the backend returns `{ token, user }` which is stored via `AuthContext.login()`

### API Routes
| Prefix | Routes |
|---|---|
| `/api/auth` | `POST /send-otp`, `POST /verify-otp`, `GET /me`, `POST /logout` |
| `/api/profile` | `POST /`, `GET /me`, `PUT /me` |
| `/api/verification` | `POST /upload`, `GET /status` |
