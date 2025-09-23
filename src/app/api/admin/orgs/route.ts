import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

// Types
interface CreateOrgPayload {
  fantasia: string;
  link: string;
  logo: string;
  cor?: string;
  sobre?: string;
  foto?: string;
}

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
}

function parseCreate(body: unknown): { ok: true; value: CreateOrgPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { fantasia, link, logo, cor, sobre, foto } = body as any;
  if (typeof fantasia !== 'string' || !fantasia.trim()) return { ok: false, error: 'fantasia must be a non-empty string' };
  if (typeof link !== 'string' || !link.trim() || !isValidUrl(link)) return { ok: false, error: 'link must be a valid URL' };
  if (typeof logo !== 'string' || !logo.trim() || !isValidUrl(logo)) return { ok: false, error: 'logo must be a valid URL' };
  if (cor && (typeof cor !== 'string' || !/^#?[0-9a-fA-F]{3,8}$/.test(cor))) return { ok: false, error: 'cor must be a hex color like #8B4513' };
  if (foto && (typeof foto !== 'string' || !isValidUrl(foto))) return { ok: false, error: 'foto must be a valid URL' };
  return { ok: true, value: { fantasia: fantasia.trim(), link: link.trim(), logo: logo.trim(), cor: cor?.trim(), sobre: typeof sobre === 'string' ? sobre.trim() : undefined, foto: foto?.trim() } };
}

// GET /api/admin/orgs?limit=100&offset=0
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/orgs
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('organizations')
    .insert([parsed.value])
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
