import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../../_utils';

function isUuid(v: string) {
  return /^[0-9a-fA-F-]{36}$/.test(v);
}

function parseArrayMaybe(v: any): string[] | null | undefined {
  if (v === undefined) return undefined;
  if (v === null) return null;
  if (!Array.isArray(v)) return undefined;
  const arr = v.map((x) => String(x).trim()).filter((s) => s.length > 0);
  return arr.length ? arr : null;
}

// DELETE /api/admin/historias/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { error } = await supabase.from('stories').delete().eq('id', id);
  if (error) return jsonServerError(error.message);
  return jsonOk({ ok: true });
}

// PUT /api/admin/historias/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const raw = await req.json().catch(() => null) as any;
  if (!raw || typeof raw !== 'object') return jsonBadRequest('Invalid JSON body');

  const patch: Record<string, any> = {};
  if (typeof raw.titulo === 'string' && raw.titulo.trim()) patch.titulo = raw.titulo.trim();
  if (typeof raw.descricao === 'string' && raw.descricao.trim()) patch.descricao = raw.descricao.trim();
  if (typeof raw.ruaId === 'string' && raw.ruaId.trim()) {
    if (!isUuid(raw.ruaId)) return jsonBadRequest('ruaId must be a UUID');
    patch.rua_id = raw.ruaId.trim();
  }
  if (typeof raw.orgId === 'string' && raw.orgId.trim()) {
    if (!isUuid(raw.orgId)) return jsonBadRequest('orgId must be a UUID');
    patch.org_id = raw.orgId.trim();
  }
  if (typeof raw.ano === 'string') patch.ano = raw.ano.trim() || null;
  if (typeof raw.criador === 'string') patch.criador = raw.criador.trim() || null;

  const fotos = parseArrayMaybe(raw.fotos);
  if (fotos !== undefined) patch.fotos = fotos;
  const tags = parseArrayMaybe(raw.tags);
  if (tags !== undefined) patch.tags = tags;

  if (raw.coordenadas) {
    if (!Array.isArray(raw.coordenadas) || raw.coordenadas.length !== 2) return jsonBadRequest('coordenadas must be [lat, lng]');
    const [lat, lng] = raw.coordenadas;
    if (typeof lat !== 'number' || typeof lng !== 'number' || Number.isNaN(lat) || Number.isNaN(lng)) return jsonBadRequest('coordenadas must contain numbers');
    patch.lat = lat;
    patch.lng = lng;
  }

  if (Object.keys(patch).length === 0) return jsonBadRequest('No valid fields to update');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('stories')
    .update(patch)
    .eq('id', id)
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

  return jsonOk({ data: mapped });
}
