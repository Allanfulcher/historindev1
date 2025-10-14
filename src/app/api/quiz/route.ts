import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { Database, QuizInsert } from '@/types/database.types';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { answers, score = null, meta = null, user_id = null } = body as {
      answers?: unknown;
      score?: number | null;
      meta?: unknown;
      user_id?: string | null;
    };

    if (answers === undefined) {
      return NextResponse.json(
        { error: 'Missing required field: answers' },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseServerClient<Database>();

    const payload: QuizInsert = {
      answers: answers as any,
      score: score ?? null,
      meta: (meta ?? null) as any,
      user_id: user_id ?? null,
    };

    const { data, error } = await supabase
      .from('quiz')
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}
