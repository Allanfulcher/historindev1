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
