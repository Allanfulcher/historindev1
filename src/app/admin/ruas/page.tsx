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

type CidadeLite = {
  id: string;
  nome: string;
  estado: string;
};

export default function AdminRuasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Rua[]>([]);
  const [cities, setCities] = useState<CidadeLite[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  async function loadCities() {
    try {
      const res = await adminFetch<{ data: any[] }>(`/api/admin/cidades?limit=1000`);
      const mapped = (res.data || []).map((c: any) => ({ id: c.id, nome: c.nome, estado: c.estado })) as CidadeLite[];
      setCities(mapped);
    } catch (e) {
      // non-fatal: keep cities empty
    }
  }

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin");
      return;
    }
    load();
    loadCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEdit(rua: Rua) {
    setEditingId(rua.id);
    setForm({
      nome: rua.nome,
      fotos: rua.fotos || "",
      cidadeId: rua.cidade_id ? String(rua.cidade_id) : "",
      descricao: rua.descricao || "",
      lat: rua.coordenadas?.[0]?.toString() || "",
      lng: rua.coordenadas?.[1]?.toString() || "",
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm({ nome: "", fotos: "", cidadeId: "", descricao: "", lat: "", lng: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
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

      if (editingId) {
        // Update existing rua
        await adminFetch(`/api/admin/ruas/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        // Create new rua
        await adminFetch(`/api/admin/ruas`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setForm({ nome: "", fotos: "", cidadeId: "", descricao: "", lat: "", lng: "" });
      setEditingId(null);
      await load();
    } catch (e: any) {
      setError(e?.message || `Failed to ${editingId ? "update" : "create"} street`);
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

      <AdminSection title={editingId ? "Editar Rua" : "Criar Rua"}>
        {editingId && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
            <p className="text-sm text-blue-800">
              <strong>Editando:</strong> ID {editingId}
            </p>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Cancelar edição
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="Nome"
            type="text"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            required
          />
          <div>
            <label className="block text-sm font-medium text-[#6B5B4F] mb-1">Cidade (selecionar)</label>
            <select
              className="w-full border border-[#E5DED3] rounded-md px-3 py-2 bg-white text-[#4A3F35] focus:outline-none focus:ring-2 focus:ring-[#D7C8B8]"
              value={form.cidadeId}
              onChange={(e) => setForm((f) => ({ ...f, cidadeId: e.target.value }))}
            >
              <option value="">— Sem cidade —</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} ({c.estado})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#A0958A] mt-1">Opcional. Usa o UUID da cidade selecionada.</p>
          </div>
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
          <div className="md:col-span-2 flex gap-3">
            <PrimaryButton disabled={!canSubmit || loading} type="submit">
              {loading ? "Salvando..." : editingId ? "Atualizar" : "Criar"}
            </PrimaryButton>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-[#D7C8B8] text-[#6B5B4F] rounded-md hover:bg-[#F5F1EB] transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
            )}
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(r)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <DangerButton onClick={() => handleDelete(r.id)}>Delete</DangerButton>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>
    </div>
  );
}
