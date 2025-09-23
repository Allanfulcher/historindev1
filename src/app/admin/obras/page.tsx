"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput, AdminTextarea, AdminSelect } from "@/components/admin/AdminField";
import { PrimaryButton, DangerButton } from "@/components/admin/AdminActions";

// Matches src/types/index.ts Obra (subset)
type Obra = {
  id: string;
  created_at: string;
  titulo: string;
  descricao: string;
  capa: string;
  pago: boolean;
  autorId: string;
  link: string;
};

export default function AdminObrasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Obra[]>([]);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    capa: "",
    pago: false,
    autorId: "",
    link: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.titulo.trim().length > 0 &&
      form.descricao.trim().length > 0 &&
      form.capa.trim().length > 0 &&
      String(form.autorId).trim().length > 0 &&
      form.link.trim().length > 0
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: Obra[] }>(`/api/admin/obras`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load works");
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
        titulo: form.titulo.trim(),
        descricao: form.descricao.trim(),
        capa: form.capa.trim(),
        pago: Boolean(form.pago),
        autorId: String(form.autorId).trim(),
        link: form.link.trim(),
      };
      await adminFetch(`/api/admin/obras`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ titulo: "", descricao: "", capa: "", pago: false, autorId: "", link: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create work");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this work?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/obras/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete work");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Obras" />

      <AdminSection title="Criar Obra">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="Título"
            type="text"
            value={form.titulo}
            onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
            required
          />
          <AdminInput
            label="Capa (URL)"
            type="url"
            value={form.capa}
            onChange={(e) => setForm((f) => ({ ...f, capa: e.target.value }))}
            placeholder="https://.../capa.jpg"
            required
          />
          <AdminInput
            label="Link"
            type="url"
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            placeholder="https://site-da-obra.com"
            required
          />
          <AdminInput
            label="Autor ID (UUID)"
            type="text"
            value={form.autorId}
            onChange={(e) => setForm((f) => ({ ...f, autorId: e.target.value }))}
            placeholder="ex: 550e8400-e29b-41d4-a716-446655440000"
            required
          />
          <div className="flex items-center gap-2">
            <input
              id="pago"
              type="checkbox"
              checked={form.pago}
              onChange={(e) => setForm((f) => ({ ...f, pago: e.target.checked }))}
              className="h-4 w-4 border-[#F5F1EB] text-[#8B4513] focus:ring-[#8B4513]/30"
            />
            <label htmlFor="pago" className="text-sm text-[#4A3F35] font-bold">Pago</label>
          </div>
          <div className="md:col-span-2">
            <AdminTextarea
              label="Descrição"
              value={form.descricao}
              onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
              rows={4}
              required
            />
          </div>
          <div className="md:col-span-2">
            <PrimaryButton disabled={!canSubmit || loading} type="submit">
              {loading ? "Salvando..." : "Criar"}
            </PrimaryButton>
          </div>
        </form>
      </AdminSection>

      <AdminSection title={`Obras (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhuma obra encontrada.</p>}
        <AdminTable
          columns={[
            { key: "capa", label: "Capa" },
            { key: "titulo", label: "Título" },
            { key: "autorId", label: "Autor ID" },
            { key: "pago", label: "Pago" },
            { key: "link", label: "Link" },
            { key: "descricao", label: "Descrição" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((o, rowIdx) => (
            <tr key={o.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top w-[80px]">
                {o.capa ? (
                  <img src={o.capa} alt={o.titulo} className="h-10 w-10 object-cover rounded" />
                ) : (
                  <div className="h-10 w-10 bg-[#F5F1EB] rounded" />
                )}
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="font-medium">{o.titulo}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(o.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">{o.autorId}</td>
              <td className="py-3 pr-3 align-top">{o.pago ? "Sim" : "Não"}</td>
              <td className="py-3 pr-3 align-top">
                <a className="text-[#8B4513] underline break-words" href={o.link} target="_blank" rel="noopener noreferrer">{o.link}</a>
              </td>
              <td className="py-3 pr-3 align-top max-w-md">
                <div className="text-sm whitespace-pre-wrap line-clamp-3">{o.descricao}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                <DangerButton onClick={() => handleDelete(o.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
