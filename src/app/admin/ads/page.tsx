"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/admin/_component/AdminHeader";
import AdminSection from "@/app/admin/_component/AdminSection";
import AdminTable from "@/app/admin/_component/AdminTable";
import { AdminInput, AdminSelect, AdminTextarea } from "@/app/admin/_component/AdminField";
import { PrimaryButton, DangerButton } from "@/app/admin/_component/AdminActions";

// Minimal Ad shape for admin UI
interface AdItem {
  id: string;
  active: boolean;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  tag?: string;
  priority?: number;
  placement?: 'top' | 'after_match';
  match_keywords?: string[] | null;
  rua_id?: string | null;
  historia_id?: string | null;
  negocio_id?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export default function AdminAdsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<AdItem[]>([]);

  const [form, setForm] = useState({
    active: true,
    title: "",
    description: "",
    image_url: "",
    link_url: "",
    tag: "Patrocinado",
    priority: 0,
    placement: "after_match" as 'top' | 'after_match',
    match_keywords: "",
    rua_id: "",
    historia_id: "",
    negocio_id: "",
    start_at: "",
    end_at: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.title.trim().length > 0 &&
      form.description.trim().length > 0 &&
      form.image_url.trim().length > 0 &&
      form.link_url.trim().length > 0
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: AdItem[] }>(`/api/admin/ads`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load ads");
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
        active: !!form.active,
        title: form.title.trim(),
        description: form.description.trim(),
        image_url: form.image_url.trim(),
        link_url: form.link_url.trim(),
        tag: form.tag.trim() || undefined,
        priority: Number(form.priority) || 0,
        placement: form.placement,
        match_keywords: form.match_keywords
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        rua_id: form.rua_id.trim() || null,
        historia_id: form.historia_id.trim() || null,
        negocio_id: form.negocio_id.trim() || null,
        start_at: form.start_at.trim() || null,
        end_at: form.end_at.trim() || null,
      };
      await adminFetch(`/api/admin/ads`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({
        active: true,
        title: "",
        description: "",
        image_url: "",
        link_url: "",
        tag: "Patrocinado",
        priority: 0,
        placement: "after_match",
        match_keywords: "",
        rua_id: "",
        historia_id: "",
        negocio_id: "",
        start_at: "",
        end_at: "",
      });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create ad");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this ad?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/ads/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete ad");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Anúncios" />

      <AdminSection title="Criar Anúncio">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#4A3F35] text-sm font-bold mb-1">Ativo</label>
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, active: e.target.checked }))}
            />
          </div>
          <AdminSelect
            label="Posição"
            value={form.placement}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm((f) => ({ ...f, placement: e.target.value as any }))}
          >
            <option value="top">Topo</option>
            <option value="after_match">Após História Relacionada</option>
          </AdminSelect>
          <AdminInput label="Título" type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          <AdminInput label="Tag" type="text" value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))} />
          <AdminTextarea label="Descrição" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
          <AdminInput label="Imagem (URL)" type="text" value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} required />
          <AdminInput label="Link (URL)" type="text" value={form.link_url} onChange={(e) => setForm((f) => ({ ...f, link_url: e.target.value }))} required />
          <AdminInput label="Palavras-chave (separadas por vírgula)" type="text" value={form.match_keywords} onChange={(e) => setForm((f) => ({ ...f, match_keywords: e.target.value }))} placeholder="ex: mundo a vapor, parque" />
          <AdminInput label="Rua ID (opcional)" type="text" value={form.rua_id} onChange={(e) => setForm((f) => ({ ...f, rua_id: e.target.value }))} />
          <AdminInput label="História ID (opcional)" type="text" value={form.historia_id} onChange={(e) => setForm((f) => ({ ...f, historia_id: e.target.value }))} />
          <AdminInput label="Negócio ID (opcional)" type="text" value={form.negocio_id} onChange={(e) => setForm((f) => ({ ...f, negocio_id: e.target.value }))} />
          <AdminInput label="Início (ISO opcional)" type="text" value={form.start_at} onChange={(e) => setForm((f) => ({ ...f, start_at: e.target.value }))} />
          <AdminInput label="Fim (ISO opcional)" type="text" value={form.end_at} onChange={(e) => setForm((f) => ({ ...f, end_at: e.target.value }))} />
          <AdminInput label="Prioridade (maior primeiro)" type="number" value={String(form.priority)} onChange={(e) => setForm((f) => ({ ...f, priority: Number(e.target.value) }))} />
          <div className="md:col-span-2">
            <PrimaryButton disabled={!canSubmit || loading} type="submit">
              {loading ? "Salvando..." : "Criar"}
            </PrimaryButton>
          </div>
        </form>
      </AdminSection>

      <AdminSection title={`Anúncios (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhum anúncio encontrado.</p>}
        <AdminTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Título' },
            { key: 'placement', label: 'Posição' },
            { key: 'rua_id', label: 'Rua' },
            { key: 'priority', label: 'Prioridade' },
            { key: 'updated_at', label: 'Atualizado' },
            { key: 'actions', label: '' },
          ]}
        >
          {items.map((a, idx) => (
            <tr key={a.id} className={idx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top whitespace-nowrap text-xs text-[#4A3F35]">{a.id}</td>
              <td className="py-3 pr-3 align-top">
                <div className="font-medium">{a.title}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{a.active ? 'Ativo' : 'Inativo'}</div>
              </td>
              <td className="py-3 pr-3 align-top text-xs">{a.placement}</td>
              <td className="py-3 pr-3 align-top text-xs">{a.rua_id || <span className="text-[#A0958A]">—</span>}</td>
              <td className="py-3 pr-3 align-top text-xs">{a.priority ?? 0}</td>
              <td className="py-3 pr-3 align-top text-xs">{a.updated_at ? new Date(a.updated_at).toLocaleString() : '—'}</td>
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
