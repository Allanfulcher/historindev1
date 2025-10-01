export interface SubmitQuizPayload {
  answers: unknown;
  score?: number | null;
  meta?: unknown;
  user_id?: string | null;
}

export async function submitQuiz(payload: SubmitQuizPayload) {
  const target =
    'https://script.google.com/macros/s/AKfycbzQvlJ-Sb4FhoLdWcbZv-NObK1T3K4ZVHn0nDX8Tg5j4mHBzei-dFjpWa0-wwwNvpZz3Q/exec';

  const meta = (payload.meta as any) || {};
  const params: Record<string, string> = {
    // Common meta
    name: meta.name ? String(meta.name) : '',
    email: meta.email ? String(meta.email) : '',
    city: meta.city ? String(meta.city) : '',
    percentage: meta.percentage != null ? String(meta.percentage) : '',
    totalQuestions: meta.totalQuestions != null ? String(meta.totalQuestions) : '',
    ts: meta.ts ? String(meta.ts) : new Date().toISOString(),
    // Score and ids
    score: payload.score != null ? String(payload.score) : '',
    user_id: payload.user_id ? String(payload.user_id) : '',
    // Answers as JSON string (so it can be captured in a single cell if header exists)
    answers: JSON.stringify(payload.answers ?? []),
    // Source tag
    source: 'historin-web',
  };

  const body = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => body.append(k, v));

  let res: Response;
  try {
    res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body,
      // Avoid cached responses
      cache: 'no-store',
    });
  } catch (e: any) {
    throw new Error(`Network error submitting quiz: ${e?.message || e}`);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to submit quiz to Google Apps Script`);
  }

  try {
    return await res.json();
  } catch {
    return { ok: true, text: await res.text().catch(() => '') };
  }
}
