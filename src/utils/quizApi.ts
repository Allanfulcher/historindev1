export interface SubmitQuizPayload {
  answers: unknown;
  score?: number | null;
  meta?: unknown;
  user_id?: string | null;
}

export async function submitQuiz(payload: SubmitQuizPayload) {
  const res = await fetch('/api/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to submit quiz');
  }

  return res.json();
}
