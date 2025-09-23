"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminField";
import { PrimaryButton, DangerButton } from "@/components/admin/AdminActions";

type Organizacao = {
  id: string;
  created_at: string;
  fantasia: string;
  link: string;
  logo: string;
  cor?: string;
  sobre?: string;
  foto?: string;
};

export default function AdminOrgsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Organizacao[]>([]);

  const [form, setForm] = useState({
    fantasia: "",
    link: "",
    logo: "",
    cor: "",
    sobre: "",
    foto: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.fantasia.trim().length > 0 &&
      form.link.trim().length > 0 &&
      form.logo.trim().length > 0
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: Organizacao[] }>(`/api/admin/orgs`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load organizations");
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
        fantasia: form.fantasia.trim(),
        link: form.link.trim(),
        logo: form.logo.trim(),
        cor: form.cor.trim() || undefined,
        sobre: form.sobre.trim() || undefined,
        foto: form.foto.trim() || undefined,
      };
      await adminFetch(`/api/admin/orgs`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ fantasia: "", link: "", logo: "", cor: "", sobre: "", foto: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create organization");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this organization?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/orgs/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete organization");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Organizações" />

      <AdminSection title="Criar Organização">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="Nome Fantasia"
            type="text"
            value={form.fantasia}
            onChange={(e) => setForm((f) => ({ ...f, fantasia: e.target.value }))}
            required
          />
          <AdminInput
            label="Link"
            type="url"
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            placeholder="https://example.org"
            required
          />
          <AdminInput
            label="Logo (URL)"
            type="url"
            value={form.logo}
            onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
            placeholder="https://.../logo.png"
            required
          />
          <AdminInput
            label="Cor (hex opcional)"
            type="text"
            value={form.cor}
            onChange={(e) => setForm((f) => ({ ...f, cor: e.target.value }))}
            placeholder="#8B4513"
          />
          <AdminInput
            label="Foto (URL opcional)"
            type="url"
            value={form.foto}
            onChange={(e) => setForm((f) => ({ ...f, foto: e.target.value }))}
            placeholder="https://.../cover.jpg"
          />
          <div className="md:col-span-2">
            <AdminTextarea
              label="Sobre (opcional)"
              value={form.sobre}
              onChange={(e) => setForm((f) => ({ ...f, sobre: e.target.value }))}
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

      <AdminSection title={`Organizações (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhuma organização encontrada.</p>}
        <AdminTable
          columns={[
            { key: "logo", label: "Logo" },
            { key: "fantasia", label: "Nome" },
            { key: "link", label: "Link" },
            { key: "cor", label: "Cor" },
            { key: "sobre", label: "Sobre" },
            { key: "foto", label: "Foto" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((o, rowIdx) => (
            <tr key={o.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top w-[80px]">
                {o.logo ? (
                  <img src={o.logo} alt={o.fantasia} className="h-10 w-10 object-contain rounded" />
                ) : (
                  <div className="h-10 w-10 bg-[#F5F1EB] rounded" />
                )}
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="font-medium">{o.fantasia}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(o.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                <a className="text-[#8B4513] underline break-words" href={o.link} target="_blank" rel="noopener noreferrer">{o.link}</a>
              </td>
              <td className="py-3 pr-3 align-top">
                {o.cor ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: o.cor }} />
                    <span className="text-xs">{o.cor}</span>
                  </div>
                ) : (
                  <span className="text-[#A0958A] text-xs">—</span>
                )}
              </td>
              <td className="py-3 pr-3 align-top max-w-md">
                <div className="text-sm whitespace-pre-wrap line-clamp-3">{o.sobre || ""}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                {o.foto ? (
                  <a className="text-[#8B4513] underline break-words" href={o.foto} target="_blank" rel="noopener noreferrer">Foto</a>
                ) : (
                  <span className="text-[#A0958A] text-xs">—</span>
                )}
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