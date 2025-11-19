# Admin Migration & Improvements Checklist

This checklist is structured for step-by-step execution by an LLM. Each item includes a unique ID, paths, acceptance criteria, and dependencies. Mark items as [x] when completed.

## Phase 2 — Admin Pages to Create/Unify

- [x] ID: PG-1
  - Title: Questions page (base)
  - Path: `src/app/admin/questions/page.tsx`
  - Acceptance: List, create, delete quiz questions.
- [x] ID: PG-2
  - Title: Sites page
  - Path: `src/app/admin/sites/page.tsx`
  - Acceptance: List, create, delete reference sites.

- [x] ID: PG-3
  - Title: Organizações (Organizations) page
  - Path: `src/app/admin/orgs/page.tsx`
  - Acceptance: List, create, edit, delete organizations (see data model in `src/types/index.ts`).
- [x] ID: PG-4
  - Title: Autores (Authors) page
  - Path: `src/app/admin/autores/page.tsx`
  - Acceptance: List, create, edit, delete authors.
- [x] ID: PG-5
  - Title: Obras (Works) page
  - Path: `src/app/admin/obras/page.tsx`
  - Acceptance: List, create, edit, delete works.
- [x] ID: PG-6
  - Title: Negócios (Businesses) page
  - Path: `src/app/admin/negocios/page.tsx`
  - Acceptance: List, create, edit, delete businesses.
- [x] ID: PG-7
  - Title: Cidades (Cities) page
  - Path: `src/app/admin/cidades/page.tsx`
  - Acceptance: List, create, edit, delete cities.
- [x] ID: PG-8
  - Title: Ruas (Streets) page
  - Path: `src/app/admin/ruas/page.tsx`
  - Acceptance: List, create, edit, delete streets.
- [ ] ID: PG-9
  - Title: Histórias (Stories) page
  - Path: `src/app/admin/historias/page.tsx`
  - Acceptance: List, create, edit, delete stories; manage photos.
- [x] ID: PG-10
  - Title: QR Codes page
  - Path: `src/app/admin/qr-codes/page.tsx`
  - Acceptance: List, create, edit, delete QR codes for the QR hunt feature; manage coordinates, rua associations, and active status.

Notes:
- All admin pages should use `AdminHeader` and Phase 1 shared components.
- All should support basic filtering, pagination, and search where appropriate.

## Phase 3 — API Routes (Next.js)

- [ ] ID: API-1
  - Title: Sites endpoints
  - Paths:
    - `src/app/api/admin/sites/route.ts` (GET, POST)
    - `src/app/api/admin/sites/[id]/route.ts` (DELETE, PUT)
  - Acceptance:
    - Matches UI contract used in `src/app/admin/sites/page.tsx`.
    - Validation errors return 400 with message; unexpected errors return 500.

- [ ] ID: API-2
  - Title: Questions endpoints (ensure parity)
  - Paths:
    - `src/app/api/admin/questions/route.ts` (GET with optional `?city=`, POST)
    - `src/app/api/admin/questions/[id]/route.ts` (DELETE, PUT)
  - Acceptance:
    - UI `questions` page works end-to-end.
    - Zod validation for payloads.

- [ ] ID: API-3
  - Title: Orgs, Autores, Obras, Negócios endpoints
  - Paths:
    - `src/app/api/admin/orgs/...`
    - `src/app/api/admin/autores/...`
    - `src/app/api/admin/obras/...`
    - `src/app/api/admin/negocios/...`
  - Acceptance:
    - CRUD provided with pagination support.
    - Search by name where applicable.

- [ ] ID: API-4
  - Title: Upload support for stories/photos (if needed)
  - Path: `src/app/api/admin/uploads/route.ts`
  - Acceptance:
    - Handles image uploads (Supabase storage or external).
    - Returns public URL.

## Phase 4 — Supabase Schema

- [x] ID: DB-1
  - Title: Quiz questions table
  - File: `SUPABASE_SCHEMA_QUESTIONS.md`
  - Table: `public.quiz_questions`
  - Acceptance: Exists with constraints (4 options, 1–4 answer).

- [x] ID: DB-2
  - Title: Reference sites table
  - File: `SUPABASE_SCHEMA_QUESTIONS.md` (section “Reference Sites (Admin > Sites)”) 
  - Table: `public.reference_sites`
  - Acceptance: Unique on `link`; index on `nome`.

- [x] ID: DB-3
  - Title: Organizations table
  - File: `SUPABASE_SCHEMA.md` (new consolidated doc)
  - Table: `public.organizacoes`
  - Acceptance: Fields mapped to `Organizacao` in `src/types/index.ts`, relationships as needed.

- [x] ID: DB-4
  - Title: Authors table
  - File: `SUPABASE_SCHEMA.md`
  - Table: `public.autores`
  - Acceptance: Fields mapped to `Autor` in `src/types/index.ts`.

- [x] ID: DB-5
  - Title: Works table
  - File: `SUPABASE_SCHEMA.md`
  - Table: `public.obras`
  - Acceptance: Fields mapped to `Obra` in `src/types/index.ts`.

- [x] ID: DB-6
  - Title: Businesses table
  - File: `SUPABASE_SCHEMA.md`
  - Table: `public.negocios`
  - Acceptance: Fields mapped to `Negocio` in `src/types/index.ts`.

- [x] ID: DB-7
  - Title: Stories table
  - File: `SUPABASE_SCHEMA.md`
  - Table: `public.historias`
  - Acceptance: Fields mapped to stories used in the app; photos array handling consistent with `legacyDb` utilities.

- [x] ID: DB-8
  - Title: Streets and Cities tables (if needed)
  - File: `SUPABASE_SCHEMA.md`
  - Tables: `public.ruas`, `public.cidades`
  - Acceptance: Provide foreign keys for stories.

- [ ] ID: DB-9
  - Title: RLS and policies
  - File: `SUPABASE_SCHEMA.md`
  - Acceptance:
    - RLS enabled on all content tables.
    - Admin API uses service role key.
    - Public read policies as appropriate for public content.

## Phase 5 — Validation, UX, and Quality

- [ ] ID: UX-1
  - Title: Zod validation for API payloads
  - Paths: All admin API routes
  - Acceptance: Invalid inputs return informative 400.

- [ ] ID: UX-2
  - Title: Pagination, Sorting, Search in tables
  - Paths: All admin pages
  - Acceptance: Server-side pagination supported; client UI controls provided.

- [ ] ID: UX-3
  - Title: Edit support on all pages
  - Paths: All admin pages
  - Acceptance: Inline edit or modal edit; PUT endpoints implemented.

- [ ] ID: UX-4
  - Title: Toasts & error handling
  - Paths: Admin pages
  - Acceptance: Success and error toasts; retry on network errors.

- [ ] ID: UX-5
  - Title: Auth/session improvements
  - Paths: `@/utils/adminApi`, `src/components/admin/AdminHeader.tsx`
  - Acceptance: Graceful refresh, configurable session duration, better expired-session UX.

- [ ] ID: QA-1
  - Title: E2E smoke flows for admin
  - Paths: `e2e/admin/*.spec.ts`
  - Acceptance: Create/edit/delete flow tests for at least `questions` and `sites`.

- [ ] ID: QA-2
  - Title: Unit tests for API route handlers
  - Paths: `src/app/api/admin/**/__tests__/*`
  - Acceptance: Basic success and failure cases.

## Phase 6 — Documentation & Dev Experience

- [ ] ID: DOC-1
  - Title: Consolidate Supabase schema docs
  - Path: `SUPABASE_SCHEMA.md`
  - Acceptance: All tables documented with ERD snippet and policies.

- [ ] ID: DOC-2
  - Title: Admin contributor guide
  - Path: `docs/admin/CONTRIBUTING.md`
  - Acceptance: How to add admin pages, endpoints, schemas; coding patterns; examples.

- [ ] ID: DX-1
  - Title: Env and config checks
  - Path: `scripts/check-env.ts`
  - Acceptance: Validates required envs for Supabase; warns if missing.

## References (for context)

- `src/app/admin/questions/page.tsx` — Base admin page pattern (already refactored to use `AdminHeader`)
- `src/app/admin/sites/page.tsx` — Implemented using base pattern
- `src/components/admin/AdminHeader.tsx` — Shared header with session/timer/logout
- `src/types/index.ts` — Data interfaces (includes `Site`)
- `SUPABASE_SCHEMA_QUESTIONS.md` — Existing schema for `quiz_questions` and `reference_sites`
