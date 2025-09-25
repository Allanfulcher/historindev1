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

// DELETE /api/admin/orgs/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { error } = await supabase.from('organizations').delete().eq('id', id);
  if (error) return jsonServerError(error.message);
  return jsonOk({ ok: true });
}

// PUT /api/admin/orgs/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const raw = await req.json().catch(() => null) as any;
  if (!raw || typeof raw !== 'object') return jsonBadRequest('Invalid JSON body');

  const patch: Record<string, any> = {};
  if (typeof raw.fantasia === 'string' && raw.fantasia.trim()) patch.fantasia = raw.fantasia.trim();
  if (typeof raw.link === 'string' && raw.link.trim()) {
    if (!isValidUrl(raw.link)) return jsonBadRequest('link must be a valid URL');
    patch.link = raw.link.trim();
  }
  if (typeof raw.logo === 'string' && raw.logo.trim()) {
    if (!isValidUrl(raw.logo)) return jsonBadRequest('logo must be a valid URL');
    patch.logo = raw.logo.trim();
  }
  if (typeof raw.cor === 'string' && raw.cor.trim()) {
    if (!/^#?[0-9a-fA-F]{3,8}$/.test(raw.cor)) return jsonBadRequest('cor must be a hex color like #8B4513');
    patch.cor = raw.cor.trim();
  }
  if (typeof raw.sobre === 'string') patch.sobre = raw.sobre.trim();
  if (typeof raw.foto === 'string' && raw.foto.trim()) {
    if (!isValidUrl(raw.foto)) return jsonBadRequest('foto must be a valid URL');
    patch.foto = raw.foto.trim();
  }
  if (Object.keys(patch).length === 0) return jsonBadRequest('No valid fields to update');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('organizations')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}
