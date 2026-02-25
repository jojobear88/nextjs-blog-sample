# Next.js Blog Sample

This repository contains a small blogging platform scaffold:

- `frontend` — Next.js + TypeScript + Tailwind frontend
- `backend` — Minimal Fastify TypeScript API

Each backend exposes a simple in-memory `/api/posts` endpoint used by the frontend.

Quick start

1. Open terminals for the frontend and one backend.

2. Run the frontend (defaults to port 3000):

```bash
cd frontend
npm install
npm run dev
```

3. Run the Fastify backend (port 4000):

```bash
cd backend-fastify
npm install
npm run dev
```

4. The frontend reads the API base URL from `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`).

Notes

- These are starter templates. Add persistent storage, validation, CORS, and security before production use.
