import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

interface CreateCityPayload {
  nome: string;
  estado: string;
  populacao: string;
  descricao?: string;
  foto?: string;
}

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
}

function parseCreate(body: unknown): { ok: true; value: CreateCityPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { nome, estado, populacao, descricao, foto } = body as any;
  if (typeof nome !== 'string' || !nome.trim()) return { ok: false, error: 'nome must be a non-empty string' };
  if (typeof estado !== 'string' || !estado.trim()) return { ok: false, error: 'estado must be a non-empty string' };
  if (typeof populacao !== 'string' || !populacao.trim()) return { ok: false, error: 'populacao must be a non-empty string' };
  if (foto && (typeof foto !== 'string' || !isValidUrl(foto))) return { ok: false, error: 'foto must be a valid URL' };
  return { ok: true, value: { nome: nome.trim(), estado: estado.trim(), populacao: populacao.trim(), descricao: descricao?.trim(), foto: foto?.trim() } };
}

// GET /api/admin/cidades
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/cidades
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreate(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('cities')
    .insert([parsed.value])
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
