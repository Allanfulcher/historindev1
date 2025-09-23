import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

interface CreateBusinessPayload {
  nome: string;
  endereco: string;
  telefone?: string;
  categoria: string;
}

function parseCreate(body: unknown): { ok: true; value: CreateBusinessPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { nome, endereco, telefone, categoria } = body as any;
  if (typeof nome !== 'string' || !nome.trim()) return { ok: false, error: 'nome must be a non-empty string' };
  if (typeof endereco !== 'string' || !endereco.trim()) return { ok: false, error: 'endereco must be a non-empty string' };
  if (typeof categoria !== 'string' || !categoria.trim()) return { ok: false, error: 'categoria must be a non-empty string' };
  if (telefone && typeof telefone !== 'string') return { ok: false, error: 'telefone must be a string' };
  return { ok: true, value: { nome: nome.trim(), endereco: endereco.trim(), telefone: telefone?.trim(), categoria: categoria.trim() } };
}

// GET /api/admin/negocios
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/negocios
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('businesses')
    .insert([parsed.value])
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
