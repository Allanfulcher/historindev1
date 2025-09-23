"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/utils/adminApi";
import { isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput, AdminTextarea, AdminSelect } from "@/components/admin/AdminField";
import { PrimaryButton, SecondaryButton, DangerButton, ActionsBar } from "@/components/admin/AdminActions";

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
      <AdminHeader title="Perguntas Quiz" />

      <AdminSection title="Filtro">
        <div className="flex gap-3 items-end flex-wrap">
          <AdminInput
            label="Cidade (opcional)"
            type="number"
            value={city as any}
            onChange={(e) => setCity(e.target.value === "" ? "" : Number(e.target.value))}
            containerClassName="w-48"
            placeholder="e.g. 33"
          />
          <SecondaryButton onClick={load}>Reload</SecondaryButton>
        </div>
      </AdminSection>

      <AdminSection title="Criar Pergunta">
        <form onSubmit={handleCreate} className="space-y-4">
          <AdminInput
            label="Cidade (0 = Gramado, 1 = Canela, 2 = Ambas)"
            type="number"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            containerClassName="w-48"
            required
          />

          <AdminTextarea
            label="Pergunta"
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
            rows={3}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.options.map((opt, idx) => (
              <AdminInput
                key={idx}
                label={`Opção ${idx + 1}`}
                type="text"
                value={opt}
                onChange={(e) =>
                  setForm((f) => {
                    const next = [...f.options];
                    next[idx] = e.target.value;
                    return { ...f, options: next };
                  })
                }
                required
              />
            ))}
          </div>

          <AdminSelect
            label="Resposta Correta"
            value={form.answer as any}
            onChange={(e) => setForm((f) => ({ ...f, answer: Number(e.target.value) }))}
            containerClassName="w-48"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </AdminSelect>

          <PrimaryButton disabled={!canSubmit || loading} type="submit">
            {loading ? "Salvando..." : "Criar"}
          </PrimaryButton>
        </form>
      </AdminSection>

      <AdminSection title={`Perguntas Existentes (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhuma pergunta encontrada.</p>}
        <AdminTable
          columns={[
            { key: "city", label: "Cidade" },
            { key: "question", label: "Pergunta" },
            { key: "options", label: "Opções" },
            { key: "answer", label: "Resposta" },
            { key: "actions", label: "" },
          ]}
        >
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
                <DangerButton onClick={() => handleDelete(q.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
