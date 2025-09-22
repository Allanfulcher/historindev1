"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/utils/adminApi";
import { getAdminSession, isAdminAuthenticated, logoutAdmin } from "@/utils/adminApi";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  created_at: string;
  city: number;
  question: string;
  options: string[];
  answer: number; // 1..4
};

export default function AdminQuestionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Question[]>([]);
  const [city, setCity] = useState<number | "">("");
  const [remainingMs, setRemainingMs] = useState<number>(getAdminSession()?.remainingMs ?? 0);

  const [form, setForm] = useState({
    city: "",
    question: "",
    options: ["", "", "", ""],
    answer: 1,
  });

  const canSubmit = useMemo(() => {
    return (
      String(form.city).length > 0 &&
      form.question.trim().length > 0 &&
      form.options.every((o) => o.trim().length > 0) &&
      form.options.length === 4 &&
      form.answer >= 1 && form.answer <= 4
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const qs = city !== "" ? `?city=${city}` : "";
      const res = await adminFetch<{ data: Question[] }>(`/api/admin/questions${qs}`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // redirect to /admin if not authenticated
    if (!isAdminAuthenticated()) {
      router.replace("/admin");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    const id = setInterval(() => {
      const s = getAdminSession();
      setRemainingMs(s?.remainingMs ?? 0);
      if (!s) {
        // expire session: send user to login
        router.replace("/admin");
      }
    }, 1000);
    return () => clearInterval(id);
  }, [router]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const payload = {
        city: Number(form.city),
        question: form.question.trim(),
        options: form.options.map((o) => o.trim()),
        answer: Number(form.answer),
      };
      await adminFetch(`/api/admin/questions`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ city: String(form.city), question: "", options: ["", "", "", ""], answer: 1 });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create question");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this question?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/questions/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete question");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-[#6B5B4F]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-[#4A3F35]">Perguntas Quiz</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#A0958A]">
            Sessão: {Math.max(0, Math.floor(remainingMs / 60000))}:{String(Math.max(0, Math.floor((remainingMs % 60000) / 1000))).padStart(2, '0')}
          </span>
          <button onClick={() => { logoutAdmin(); router.replace('/admin'); }} className="px-3 py-1 rounded-md bg-[#8B4513] text-white hover:bg-[#A0522D] transition">Logout</button>
          <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin">Voltar para Admin</Link>
        </div>
      </div>

      <section className="p-6 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-[#4A3F35]">Filtro</h2>
        <div className="flex gap-3 items-end flex-wrap">
          <div>
            <label className="block text-sm text-[#4A3F35] font-bold mb-1">Cidade (opcional)</label>
            <input
              type="number"
              value={city}
              onChange={(e) => setCity(e.target.value === "" ? "" : Number(e.target.value))}
              className="shadow appearance-none border border-[#F5F1EB] rounded w-48 py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              placeholder="e.g. 33"
            />
          </div>
          <button onClick={load} className="px-4 py-2 rounded bg-transparent hover:bg-[#F5F1EB] text-[#6B5B4F] border border-[#F5F1EB] transition">Reload</button>
        </div>
      </section>

      <section className="p-6 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#4A3F35]">Criar Pergunta</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-[#4A3F35] text-sm font-bold mb-1">Cidade (0 = Gramado, 1 = Canela, 2 = Ambas)</label>
            <input
              type="number"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="shadow appearance-none border border-[#F5F1EB] rounded w-48 py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              required
            />
          </div>
          <div>
            <label className="block text-[#4A3F35] text-sm font-bold mb-1">Pergunta</label>
            <textarea
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.options.map((opt, idx) => (
              <div key={idx}>
                <label className="block text-[#4A3F35] text-sm font-bold mb-1">Opção {idx + 1}</label>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) =>
                    setForm((f) => {
                      const next = [...f.options];
                      next[idx] = e.target.value;
                      return { ...f, options: next };
                    })
                  }
                  className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
                  required
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-[#4A3F35] text-sm font-bold mb-1">Resposta Correta</label>
            <select
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: Number(e.target.value) }))}
              className="shadow appearance-none border border-[#F5F1EB] rounded w-48 py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <button disabled={!canSubmit || loading} type="submit" className="px-4 py-2 rounded bg-[#8B4513] text-white hover:bg-[#A0522D] transition disabled:opacity-60">
            {loading ? "Salvando..." : "Criar"}
          </button>
        </form>
      </section>

      <section className="p-6 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-[#4A3F35]">Perguntas Existentes ({items.length})</h2>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhuma pergunta encontrada.</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-[#F5F1EB] rounded-lg overflow-hidden">
            <thead className="bg-[#F5F1EB] text-[#4A3F35]">
              <tr className="text-left">
                <th className="py-2 pr-3 pl-3">Cidade</th>
                <th className="py-2 pr-3">Pergunta</th>
                <th className="py-2 pr-3">Opções</th>
                <th className="py-2 pr-3">Resposta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1EB]">
              {items.map((q, rowIdx) => (
                <tr key={q.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
                  <td className="py-3 pr-3 pl-3 align-top">{q.city}</td>
                  <td className="py-3 pr-3 max-w-xl align-top">
                    <div className="whitespace-pre-wrap leading-relaxed">{q.question}</div>
                    <div className="text-[11px] text-[#A0958A] mt-1">{new Date(q.created_at).toLocaleString()}</div>
                  </td>
                  <td className="py-3 pr-3 align-top">
                    <ol className="list-decimal list-inside space-y-1">
                      {q.options.map((o, i) => (
                        <li key={i} className={i + 1 === q.answer ? "font-semibold" : undefined}>
                          {i + 1}. {o}
                        </li>
                      ))}
                    </ol>
                  </td>
                  <td className="py-3 pr-3 align-top">{q.answer}</td>
                  <td className="py-3 pr-3 align-top">
                    <button onClick={() => handleDelete(q.id)} className="px-2.5 py-1.5 rounded bg-[#A0522D] text-white hover:bg-[#8B4513] transition">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
