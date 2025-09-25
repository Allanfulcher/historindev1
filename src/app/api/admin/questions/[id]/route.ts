import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function validateAuth(req: NextRequest): boolean {
  const token = req.headers.get('x-admin-token') || req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAuth(req)) return unauthorized();
  const id = params.id;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

  const updatable = ['city', 'question', 'options', 'answer'] as const;
  const patch: any = {};
  for (const key of updatable) if (key in body) patch[key] = (body as any)[key];
  if (Object.keys(patch).length === 0) return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });

  // Optional basic validations
  if ('options' in patch && (!Array.isArray(patch.options) || patch.options.length !== 4)) {
    return NextResponse.json({ error: 'options must be an array of 4 strings' }, { status: 400 });
  }
  if ('answer' in patch && (typeof patch.answer !== 'number' || patch.answer < 1 || patch.answer > 4)) {
    return NextResponse.json({ error: 'answer must be 1..4' }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('quiz_questions')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAuth(req)) return unauthorized();
  const id = params.id;
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.from('quiz_questions').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
