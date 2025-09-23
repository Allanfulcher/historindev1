import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

interface CreateStreetPayload {
  nome: string;
  fotos?: string;
  cidadeId?: string; // uuid (optional)
  descricao?: string;
  coordenadas?: [number, number]; // [lat, lng]
}

function isUuid(v: string) {
  return /^[0-9a-fA-F-]{36}$/.test(v);
}

function parseCreate(body: unknown): { ok: true; value: CreateStreetPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { nome, fotos, cidadeId, descricao, coordenadas } = body as any;
  if (typeof nome !== 'string' || !nome.trim()) return { ok: false, error: 'nome must be a non-empty string' };
  if (cidadeId && (typeof cidadeId !== 'string' || !isUuid(cidadeId))) return { ok: false, error: 'cidadeId must be a UUID' };
  if (coordenadas) {
    if (!Array.isArray(coordenadas) || coordenadas.length !== 2) return { ok: false, error: 'coordenadas must be [lat, lng]' };
    const [lat, lng] = coordenadas;
    if (typeof lat !== 'number' || typeof lng !== 'number' || Number.isNaN(lat) || Number.isNaN(lng)) return { ok: false, error: 'coordenadas must be numbers' };
  }
  return { ok: true, value: { nome: nome.trim(), fotos: fotos?.trim(), cidadeId, descricao: typeof descricao === 'string' ? descricao.trim() : undefined, coordenadas } };
}

// GET /api/admin/ruas
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('streets')
    .select('id, created_at, nome, fotos, cidade_id, lat, lng, descricao')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);

  const mapped = (data ?? []).map((r: any) => ({
    id: r.id,
    created_at: r.created_at,
    nome: r.nome,
    fotos: r.fotos ?? undefined,
    cidade_id: r.cidade_id ?? undefined,
    descricao: r.descricao ?? undefined,
    coordenadas: r.lat != null && r.lng != null ? [r.lat, r.lng] as [number, number] : undefined,
  }));

  return jsonOk({ data: mapped });
}

// POST /api/admin/ruas
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const insert: any = {
    nome: parsed.value.nome,
    fotos: parsed.value.fotos ?? null,
    cidade_id: parsed.value.cidadeId ?? null,
    descricao: parsed.value.descricao ?? null,
  };
  if (parsed.value.coordenadas) {
    insert.lat = parsed.value.coordenadas[0];
    insert.lng = parsed.value.coordenadas[1];
  }

  const { data, error } = await supabase
    .from('streets')
    .insert([insert])
    .select('id, created_at, nome, fotos, cidade_id, lat, lng, descricao')
    .single();

  if (error) return jsonServerError(error.message);

  const mapped = {
    id: data.id,
    created_at: data.created_at,
    nome: data.nome,
    fotos: data.fotos ?? undefined,
    cidade_id: data.cidade_id ?? undefined,
    descricao: data.descricao ?? undefined,
    coordenadas: data.lat != null && data.lng != null ? [data.lat, data.lng] as [number, number] : undefined,
  };
  return jsonOk({ data: mapped }, { status: 201 });
}
