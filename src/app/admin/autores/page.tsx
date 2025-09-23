"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminField";
import { PrimaryButton, DangerButton } from "@/components/admin/AdminActions";

// Matches src/types/index.ts Autor (subset)
type Autor = {
  id: string;
  created_at: string;
  nome: string;
  bio: string;
  foto: string;
  link?: string;
  obras?: number[]; // not managed in UI yet
};

export default function AdminAutoresPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Autor[]>([]);

  const [form, setForm] = useState({
    nome: "",
    bio: "",
    foto: "",
    link: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.nome.trim().length > 0 &&
      form.bio.trim().length > 0 &&
      form.foto.trim().length > 0
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: Autor[] }>(`/api/admin/autores`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load authors");
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
        bio: form.bio.trim(),
        foto: form.foto.trim(),
        link: form.link.trim() || undefined,
      };
      await adminFetch(`/api/admin/autores`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ nome: "", bio: "", foto: "", link: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create author");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this author?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/autores/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete author");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Autores" />

      <AdminSection title="Criar Autor">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="Nome"
            type="text"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            required
          />
          <AdminInput
            label="Foto (URL)"
            type="url"
            value={form.foto}
            onChange={(e) => setForm((f) => ({ ...f, foto: e.target.value }))}
            placeholder="https://.../foto.jpg"
            required
          />
          <AdminInput
            label="Link (opcional)"
            type="url"
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            placeholder="https://author-site.com"
          />
          <div className="md:col-span-2">
            <AdminTextarea
              label="Bio"
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
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

      <AdminSection title={`Autores (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhum autor encontrado.</p>}
        <AdminTable
          columns={[
            { key: "foto", label: "Foto" },
            { key: "nome", label: "Nome" },
            { key: "bio", label: "Bio" },
            { key: "link", label: "Link" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((a, rowIdx) => (
            <tr key={a.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top w-[80px]">
                {a.foto ? (
                  <img src={a.foto} alt={a.nome} className="h-10 w-10 object-cover rounded" />
                ) : (
                  <div className="h-10 w-10 bg-[#F5F1EB] rounded" />
                )}
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="font-medium">{a.nome}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(a.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top max-w-md">
                <div className="text-sm whitespace-pre-wrap line-clamp-3">{a.bio}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                {a.link ? (
                  <a className="text-[#8B4513] underline break-words" href={a.link} target="_blank" rel="noopener noreferrer">{a.link}</a>
                ) : (
                  <span className="text-[#A0958A] text-xs">—</span>
                )}
              </td>
              <td className="py-3 pr-3 align-top">
                <DangerButton onClick={() => handleDelete(a.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
