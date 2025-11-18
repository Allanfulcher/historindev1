"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/admin/_component/AdminHeader";
import AdminSection from "@/app/admin/_component/AdminSection";
import AdminTable from "@/app/admin/_component/AdminTable";
import { AdminInput } from "@/app/admin/_component/AdminField";
import { PrimaryButton, DangerButton, SecondaryButton } from "@/app/admin/_component/AdminActions";

type Site = {
  id: string;
  created_at: string;
  nome: string;
  link: string;
};

export default function AdminSitesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Site[]>([]);

  const [form, setForm] = useState({
    nome: "",
    link: "",
  });

  const canSubmit = useMemo(() => {
    return form.nome.trim().length > 0 && form.link.trim().length > 0;
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: Site[] }>(`/api/admin/sites`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load sites");
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
        link: form.link.trim(),
      };
      await adminFetch(`/api/admin/sites`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ nome: "", link: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create site");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this site?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/sites/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete site");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Sites de Referência" />

      <AdminSection title="Criar Site">
        <form onSubmit={handleCreate} className="space-y-4">
          <AdminInput
            label="Nome"
            type="text"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            required
          />
          <AdminInput
            label="Link"
            type="url"
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            placeholder="https://example.com"
            required
          />
          <PrimaryButton disabled={!canSubmit || loading} type="submit">
            {loading ? "Salvando..." : "Criar"}
          </PrimaryButton>
        </form>
      </AdminSection>

      <AdminSection title={`Sites Existentes (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhum site encontrado.</p>}
        <AdminTable
          columns={[
            { key: "nome", label: "Nome" },
            { key: "link", label: "Link" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((s, rowIdx) => (
            <tr key={s.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top">
                <div className="font-medium">{s.nome}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(s.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                <a className="text-[#8B4513] underline break-words" href={s.link} target="_blank" rel="noopener noreferrer">{s.link}</a>
              </td>
              <td className="py-3 pr-3 align-top">
                <DangerButton onClick={() => handleDelete(s.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}