# Supabase Setup for Historin

This document explains how to configure a secure Supabase connection for the Historin project and store quiz submissions.

## 1) Install dependencies

Run in the project root:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 2) Environment variables

Create a `.env.local` file in the project root (not committed). Add:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
# Optional but recommended for trusted server operations (never expose publicly)
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Notes:
- `NEXT_PUBLIC_*` keys are safe for browser exposure. Do not include the service role key in client bundles.
- The server client prefers `SUPABASE_SERVICE_ROLE_KEY` if defined; otherwise it falls back to the anon key.

## 3) Database schema: quiz table

Create `quiz` table (SQL example):

```sql
create table if not exists public.quiz (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  answers jsonb not null,
  score numeric,
  meta jsonb,
  user_id uuid
);
```

If `gen_random_uuid()` is unavailable, enable `pgcrypto` or use `uuid_generate_v4()` with `uuid-ossp`.

```sql
-- Enable extensions if needed
create extension if not exists pgcrypto;
-- or
create extension if not exists "uuid-ossp";
```

## 4) Row Level Security (RLS)

Enable RLS and add strict insert policy. Since our writes go through the server (API route), you may allow inserts for anon role, or restrict by auth later.

```sql
alter table public.quiz enable row level security;

-- Option A: Allow anonymous inserts (sufficient if API route validates input)
create policy "Allow anon insert quiz" on public.quiz
  for insert
  to anon
  with check (true);

-- Option B (recommended once auth is added): Only allow authenticated users to insert their own rows
-- create policy "Allow auth insert quiz" on public.quiz
--   for insert
--   to authenticated
--   with check (auth.uid() is not null);
```

You can also add a read policy if you want to fetch submissions client-side. For now, we don’t expose reads from the client.

## 5) Files added

- `src/lib/supabase/server.ts` — Server-only Supabase client using `@supabase/ssr` and Next.js `cookies()`.
- `src/lib/supabase/client.ts` — Browser client (use sparingly; prefer the API route for writes).
- `src/types/database.types.ts` — Minimal types for `quiz` table; replace with generated types if available.
- `src/app/api/quiz/route.ts` — Secure POST endpoint to insert quiz submissions.
- `src/utils/quizApi.ts` — Client helper `submitQuiz(payload)` that calls the API.

## 6) Usage

Submit answers from the client (example):

```ts
import { submitQuiz } from '@/utils/quizApi';

async function handleSubmit(answers: unknown) {
  try {
    const res = await submitQuiz({ answers, score: null, meta: { version: 1 } });
    console.log('Saved:', res.data);
  } catch (e) {
    console.error('Quiz submit failed', e);
  }
}
```

You can also test via curl:

```bash
curl -X POST http://localhost:3000/api/quiz \
  -H "Content-Type: application/json" \
  -d '{"answers": {"q1": "a", "q2": "b"}, "score": 8, "meta": {"city": "Rio"}}'
```

## 7) Security considerations

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client or push it to the repo.
- Keep RLS enabled. Start permissive for anon insert only if you trust your validation and rate limits; tighten once auth is integrated.
- Consider adding rate limiting at the API route if needed.

## 8) Types generation (optional)

You can generate full types using the Supabase CLI and replace `src/types/database.types.ts` with the generated types for end-to-end type safety.
