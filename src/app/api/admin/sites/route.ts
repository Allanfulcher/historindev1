import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

// Types
type CreateSitePayload = {
  nome: string;
  link: string;
};

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
}

function parseCreate(body: unknown): { ok: true; value: CreateSitePayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { nome, link } = body as any;
  if (typeof nome !== 'string' || !nome.trim()) return { ok: false, error: 'nome must be a non-empty string' };
  if (typeof link !== 'string' || !link.trim() || !isValidUrl(link)) return { ok: false, error: 'link must be a valid URL' };
  return { ok: true, value: { nome: nome.trim(), link: link.trim() } };
}

// GET /api/admin/sites?limit=100&offset=0
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('reference_sites')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/sites
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('reference_sites')
    .insert([parsed.value])
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
