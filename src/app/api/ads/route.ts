import { NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { jsonBadRequest, jsonOk, jsonServerError } from '../admin/_utils';

// GET /api/ads?ruaId=1
// Returns a single best ad for the rua (or generic), honoring active/time window
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ruaId = searchParams.get('ruaId');

  const supabase = await getSupabaseServerClient();

  // Base filter: active and within time window
  let query = supabase
    .from('ads')
    .select('*')
    .eq('active', true)
    .lte('start_at', new Date().toISOString())
    .or('start_at.is.null')
    .gte('end_at', new Date().toISOString())
    .or('end_at.is.null') as any;

  if (ruaId) {
    // Prefer rua-targeted ads first
    const { data: targeted, error: err1 } = await supabase
      .from('ads')
      .select('*')
      .eq('active', true)
      .or('start_at.is.null,start_at.lte.' + new Date().toISOString())
      .or('end_at.is.null,end_at.gte.' + new Date().toISOString())
      .eq('rua_id', ruaId)
      .order('priority', { ascending: false })
      .order('updated_at', { ascending: false })
      .limit(1);
    if (err1) return jsonServerError(err1.message);
    if (targeted && targeted.length > 0) return jsonOk({ data: targeted[0] });
  }

  // Fallback: generic ads
  const { data, error } = await supabase
    .from('ads')
    .select('*')
    .eq('active', true)
    .or('start_at.is.null,start_at.lte.' + new Date().toISOString())
    .or('end_at.is.null,end_at.gte.' + new Date().toISOString())
    .is('rua_id', null)
    .order('priority', { ascending: false })
    .order('updated_at', { ascending: false })
    .limit(1);

  if (error) return jsonServerError(error.message);
  if (!data || data.length === 0) return jsonBadRequest('No ad available');
  return jsonOk({ data: data[0] });
}
