import { NextRequest } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../_utils';

// Types for payloads (kept local so we can evolve independently per resource)
type CreateQuestionPayload = {
  city: number;
  question: string;
  options: string[]; // exactly 4
  answer: number;    // 1..4 (1-based)
};

// Helpers to parse and validate input cleanly
function parseCreatePayload(body: unknown): { ok: true; value: CreateQuestionPayload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'Invalid JSON body' };
  const { city, question, options, answer } = body as any;
  if (typeof city !== 'number') return { ok: false, error: 'city must be a number' };
  if (typeof question !== 'string' || !question.trim()) return { ok: false, error: 'question must be a non-empty string' };
  if (!Array.isArray(options) || options.length !== 4 || options.some((o) => typeof o !== 'string' || !o.trim())) {
    return { ok: false, error: 'options must be an array of 4 non-empty strings' };
  }
  if (typeof answer !== 'number' || answer < 1 || answer > 4) return { ok: false, error: 'answer must be in range 1..4' };
  return { ok: true, value: { city, question, options, answer } };
}

// GET /api/admin/questions?city=33&limit=50&offset=0
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const limit = Number(searchParams.get('limit') ?? '100');
  const offset = Number(searchParams.get('offset') ?? '0');

  const supabase = await adminSupabase();
  let query = supabase
    .from('quiz_questions')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + Math.max(0, Math.min(limit, 500)) - 1);

  if (city) query = query.eq('city', Number(city));

  const { data, error } = await query;
  if (error) return jsonServerError(error.message);
  return jsonOk({ data });
}

// POST /api/admin/questions
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const raw = await req.json().catch(() => null);
  const parsed = parseCreatePayload(raw);
  if (!parsed.ok) return jsonBadRequest(parsed.error);

  const supabase = await adminSupabase();
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert([parsed.value])
    .select('*')
    .single();

  if (error) return jsonServerError(error.message);
  return jsonOk({ data }, { status: 201 });
}
