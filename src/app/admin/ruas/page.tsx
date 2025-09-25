"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSection from "@/components/admin/AdminSection";
import AdminTable from "@/components/admin/AdminTable";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminField";
import { PrimaryButton, DangerButton } from "@/components/admin/AdminActions";

// Matches src/types/index.ts Rua (subset)
type Rua = {
  id: string;
  created_at: string;
  nome: string;
  fotos?: string;
  cidade_id?: string;
  descricao?: string;
  coordenadas?: [number, number];
};

export default function AdminRuasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Rua[]>([]);

  const [form, setForm] = useState({
    nome: "",
    fotos: "",
    cidadeId: "",
    descricao: "",
    lat: "",
    lng: "",
  });

  const canSubmit = useMemo(() => {
    return form.nome.trim().length > 0;
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: Rua[] }>(`/api/admin/ruas`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load streets");
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
      const payload: any = {
        nome: form.nome.trim(),
        fotos: form.fotos.trim() || undefined,
        cidadeId: form.cidadeId.trim() || undefined,
        descricao: form.descricao.trim() || undefined,
      };
      if (form.lat.trim() && form.lng.trim()) {
        payload.coordenadas = [Number(form.lat), Number(form.lng)];
      }
      await adminFetch(`/api/admin/ruas`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ nome: "", fotos: "", cidadeId: "", descricao: "", lat: "", lng: "" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create street");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this street?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/ruas/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete street");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="Ruas" />

      <AdminSection title="Criar Rua">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="Nome"
            type="text"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            required
          />
          <AdminInput
            label="Cidade ID (UUID opcional)"
            type="text"
            value={form.cidadeId}
            onChange={(e) => setForm((f) => ({ ...f, cidadeId: e.target.value }))}
            placeholder="ex: 550e8400-e29b-41d4-a716-446655440000"
          />
          <AdminInput
            label="Fotos (texto)"
            type="text"
            value={form.fotos}
            onChange={(e) => setForm((f) => ({ ...f, fotos: e.target.value }))}
            placeholder="ex: URL única, ou JSON/CSV (livre)"
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

      <AdminSection title={`Ruas (${items.length})`}>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhuma rua encontrada.</p>}
        <AdminTable
          columns={[
            { key: "nome", label: "Nome" },
            { key: "cidade", label: "Cidade ID" },
            { key: "coordenadas", label: "Coordenadas" },
            { key: "fotos", label: "Fotos" },
            { key: "descricao", label: "Descrição" },
            { key: "actions", label: "" },
          ]}
        >
          {items.map((r, rowIdx) => (
            <tr key={r.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top">
                <div className="font-medium">{r.nome}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(r.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">{r.cidade_id || <span className="text-[#A0958A] text-xs">—</span>}</td>
              <td className="py-3 pr-3 align-top">
                {r.coordenadas ? `${r.coordenadas[0]}, ${r.coordenadas[1]}` : <span className="text-[#A0958A] text-xs">—</span>}
              </td>
              <td className="py-3 pr-3 align-top max-w-xs break-words">{r.fotos || <span className="text-[#A0958A] text-xs">—</span>}</td>
              <td className="py-3 pr-3 align-top max-w-md">
                <div className="text-sm whitespace-pre-wrap line-clamp-3">{r.descricao || ""}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                <DangerButton onClick={() => handleDelete(r.id)}>Delete</DangerButton>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
