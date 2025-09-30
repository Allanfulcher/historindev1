"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminField";
import { PrimaryButton, DangerButton } from "@/components/admin/AdminActions";

// Matches src/types/index.ts Cidade (subset)
type Cidade = {
  id: string;
  created_at: string;
  nome: string;
  estado: string;
  populacao: string;
  descricao?: string;
  foto?: string;
};

export default function AdminCidadesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Cidade[]>([]);

  const [form, setForm] = useState({
    nome: "",
    estado: "",
    populacao: "",
    descricao: "",
    foto: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.nome.trim().length > 0 &&
      form.estado.trim().length > 0 &&
      form.populacao.trim().length > 0
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: Cidade[] }>(`/api/admin/cidades`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load cities");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const payload = {
        nome: form.nome.trim(),
        estado: form.estado.trim(),
        populacao: form.populacao.trim(),
        descricao: form.descricao.trim() || undefined,
        foto: form.foto.trim() || undefined,
      };
      await adminFetch(`/api/admin/cidades`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ nome: "", estado: "", populacao: "", descricao: "", foto: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create city");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this city?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/cidades/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete city");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Cidades" />

      <AdminSection title="Criar Cidade">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="Nome"
            type="text"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            required
          />
          <AdminInput
            label="Estado"
            type="text"
            value={form.estado}
            onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}
            placeholder="RS"
            required
          />
          <AdminInput
            label="População"
            type="text"
            value={form.populacao}
            onChange={(e) => setForm((f) => ({ ...f, populacao: e.target.value }))}
            placeholder="ex: 36.000"
            required
          />
          <AdminInput
            label="Foto (URL opcional)"
            type="url"
            value={form.foto}
            onChange={(e) => setForm((f) => ({ ...f, foto: e.target.value }))}
            placeholder="https://.../cidade.jpg"
          />
          <div className="md:col-span-2">
            <AdminTextarea
              label="Descrição (opcional)"
              value={form.descricao}
              onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
              rows={3}
            />
          </div>
          <div className="md:col-span-2">
            <PrimaryButton disabled={!canSubmit || loading} type="submit">
              {loading ? "Salvando..." : "Criar"}
            </PrimaryButton>
          </div>
        </form>
      </AdminSection>

      <AdminSection title={`Cidades (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhuma cidade encontrada.</p>}
        <AdminTable
          columns={[
            { key: "id", label: "ID (UUID)" },
            { key: "nome", label: "Nome" },
            { key: "estado", label: "Estado" },
            { key: "populacao", label: "População" },
            { key: "descricao", label: "Descrição" },
            { key: "foto", label: "Foto" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((c, rowIdx) => (
            <tr key={c.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top whitespace-nowrap text-xs">
                <div className="font-mono break-all max-w-[220px]">{c.id}</div>
                <button
                  type="button"
                  className="mt-1 text-[11px] text-blue-700 hover:underline"
                  onClick={() => navigator.clipboard.writeText(c.id)}
                  title="Copiar UUID"
                >
                  Copiar
                </button>
              </td>
              <td className="py-3 pr-3 pl-3 align-top">
                <div className="font-medium">{c.nome}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(c.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">{c.estado}</td>
              <td className="py-3 pr-3 align-top">{c.populacao}</td>
              <td className="py-3 pr-3 align-top max-w-md">
                <div className="text-sm whitespace-pre-wrap line-clamp-3">{c.descricao || ""}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                {c.foto ? (
                  <a className="text-[#8B4513] underline break-words" href={c.foto} target="_blank" rel="noopener noreferrer">Foto</a>
                ) : (
                  <span className="text-[#A0958A] text-xs">—</span>
                )}
              </td>
              <td className="py-3 pr-3 align-top">
                <DangerButton onClick={() => handleDelete(c.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
