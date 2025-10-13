import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../../_utils';

// DELETE /api/admin/ads/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { error } = await supabase.from('ads').delete().eq('id', id);
  if (error) return jsonServerError(error.message);
  return jsonOk({ ok: true });
}

// PUT /api/admin/ads/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = params.id;
  if (!id) return jsonBadRequest('Missing id');

  const raw = await req.json().catch(() => null) as any;
  if (!raw || typeof raw !== 'object') return jsonBadRequest('Invalid JSON body');

  const patch: Record<string, any> = {};
  const set = (k: string, v: any, allowNull = false) => {
    if (v === undefined) return;
    if (v === null && allowNull) { patch[k] = null; return; }
    if (typeof v === 'string') { patch[k] = v.trim(); return; }
    patch[k] = v;
  };

  set('active', typeof raw.active === 'boolean' ? raw.active : undefined);
  set('title', raw.title);
  set('description', raw.description);
  set('image_url', raw.image_url);
  set('link_url', raw.link_url);
  set('tag', raw.tag, true);
  set('priority', typeof raw.priority === 'number' ? raw.priority : undefined);
  set('placement', raw.placement);
  set('match_keywords', Array.isArray(raw.match_keywords) ? raw.match_keywords.map(String) : undefined);
  set('rua_id', raw.rua_id ?? undefined, true);
  set('historia_id', raw.historia_id ?? undefined, true);
  set('negocio_id', raw.negocio_id ?? undefined, true);
  set('start_at', raw.start_at ?? undefined, true);
  set('end_at', raw.end_at ?? undefined, true);

  if (Object.keys(patch).length === 0) return jsonBadRequest('No valid fields to update');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('ads')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}
