import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../../_utils';

function isValidNumber(n: any) {
  return typeof n === 'number' && !Number.isNaN(n);
}

function isUuid(v: string) {
  return /^[0-9a-fA-F-]{36}$/.test(v);
}

// DELETE /api/admin/ruas/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { error } = await supabase.from('streets').delete().eq('id', id);
  if (error) return jsonServerError(error.message);
  return jsonOk({ ok: true });
}

// PUT /api/admin/ruas/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const raw = await req.json().catch(() => null) as any;
  if (!raw || typeof raw !== 'object') return jsonBadRequest('Invalid JSON body');

  const patch: Record<string, any> = {};
  if (typeof raw.nome === 'string' && raw.nome.trim()) patch.nome = raw.nome.trim();
  if (typeof raw.fotos === 'string') patch.fotos = raw.fotos.trim() || null;
  if (typeof raw.cidadeId === 'string' && raw.cidadeId.trim()) {
    if (!isUuid(raw.cidadeId)) return jsonBadRequest('cidadeId must be a UUID');
    patch.cidade_id = raw.cidadeId.trim();
  }
  if (typeof raw.descricao === 'string') patch.descricao = raw.descricao.trim() || null;
  if (raw.coordenadas) {
    if (!Array.isArray(raw.coordenadas) || raw.coordenadas.length !== 2) return jsonBadRequest('coordenadas must be [lat, lng]');
    const [lat, lng] = raw.coordenadas;
    if (!isValidNumber(lat) || !isValidNumber(lng)) return jsonBadRequest('coordenadas must be numbers');
    patch.lat = lat;
    patch.lng = lng;
  }
  if (Object.keys(patch).length === 0) return jsonBadRequest('No valid fields to update');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('streets')
    .update(patch)
    .eq('id', id)
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

  return jsonOk({ data: mapped });
}
