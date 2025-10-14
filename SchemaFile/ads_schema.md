# Ads (Anúncios) - Supabase Schema

Proposed tables to manage in-page ads tied to ruas/historias.

## Table: ads
- id: uuid (pk, default uuid_generate_v4())
- active: boolean (default true)
- title: text
- description: text
- image_url: text
- link_url: text
- tag: text (e.g., "Patrocinado")
- priority: int2 (default 0)
- placement: text check in ('top','after_match') default 'top'
- match_keywords: text[] (keywords to detect related historias; optional)
- rua_id: text references ruas.id on delete set null
- historia_id: text references historias.id on delete set null
- negocio_id: text references negocios.id on delete set null
- start_at: timestamptz null
- end_at: timestamptz null
- created_at: timestamptz default now()
- updated_at: timestamptz default now()

Indexes:
- idx_ads_active_time: on (active, start_at, end_at)
- idx_ads_rua: on (rua_id)
- idx_ads_historia: on (historia_id)
- idx_ads_negocio: on (negocio_id)

Row Level Security (RLS):
- Enable RLS.
- Policy: public read for active ads within time window.
  - using (active = true AND (start_at IS NULL OR start_at <= now()) AND (end_at IS NULL OR end_at >= now()))
- Admin policies for insert/update/delete restricted to service role or authenticated admin role.

Example insert:
```sql
insert into ads (title, description, image_url, link_url, tag, placement, match_keywords, rua_id, negocio_id)
values (
  'Mundo a Vapor',
  'Há mais de 30 anos, o Mundo a Vapor oferece aos seus visitantes uma experiência de viagem no tempo...',
  'https://upload.wikimedia.org/wikipedia/commons/4/40/Fachada_do_Mundo_a_Vapor.jpg',
  'https://www.mundoavapor.com.br/',
  'Patrocinado',
  'after_match',
  ARRAY['mundo a vapor','vapor','parque temático'],
  '1', -- rua id
  null
);
```

## Public API shape (GET /api/ads?ruaId=1)
Returns a single best ad for the rua:
```json
{
  "id": "uuid",
  "name": "Mundo a Vapor",
  "description": "...",
  "image": "https://...",
  "link": "https://...",
  "tag": "Patrocinado",
  "placement": "after_match",
  "matchKeywords": ["mundo a vapor"]
}
```

Selection logic (server):
- Filter active and in window.
- Prefer ads targeting specific rua_id; fallback to generic (rua_id is null).
- Order by priority desc, updated_at desc.
- Return top 1.
