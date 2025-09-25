import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

interface CreateWorkPayload {
  titulo: string;
  descricao: string;
  capa: string;
  pago: boolean;
  autorId: string; // UUID of authors.id
  link: string;
}

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
}

function isUuid(v: string) {
  return /^[0-9a-fA-F-]{36}$/.test(v);
}

function parseCreate(body: unknown): { ok: true; value: CreateWorkPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { titulo, descricao, capa, pago, autorId, link } = body as any;
  if (typeof titulo !== 'string' || !titulo.trim()) return { ok: false, error: 'titulo must be a non-empty string' };
  if (typeof descricao !== 'string' || !descricao.trim()) return { ok: false, error: 'descricao must be a non-empty string' };
  if (typeof capa !== 'string' || !capa.trim() || !isValidUrl(capa)) return { ok: false, error: 'capa must be a valid URL' };
  if (typeof pago !== 'boolean') return { ok: false, error: 'pago must be boolean' };
  if (typeof autorId !== 'string' || !isUuid(autorId)) return { ok: false, error: 'autorId must be a UUID' };
  if (typeof link !== 'string' || !link.trim() || !isValidUrl(link)) return { ok: false, error: 'link must be a valid URL' };
  return { ok: true, value: { titulo: titulo.trim(), descricao: descricao.trim(), capa: capa.trim(), pago, autorId: autorId.trim(), link: link.trim() } };
}

// GET /api/admin/obras?limit=100&offset=0
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('works')
    .select('id, created_at, titulo, descricao, capa, pago, autorId:autor_id, link')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/obras
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('works')
    .insert([{ 
      titulo: parsed.value.titulo,
      descricao: parsed.value.descricao,
      capa: parsed.value.capa,
      pago: parsed.value.pago,
      autor_id: parsed.value.autorId,
      link: parsed.value.link,
    }])
    .select('id, created_at, titulo, descricao, capa, pago, autorId:autor_id, link')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
