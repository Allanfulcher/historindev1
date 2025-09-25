import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../../_utils';

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

// DELETE /api/admin/obras/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { error } = await supabase.from('works').delete().eq('id', id);
  if (error) return jsonServerError(error.message);
  return jsonOk({ ok: true });
}

// PUT /api/admin/obras/:id
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
  if (typeof raw.capa === 'string' && raw.capa.trim()) {
    if (!isValidUrl(raw.capa)) return jsonBadRequest('capa must be a valid URL');
    patch.capa = raw.capa.trim();
  }
  if (typeof raw.pago === 'boolean') patch.pago = raw.pago;
  if (typeof raw.autorId === 'string' && raw.autorId.trim()) {
    if (!isUuid(raw.autorId)) return jsonBadRequest('autorId must be a UUID');
    patch.autor_id = raw.autorId.trim();
  }
  if (typeof raw.link === 'string' && raw.link.trim()) {
    if (!isValidUrl(raw.link)) return jsonBadRequest('link must be a valid URL');
    patch.link = raw.link.trim();
  }
  if (Object.keys(patch).length === 0) return jsonBadRequest('No valid fields to update');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('works')
    .update(patch)
    .eq('id', id)
    .select('id, created_at, titulo, descricao, capa, pago, autorId:autor_id, link')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}
