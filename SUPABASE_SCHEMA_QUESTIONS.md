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

-- Businesses table
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  descricao text null,
  foto text null,
  logo_url text null,
  website text null,
  instagram text null,
  facebook text null,
  email text null,
  endereco text not null,
  telefone text null,
  categoria text not null
);

-- Recommended indexes
create index if not exists idx_businesses_nome on public.businesses using gin (to_tsvector('simple', coalesce(nome, '')));
create index if not exists idx_businesses_categoria on public.businesses using gin (to_tsvector('simple', coalesce(categoria, '')));

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
