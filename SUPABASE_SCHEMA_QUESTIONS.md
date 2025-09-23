```sql
create extension if not exists pgcrypto;

-- Simple quiz questions table
-- answer is a 1-based index (1..4) pointing to the correct option in options[]
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  city int not null,
  question text not null,
  options text[] not null,
  answer smallint not null,
  -- Ensure exactly 4 options
  constraint chk_options_len check (array_length(options, 1) = 4),
  -- Ensure answer is between 1 and 4 (1-based)
  constraint chk_answer_range check (answer between 1 and 4)
);
```

---

## Reference Sites (Admin > Sites)

The admin sites page expects a simple table for external reference links, aligned with `src/types/index.ts` `Site` interface (`id`, `nome`, `link`).

```sql
-- External reference sites table
create table if not exists public.reference_sites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  link text not null,
  constraint uq_reference_sites_link unique (link)
);

-- Helpful index for name searches
create index if not exists idx_reference_sites_nome on public.reference_sites using gin (to_tsvector('simple', coalesce(nome, '')));
```

Notes:
- The unique constraint on `link` prevents duplicates.
- `nome` and `link` map 1:1 to the admin form in `src/app/admin/sites/page.tsx`.
- API endpoints expected by the admin UI:
  - `GET /api/admin/sites` -> returns `{ data: Site[] }`
  - `POST /api/admin/sites` with JSON `{ nome, link }`
  - `DELETE /api/admin/sites/:id`

---

## Organizations (Admin > Orgs)

Admin organizations page and API expect a table `public.organizations` with fields aligned to the UI form and the `Organizacao` shape used in the app.

```sql
-- Organizations table
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  fantasia text not null,
  link text not null,
  logo text not null,
  cor text null,
  sobre text null,
  foto text null
);

-- Recommended indexes / constraints
create index if not exists idx_organizations_fantasia on public.organizations using gin (to_tsvector('simple', coalesce(fantasia, '')));
create unique index if not exists uq_organizations_link on public.organizations (link);
```

Notes:
- `fantasia`, `link`, `logo` are required by the admin UI.
- Optional fields: `cor` (hex), `sobre` (text), `foto` (URL).
- API endpoints expected by the admin UI:
  - `GET /api/admin/orgs` -> returns `{ data: Organization[] }`
  - `POST /api/admin/orgs` with JSON `{ fantasia, link, logo, cor?, sobre?, foto? }`
  - `PUT /api/admin/orgs/:id` to edit any subset of fields
  - `DELETE /api/admin/orgs/:id`

RLS and Policies (suggested):
- Enable RLS and create read policy for anon if these are public-facing records.
- Admin API uses a service role key (server) and bypasses RLS.

---

## Authors (Admin > Autores)

Admin authors page and API expect a table `public.authors` with fields aligned to the UI and `Autor` type.

```sql
-- Authors table
create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  bio text not null,
  foto text not null,
  link text null
);

-- Recommended indexes / constraints
create index if not exists idx_authors_nome on public.authors using gin (to_tsvector('simple', coalesce(nome, '')));
```

Notes:
- `nome`, `bio`, `foto` are required by the admin UI.
- Optional field: `link` (URL).
- API endpoints expected by the admin UI:
  - `GET /api/admin/autores` -> returns `{ data: Author[] }`
  - `POST /api/admin/autores` with JSON `{ nome, bio, foto, link? }`
  - `PUT /api/admin/autores/:id` to edit any subset of fields
  - `DELETE /api/admin/autores/:id`
