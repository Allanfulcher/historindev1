"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput } from "@/components/admin/AdminField";
import { PrimaryButton, DangerButton } from "@/components/admin/AdminActions";

// Matches src/types/index.ts Negocio (subset)
type Negocio = {
  id: string;
  created_at: string;
  nome: string;
  endereco: string;
  telefone?: string;
  categoria: string;
};

export default function AdminNegociosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Negocio[]>([]);

  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    categoria: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.nome.trim().length > 0 &&
      form.endereco.trim().length > 0 &&
      form.categoria.trim().length > 0
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: Negocio[] }>(`/api/admin/negocios`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load businesses");
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
        endereco: form.endereco.trim(),
        telefone: form.telefone.trim() || undefined,
        categoria: form.categoria.trim(),
      };
      await adminFetch(`/api/admin/negocios`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ nome: "", endereco: "", telefone: "", categoria: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create business");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this business?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/negocios/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete business");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Negócios" />

      <AdminSection title="Criar Negócio">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="Nome"
            type="text"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            required
          />
          <AdminInput
            label="Categoria"
            type="text"
            value={form.categoria}
            onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
            placeholder="ex: Restaurante"
            required
          />
          <AdminInput
            label="Endereço"
            type="text"
            value={form.endereco}
            onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))}
            required
          />
          <AdminInput
            label="Telefone (opcional)"
            type="text"
            value={form.telefone}
            onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
            placeholder="ex: (11) 99999-9999"
          />
          <div className="md:col-span-2">
            <PrimaryButton disabled={!canSubmit || loading} type="submit">
              {loading ? "Salvando..." : "Criar"}
            </PrimaryButton>
          </div>
        </form>
      </AdminSection>

      <AdminSection title={`Negócios (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhum negócio encontrado.</p>}
        <AdminTable
          columns={[
            { key: "nome", label: "Nome" },
            { key: "categoria", label: "Categoria" },
            { key: "endereco", label: "Endereço" },
            { key: "telefone", label: "Telefone" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((n, rowIdx) => (
            <tr key={n.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top">
                <div className="font-medium">{n.nome}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(n.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">{n.categoria}</td>
              <td className="py-3 pr-3 align-top">{n.endereco}</td>
              <td className="py-3 pr-3 align-top">{n.telefone || <span className="text-[#A0958A] text-xs">—</span>}</td>
              <td className="py-3 pr-3 align-top">
                <DangerButton onClick={() => handleDelete(n.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
