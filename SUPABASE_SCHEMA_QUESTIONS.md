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

---

## Works (Admin > Obras)

Admin works page and API expect a table `public.works` with foreign key to `public.authors(id)`.

```sql
-- Works table
create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  titulo text not null,
  descricao text not null,
  capa text not null,
  pago boolean not null default false,
  autor_id uuid not null references public.authors(id) on delete restrict,
  link text not null
);

-- Recommended indexes
create index if not exists idx_works_titulo on public.works using gin (to_tsvector('simple', coalesce(titulo, '')));
create index if not exists idx_works_autor_id on public.works(autor_id);
```

Notes:
- `autor_id` is a foreign key to `authors`. Ensure an author exists before creating a work.
- API endpoints expected by the admin UI:
  - `GET /api/admin/obras` -> returns `{ data: Work[] }`
  - `POST /api/admin/obras` with JSON `{ titulo, descricao, capa, pago, autorId(UUID), link }`
  - `PUT /api/admin/obras/:id` to edit fields
  - `DELETE /api/admin/obras/:id`

---

## Businesses (Admin > Negócios)

Admin businesses page and API expect a table `public.businesses`.

```sql
-- Businesses table
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  endereco text not null,
  telefone text null,
  categoria text not null
);

-- Recommended indexes
create index if not exists idx_businesses_nome on public.businesses using gin (to_tsvector('simple', coalesce(nome, '')));
create index if not exists idx_businesses_categoria on public.businesses using gin (to_tsvector('simple', coalesce(categoria, '')));
```

Notes:
- `nome`, `endereco`, `categoria` are required. `telefone` is optional.
- API endpoints expected by the admin UI:
  - `GET /api/admin/negocios` -> returns `{ data: Business[] }`
  - `POST /api/admin/negocios` with JSON `{ nome, endereco, telefone?, categoria }`
  - `PUT /api/admin/negocios/:id` to edit fields
  - `DELETE /api/admin/negocios/:id`

---

## Cities (Admin > Cidades)

Admin cities page and API expect a table `public.cities` aligned with the `Cidade` shape.

```sql
-- Cities table
create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  estado text not null,
  populacao text not null,
  descricao text null,
  foto text null
);

-- Recommended indexes
create index if not exists idx_cities_nome on public.cities using gin (to_tsvector('simple', coalesce(nome, '')));
create index if not exists idx_cities_estado on public.cities using gin (to_tsvector('simple', coalesce(estado, '')));
```

Notes:
- Minimal shape for now (`nome`, `estado`, `populacao` required) — we can extend columns later.
- API endpoints expected by the admin UI:
  - `GET /api/admin/cidades` -> returns `{ data: City[] }`
  - `POST /api/admin/cidades` with JSON `{ nome, estado, populacao, descricao?, foto? }`
  - `PUT /api/admin/cidades/:id` to edit fields
  - `DELETE /api/admin/cidades/:id`

---

## Streets (Admin > Ruas)

Admin streets page and API expect a table `public.streets`. Coordinates are stored in `lat` and `lng` numeric columns.

```sql
-- Streets table
create table if not exists public.streets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  fotos text null,
  cidade_id uuid null references public.cities(id) on delete set null,
  descricao text null,
  lat double precision null,
  lng double precision null
);

-- Recommended indexes
create index if not exists idx_streets_nome on public.streets using gin (to_tsvector('simple', coalesce(nome, '')));
create index if not exists idx_streets_cidade_id on public.streets(cidade_id);
```

Notes:
- `cidade_id` links a street to a city but is optional.
- API endpoints expected by the admin UI:
  - `GET /api/admin/ruas` -> returns `{ data: Street[] }`
  - `POST /api/admin/ruas` with JSON `{ nome, fotos?, cidadeId?, descricao?, coordenadas?[lat,lng] }`
  - `PUT /api/admin/ruas/:id` to edit fields
  - `DELETE /api/admin/ruas/:id`

---

## Stories (Admin > Histórias)

Admin stories page and API expect a table `public.stories` with optional relations to `streets` and `organizations`. Arrays are stored as `text[]`.

```sql
-- Stories table
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  rua_id uuid null references public.streets(id) on delete set null,
  org_id uuid null references public.organizations(id) on delete set null,
  titulo text not null,
  descricao text not null,
  fotos text[] null,
  lat double precision null,
  lng double precision null,
  ano text null,
  criador text null,
  tags text[] null
);

-- Recommended indexes
create index if not exists idx_stories_titulo on public.stories using gin (to_tsvector('simple', coalesce(titulo, '')));
create index if not exists idx_stories_tags on public.stories using gin (tags);
create index if not exists idx_stories_rua_id on public.stories(rua_id);
create index if not exists idx_stories_org_id on public.stories(org_id);
```

Notes:
- `tags` supports values like `Cinema`, `Festival`, `Festival de Cinema`.
- API endpoints expected by the admin UI:
  - `GET /api/admin/historias` -> returns `{ data: Story[] }`
  - `POST /api/admin/historias` with JSON `{ ruaId?, orgId?, titulo, descricao, fotos?, coordenadas?, ano?, criador?, tags? }`
  - `PUT /api/admin/historias/:id` to edit fields
  - `DELETE /api/admin/historias/:id`
