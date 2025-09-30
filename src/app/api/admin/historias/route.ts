import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

interface CreateHistoriaPayload {
  id?: string; // optional custom id (ignored by DB if identity)
  ruaId?: string; // integer id as string
  orgId?: string; // integer id as string
  titulo: string;
  descricao: string;
  fotos?: string[];
  coordenadas?: [number, number];
  ano?: string;
  criador?: string;
  tags?: string[];
}

function isDigits(v: string) {
  return /^\d+$/.test(v);
}

function parseArray(v: any): string[] | undefined {
  if (v == null) return undefined;
  if (!Array.isArray(v)) return undefined;
  const arr = v.map((x) => String(x).trim()).filter((s) => s.length > 0);
  return arr.length ? arr : undefined;
}

function parseCreate(body: unknown): { ok: true; value: CreateHistoriaPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { id, ruaId, orgId, titulo, descricao, fotos, coordenadas, ano, criador, tags } = body as any;
  if (typeof titulo !== 'string' || !titulo.trim()) return { ok: false, error: 'titulo must be a non-empty string' };
  if (typeof descricao !== 'string' || !descricao.trim()) return { ok: false, error: 'descricao must be a non-empty string' };
  if (id != null) {
    if (typeof id !== 'string' || !isDigits(id)) return { ok: false, error: 'id must be an integer string' };
  }
  if (ruaId && (typeof ruaId !== 'string' || !isDigits(ruaId))) return { ok: false, error: 'ruaId must be an integer string' };
  if (orgId && (typeof orgId !== 'string' || !isDigits(orgId))) return { ok: false, error: 'orgId must be an integer string' };
  if (coordenadas) {
    if (!Array.isArray(coordenadas) || coordenadas.length !== 2) return { ok: false, error: 'coordenadas must be [lat, lng]' };
    const [lat, lng] = coordenadas;
    if (typeof lat !== 'number' || typeof lng !== 'number' || Number.isNaN(lat) || Number.isNaN(lng)) return { ok: false, error: 'coordenadas must contain numbers' };
  }
  return {
    ok: true,
    value: {
      id,
      ruaId,
      orgId,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      fotos: parseArray(fotos),
      coordenadas,
      ano: typeof ano === 'string' && ano.trim() ? ano.trim() : undefined,
      criador: typeof criador === 'string' && criador.trim() ? criador.trim() : undefined,
      tags: parseArray(tags),
    },
  };
}

// GET /api/admin/historias
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('stories')
    .select('id, created_at, rua_id, org_id, titulo, descricao, fotos, lat, lng, ano, criador, tags')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);

  const mapped = (data ?? []).map((h: any) => ({
    id: h.id,
    created_at: h.created_at,
    rua_id: h.rua_id ?? undefined,
    org_id: h.org_id ?? undefined,
    titulo: h.titulo,
    descricao: h.descricao,
    fotos: h.fotos ?? undefined,
    coordenadas: h.lat != null && h.lng != null ? [h.lat, h.lng] as [number, number] : undefined,
    ano: h.ano ?? undefined,
    criador: h.criador ?? undefined,
    tags: h.tags ?? undefined,
  }));

  return jsonOk({ data: mapped });
}

// POST /api/admin/historias
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const insert: any = {
    rua_id: parsed.value.ruaId ?? null,
    org_id: parsed.value.orgId ?? null,
    titulo: parsed.value.titulo,
    descricao: parsed.value.descricao,
    fotos: parsed.value.fotos ?? null,
    ano: parsed.value.ano ?? null,
    criador: parsed.value.criador ?? null,
    tags: parsed.value.tags ?? null,
  };
  if (parsed.value.id) insert.id = parsed.value.id;
  if (parsed.value.coordenadas) {
    insert.lat = parsed.value.coordenadas[0];
    insert.lng = parsed.value.coordenadas[1];
  }

  const { data, error } = await supabase
    .from('stories')
    .insert([insert])
    .select('id, created_at, rua_id, org_id, titulo, descricao, fotos, lat, lng, ano, criador, tags')
    .single();

  if (error) return jsonServerError(error.message);

  const mapped = {
    id: data.id,
    created_at: data.created_at,
    rua_id: data.rua_id ?? undefined,
    org_id: data.org_id ?? undefined,
    titulo: data.titulo,
    descricao: data.descricao,
    fotos: data.fotos ?? undefined,
    coordenadas: data.lat != null && data.lng != null ? [data.lat, data.lng] as [number, number] : undefined,
    ano: data.ano ?? undefined,
    criador: data.criador ?? undefined,
    tags: data.tags ?? undefined,
  };

  return jsonOk({ data: mapped }, { status: 201 });
}
