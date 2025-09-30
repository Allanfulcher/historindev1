"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminField";
import { PrimaryButton, DangerButton } from "@/components/admin/AdminActions";

// Minimal shape for admin UI
export type HistoriaAdmin = {
  id: string;
  created_at: string;
  rua_id?: string;
  org_id?: string;
  titulo: string;
  descricao: string;
  fotos?: string[];
  coordenadas?: [number, number];
  ano?: string;
  criador?: string;
  tags?: string[];
};

type RuaLite = {
  id: string;
  nome: string;
};

type OrgLite = {
  id: string;
  fantasia: string;
};

export default function AdminHistoriasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<HistoriaAdmin[]>([]);
  const [ruas, setRuas] = useState<RuaLite[]>([]);
  const [orgs, setOrgs] = useState<OrgLite[]>([]);

  const [form, setForm] = useState({
    ruaId: "",
    orgId: "",
    titulo: "",
    descricao: "",
    fotosCsv: "",
    lat: "",
    lng: "",
    ano: "",
    criador: "",
    tagsCsv: "",
  });

  const canSubmit = useMemo(() => {
    return form.titulo.trim().length > 0 && form.descricao.trim().length > 0;
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: HistoriaAdmin[] }>(`/api/admin/historias`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load stories");
    } finally {
      setLoading(false);
    }
  }

  async function loadRuas() {
    try {
      const res = await adminFetch<{ data: any[] }>(`/api/admin/ruas?limit=1000`);
      const mapped = (res.data || []).map((r: any) => ({ id: r.id, nome: r.nome })) as RuaLite[];
      setRuas(mapped);
    } catch (e) {
      // non-fatal
    }
  }

  async function loadOrgs() {
    try {
      const res = await adminFetch<{ data: any[] }>(`/api/admin/orgs?limit=1000`);
      const mapped = (res.data || []).map((o: any) => ({ id: o.id, fantasia: o.fantasia })) as OrgLite[];
      setOrgs(mapped);
    } catch (e) {
      // non-fatal
    }
  }

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin");
      return;
    }
    load();
    loadRuas();
    loadOrgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function parseCsv(v: string): string[] | undefined {
    const arr = v.split(",").map(s => s.trim()).filter(Boolean);
    return arr.length ? arr : undefined;
    }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const payload: any = {
        ruaId: form.ruaId.trim() || undefined,
        orgId: form.orgId.trim() || undefined,
        titulo: form.titulo.trim(),
        descricao: form.descricao.trim(),
        fotos: parseCsv(form.fotosCsv),
        ano: form.ano.trim() || undefined,
        criador: form.criador.trim() || undefined,
        tags: parseCsv(form.tagsCsv),
      };
      if (form.lat.trim() && form.lng.trim()) {
        payload.coordenadas = [Number(form.lat), Number(form.lng)];
      }
      await adminFetch(`/api/admin/historias`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ ruaId: "", orgId: "", titulo: "", descricao: "", fotosCsv: "", lat: "", lng: "", ano: "", criador: "", tagsCsv: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create story");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this story?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/historias/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete story");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Histórias" />

      <AdminSection title="Criar História">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#6B5B4F] mb-1">Rua (selecionar)</label>
            <select
              className="w-full border border-[#E5DED3] rounded-md px-3 py-2 bg-white text-[#4A3F35] focus:outline-none focus:ring-2 focus:ring-[#D7C8B8]"
              value={form.ruaId}
              onChange={(e) => setForm((f) => ({ ...f, ruaId: e.target.value }))}
            >
              <option value="">— Sem rua —</option>
              {ruas.map((r) => (
                <option key={r.id} value={r.id}>{r.nome}</option>
              ))}
            </select>
            <p className="text-[11px] text-[#A0958A] mt-1">Opcional. Usa o UUID da rua selecionada.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B5B4F] mb-1">Organização (selecionar)</label>
            <select
              className="w-full border border-[#E5DED3] rounded-md px-3 py-2 bg-white text-[#4A3F35] focus:outline-none focus:ring-2 focus:ring-[#D7C8B8]"
              value={form.orgId}
              onChange={(e) => setForm((f) => ({ ...f, orgId: e.target.value }))}
            >
              <option value="">— Sem org —</option>
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>{o.fantasia}</option>
              ))}
            </select>
            <p className="text-[11px] text-[#A0958A] mt-1">Opcional. Usa o UUID da organização selecionada.</p>
          </div>
          <AdminInput
            label="Título"
            type="text"
            value={form.titulo}
            onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
            required
          />
          <AdminInput
            label="Ano (opcional)"
            type="text"
            value={form.ano}
            onChange={(e) => setForm((f) => ({ ...f, ano: e.target.value }))}
            placeholder="ex: 1980"
          />
          <AdminInput
            label="Criador (opcional)"
            type="text"
            value={form.criador}
            onChange={(e) => setForm((f) => ({ ...f, criador: e.target.value }))}
          />
          <AdminInput
            label="Latitude"
            type="number"
            value={form.lat}
            onChange={(e) => setForm((f) => ({ ...f, lat: e.target.value }))}
            placeholder="ex: -29.37"
          />
          <AdminInput
            label="Longitude"
            type="number"
            value={form.lng}
            onChange={(e) => setForm((f) => ({ ...f, lng: e.target.value }))}
            placeholder="ex: -50.87"
          />
          <AdminInput
            label="Fotos (CSV de URLs)"
            type="text"
            value={form.fotosCsv}
            onChange={(e) => setForm((f) => ({ ...f, fotosCsv: e.target.value }))}
            placeholder="https://a.jpg, https://b.png"
          />
          <AdminInput
            label="Tags (CSV)"
            type="text"
            value={form.tagsCsv}
            onChange={(e) => setForm((f) => ({ ...f, tagsCsv: e.target.value }))}
            placeholder="Cinema, Festival, Festival de Cinema"
          />
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

      <AdminSection title={`Histórias (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhuma história encontrada.</p>}
        <AdminTable
          columns={[
            { key: "titulo", label: "Título" },
            { key: "rua_id", label: "Rua" },
            { key: "org_id", label: "Org" },
            { key: "ano", label: "Ano" },
            { key: "tags", label: "Tags" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((h, rowIdx) => (
            <tr key={h.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top">
                <div className="font-medium">{h.titulo}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(h.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">{h.rua_id || <span className="text-[#A0958A] text-xs">—</span>}</td>
              <td className="py-3 pr-3 align-top">{h.org_id || <span className="text-[#A0958A] text-xs">—</span>}</td>
              <td className="py-3 pr-3 align-top">{h.ano || <span className="text-[#A0958A] text-xs">—</span>}</td>
              <td className="py-3 pr-3 align-top">
                {h.tags && h.tags.length ? (
                  <div className="flex flex-wrap gap-1">
                    {h.tags.map((t, i) => (
                      <span key={i} className="inline-block text-xs bg-[#F5F1EB] text-[#4A3F35] px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#A0958A] text-xs">—</span>
                )}
              </td>
              <td className="py-3 pr-3 align-top">
                <DangerButton onClick={() => handleDelete(h.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
