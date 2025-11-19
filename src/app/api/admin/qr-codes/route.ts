import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

interface CreateQrCodePayload {
  id: string;
  rua_id: number;
  name: string;
  description?: string;
  coordinates: { lat: number; lng: number };
  active: boolean;
}

function parseCreate(body: unknown): { ok: true; value: CreateQrCodePayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { id, rua_id, name, description, coordinates, active } = body as any;

  if (typeof id !== 'string' || !id.trim()) return { ok: false, error: 'id must be a non-empty string' };
  if (typeof rua_id !== 'number' || rua_id <= 0) return { ok: false, error: 'rua_id must be a positive number' };
  if (typeof name !== 'string' || !name.trim()) return { ok: false, error: 'name must be a non-empty string' };
  
  // Validate coordinates
  if (typeof coordinates !== 'object' || coordinates === null) {
    return { ok: false, error: 'coordinates must be an object' };
  }
  if (typeof coordinates.lat !== 'number' || typeof coordinates.lng !== 'number') {
    return { ok: false, error: 'coordinates must have lat and lng as numbers' };
  }

  return {
    ok: true,
    value: {
      id: id.trim(),
      rua_id,
      name: name.trim(),
      description: typeof description === 'string' ? description.trim() : undefined,
      coordinates: { lat: coordinates.lat, lng: coordinates.lng },
      active: typeof active === 'boolean' ? active : true,
    },
  };
}

// GET /api/admin/qr-codes
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');
  const activeOnly = searchParams.get('active') === 'true';

  const supabase = await adminSupabase();
  let query = supabase
    .from('qr_codes')
    .select('*')
    .order('created_at', { ascending: false });

  if (activeOnly) {
    query = query.eq('active', true);
  }

  const { data, error } = await query.range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/qr-codes
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('qr_codes')
    .insert([parsed.value])
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
