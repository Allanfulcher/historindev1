import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../../_utils';

// DELETE /api/admin/negocios/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { error } = await supabase.from('businesses').delete().eq('id', id);
  if (error) return jsonServerError(error.message);
  return jsonOk({ ok: true });
}

// PUT /api/admin/negocios/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const raw = await req.json().catch(() => null) as any;
  if (!raw || typeof raw !== 'object') return jsonBadRequest('Invalid JSON body');

  const patch: Record<string, any> = {};
  if (typeof raw.nome === 'string' && raw.nome.trim()) patch.nome = raw.nome.trim();
  if (typeof raw.endereco === 'string' && raw.endereco.trim()) patch.endereco = raw.endereco.trim();
  if (typeof raw.categoria === 'string' && raw.categoria.trim()) patch.categoria = raw.categoria.trim();
  if (typeof raw.telefone === 'string') patch.telefone = raw.telefone.trim();
  if (typeof raw.descricao === 'string') patch.descricao = raw.descricao.trim();
  if (typeof raw.foto === 'string') patch.foto = raw.foto.trim();
  if (typeof raw.logo_url === 'string') patch.logo_url = raw.logo_url.trim();
  if (typeof raw.website === 'string') patch.website = raw.website.trim();
  if (typeof raw.instagram === 'string') patch.instagram = raw.instagram.trim();
  if (typeof raw.facebook === 'string') patch.facebook = raw.facebook.trim();
  if (typeof raw.email === 'string') patch.email = raw.email.trim();
  if (Object.keys(patch).length === 0) return jsonBadRequest('No valid fields to update');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('businesses')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}
