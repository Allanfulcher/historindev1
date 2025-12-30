import { NextRequest, NextResponse } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../../_utils';

interface UpdateQrCodePayload {
  name?: string;
  description?: string;
  coordinates?: { lat: number; lng: number };
  valid_strings?: string[];
  active?: boolean;
  rua_id?: number;
}

function parseUpdate(body: unknown): { ok: true; value: UpdateQrCodePayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { name, description, coordinates, valid_strings, active, rua_id } = body as any;

  const result: UpdateQrCodePayload = {};

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) return { ok: false, error: 'name must be a non-empty string' };
    result.name = name.trim();
  }

  if (description !== undefined) {
    if (typeof description !== 'string') return { ok: false, error: 'description must be a string' };
    result.description = description.trim();
  }

  if (coordinates !== undefined) {
    if (typeof coordinates !== 'object' || coordinates === null) {
      return { ok: false, error: 'coordinates must be an object' };
    }
    if (typeof coordinates.lat !== 'number' || typeof coordinates.lng !== 'number') {
      return { ok: false, error: 'coordinates must have lat and lng as numbers' };
    }
    result.coordinates = { lat: coordinates.lat, lng: coordinates.lng };
  }

  if (valid_strings !== undefined) {
    if (!Array.isArray(valid_strings) || valid_strings.length === 0) {
      return { ok: false, error: 'valid_strings must be a non-empty array' };
    }
    const validStringsArray = valid_strings
      .map(s => typeof s === 'string' ? s.trim() : '')
      .filter(s => s.length > 0);
    
    if (validStringsArray.length === 0) {
      return { ok: false, error: 'valid_strings must contain at least one non-empty string' };
    }
    result.valid_strings = validStringsArray;
  }

  if (active !== undefined) {
    if (typeof active !== 'boolean') return { ok: false, error: 'active must be a boolean' };
    result.active = active;
  }

  if (rua_id !== undefined) {
    if (typeof rua_id !== 'number' || rua_id <= 0) return { ok: false, error: 'rua_id must be a positive number' };
    result.rua_id = rua_id;
  }

  return { ok: true, value: result };
}

// GET /api/admin/qr-codes/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  if (!params?.id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (error) return jsonServerError(error.message);
  if (!data) return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
  return jsonOk({ data });
}

// PATCH /api/admin/qr-codes/[id]
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  if (!params?.id) return jsonBadRequest('Missing id');

  const raw = await req.json().catch(() => null);
  const parsed = parseUpdate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('qr_codes')
    .update(parsed.value)
    .eq('id', params.id)
    .select('*')
    .maybeSingle();

  if (error) return jsonServerError(error.message);
  if (!data) return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
  return jsonOk({ data });
}

// DELETE /api/admin/qr-codes/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  if (!params?.id) return jsonBadRequest('Missing id');

  const supabase = await adminSupabase();
  const { error } = await supabase
    .from('qr_codes')
    .delete()
    .eq('id', params.id);

  if (error) return jsonServerError(error.message);
  return jsonOk({ message: 'QR code deleted' });
}
