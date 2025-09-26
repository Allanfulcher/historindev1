import { NextRequest, NextResponse } from 'next/server';
import { adminSupabase, jsonBadRequest, jsonOk, jsonServerError, requireAdmin } from '../../_utils';

// CSV helpers
function toCsvValue(v: unknown): string {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function arrayToCsv(rows: Array<Record<string, any>>, headers: string[]): string {
  const head = headers.map(toCsvValue).join(',');
  const body = rows
    .map((r) => headers.map((h) => toCsvValue(r[h])).join(','))
    .join('\n');
  return [head, body].filter(Boolean).join('\n');
}

// Very small CSV parser that supports quoted fields and commas within quotes
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let i = 0;
  const n = text.length;
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  function endField() {
    row.push(field);
    field = '';
  }
  function endRow() {
    rows.push(row);
    row = [];
  }

  while (i < n) {
    const ch = text[i++];
    if (inQuotes) {
      if (ch === '"') {
        if (i < n && text[i] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        endField();
      } else if (ch === '\n') {
        endField();
        endRow();
      } else if (ch === '\r') {
        // ignore, handle on next \n
      } else {
        field += ch;
      }
    }
  }
  // push last field/row
  endField();
  endRow();
  // remove trailing empty row if file ends with newline
  if (rows.length && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === '') {
    rows.pop();
  }
  return rows;
}

// GET /api/admin/questions/csv?city=1
// Exports quiz_questions to CSV
export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  const supabase = await adminSupabase();
  let query = supabase.from('quiz_questions').select('*').order('created_at', { ascending: false });
  if (city) query = query.eq('city', Number(city));

  const { data, error } = await query;
  if (error) return jsonServerError(error.message);

  const headers = ['id', 'city', 'question', 'option1', 'option2', 'option3', 'option4', 'answer', 'created_at'];
  const rows = (data || []).map((q: any) => ({
    id: q.id,
    city: q.city,
    question: q.question,
    option1: q.options?.[0] ?? '',
    option2: q.options?.[1] ?? '',
    option3: q.options?.[2] ?? '',
    option4: q.options?.[3] ?? '',
    answer: q.answer,
    created_at: q.created_at,
  }));

  const csv = arrayToCsv(rows, headers);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="quiz_questions.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}

// POST /api/admin/questions/csv
// Imports CSV into quiz_questions. Accepts either text/csv raw body or multipart/form-data with a `file` field.
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  let csvText: string | null = null;
  const contentType = req.headers.get('content-type') || '';

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const file = form.get('file');
      if (!file || !(file instanceof File)) {
        return jsonBadRequest('Missing file field');
      }
      csvText = await file.text();
    } else {
      csvText = await req.text();
      if (!contentType.includes('text/csv') && !contentType.includes('text/plain')) {
        // allow but warn in logs
        console.warn('Importing CSV with content-type:', contentType);
      }
    }
  } catch {
    return jsonBadRequest('Failed to read request body');
  }

  if (!csvText || !csvText.trim()) return jsonBadRequest('Empty CSV');

  // Parse
  const rows = parseCsv(csvText);
  if (!rows.length) return jsonBadRequest('CSV has no rows');

  // Expect headers: id,city,question,option1,option2,option3,option4,answer
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => headers.indexOf(name);

  const required = ['city', 'question', 'option1', 'option2', 'option3', 'option4', 'answer'];
  for (const r of required) if (idx(r) === -1) return jsonBadRequest(`Missing column: ${r}`);

  const records = rows.slice(1).filter((r) => r.length > 1 && r.some((c) => c.trim() !== ''));
  if (!records.length) return jsonBadRequest('No data rows found');

  // Map to DB payloads
  const payload = records.map((r) => {
    const city = Number(r[idx('city')]);
    const answer = Number(r[idx('answer')]);
    const question = r[idx('question')];
    const options = [r[idx('option1')], r[idx('option2')], r[idx('option3')], r[idx('option4')]];
    return { city, question, options, answer };
  });

  // Basic validation
  for (const p of payload) {
    if (!Number.isFinite(p.city)) return jsonBadRequest('Invalid city value');
    if (typeof p.question !== 'string' || !p.question.trim()) return jsonBadRequest('Invalid question');
    if (!Array.isArray(p.options) || p.options.length !== 4 || p.options.some((s) => typeof s !== 'string')) return jsonBadRequest('Invalid options');
    if (!Number.isFinite(p.answer) || p.answer < 1 || p.answer > 4) return jsonBadRequest('Invalid answer (must be 1..4)');
  }

  const supabase = await adminSupabase();
  const { data, error } = await supabase.from('quiz_questions').insert(payload).select('*');
  if (error) return jsonServerError(error.message);

  return jsonOk({ inserted: data?.length ?? 0, data });
}
