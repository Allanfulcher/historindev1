import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

interface CreateAdPayload {
  active?: boolean;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  tag?: string;
  priority?: number;
  placement?: 'top' | 'after_match';
  match_keywords?: string[] | null;
  rua_id?: string | null;
  historia_id?: string | null;
  negocio_id?: string | null;
  start_at?: string | null;
  end_at?: string | null;
}

function parseCreate(body: unknown): { ok: true; value: CreateAdPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const {
    active,
    title,
    description,
    image_url,
    link_url,
    tag,
    priority,
    placement,
    match_keywords,
    rua_id,
    historia_id,
    negocio_id,
    start_at,
    end_at,
  } = body as any;

  if (typeof title !== 'string' || !title.trim()) return { ok: false, error: 'title must be non-empty' };
  if (typeof description !== 'string' || !description.trim()) return { ok: false, error: 'description must be non-empty' };
  if (typeof image_url !== 'string' || !image_url.trim()) return { ok: false, error: 'image_url must be non-empty' };
  if (typeof link_url !== 'string' || !link_url.trim()) return { ok: false, error: 'link_url must be non-empty' };

  const clean = (v: any) => (typeof v === 'string' ? v.trim() : undefined);

  return {
    ok: true,
    value: {
      active: typeof active === 'boolean' ? active : true,
      title: title.trim(),
      description: description.trim(),
      image_url: image_url.trim(),
      link_url: link_url.trim(),
      tag: clean(tag),
      priority: typeof priority === 'number' ? priority : 0,
      placement: placement === 'after_match' ? 'after_match' : 'top',
      match_keywords: Array.isArray(match_keywords) ? match_keywords.map(String) : null,
      rua_id: clean(rua_id) || null,
      historia_id: clean(historia_id) || null,
      negocio_id: clean(negocio_id) || null,
      start_at: clean(start_at) || null,
      end_at: clean(end_at) || null,
    },
  };
}

// GET /api/admin/ads
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('ads')
    .select('*')
    .order('updated_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/ads
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('ads')
    .insert([parsed.value])
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
