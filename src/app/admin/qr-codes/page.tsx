"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/admin/_component/AdminHeader";
import AdminSection from "@/app/admin/_component/AdminSection";
import AdminTable from "@/app/admin/_component/AdminTable";
import { AdminInput, AdminTextarea, AdminSelect } from "@/app/admin/_component/AdminField";
import { PrimaryButton, DangerButton, SecondaryButton } from "@/app/admin/_component/AdminActions";

type QrCode = {
  id: string;
  created_at: string;
  rua_id: number;
  name: string;
  description: string | null;
  coordinates: { lat: number; lng: number };
  valid_strings: string[];
  active: boolean;
};

export default function AdminQrCodesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<QrCode[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: "",
    rua_id: "",
    name: "",
    description: "",
    lat: "",
    lng: "",
    valid_strings: "",
    active: true,
  });

  const canSubmit = useMemo(() => {
    return (
      form.id.trim().length > 0 &&
      form.rua_id.trim().length > 0 &&
      !isNaN(Number(form.rua_id)) &&
      Number(form.rua_id) > 0 &&
      form.name.trim().length > 0 &&
      form.lat.trim().length > 0 &&
      !isNaN(Number(form.lat)) &&
      form.lng.trim().length > 0 &&
      !isNaN(Number(form.lng)) &&
      form.valid_strings.trim().length > 0
    );
  }, [form]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: QrCode[] }>(`/api/admin/qr-codes`);
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load QR codes");
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
      const validStringsArray = form.valid_strings
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const payload = {
        id: form.id.trim(),
        rua_id: Number(form.rua_id),
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        coordinates: {
          lat: Number(form.lat),
          lng: Number(form.lng),
        },
        valid_strings: validStringsArray,
        active: form.active,
      };
      await adminFetch(`/api/admin/qr-codes`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setForm({ id: "", rua_id: "", name: "", description: "", lat: "", lng: "", valid_strings: "", active: true });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to create QR code");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(qrId: string) {
    if (!editingId) return;
    setLoading(true);
    setError(null);
    try {
      const validStringsArray = form.valid_strings
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const payload = {
        rua_id: Number(form.rua_id),
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        coordinates: {
          lat: Number(form.lat),
          lng: Number(form.lng),
        },
        valid_strings: validStringsArray,
        active: form.active,
      };
      await adminFetch(`/api/admin/qr-codes/${qrId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      setEditingId(null);
      setForm({ id: "", rua_id: "", name: "", description: "", lat: "", lng: "", valid_strings: "", active: true });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to update QR code");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this QR code? This will also delete all user scans for this QR code.")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/qr-codes/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete QR code");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(qr: QrCode) {
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/qr-codes/${qr.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !qr.active }),
      });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to toggle QR code status");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(qr: QrCode) {
    setEditingId(qr.id);
    setForm({
      id: qr.id,
      rua_id: String(qr.rua_id),
      name: qr.name,
      description: qr.description || "",
      lat: String(qr.coordinates.lat),
      lng: String(qr.coordinates.lng),
      valid_strings: qr.valid_strings.join(', '),
      active: qr.active,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ id: "", rua_id: "", name: "", description: "", lat: "", lng: "", valid_strings: "", active: true });
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-[#6B5B4F]">
      <AdminHeader title="QR Codes - Caça ao QR" />

      <AdminSection title={editingId ? "Editar QR Code" : "Criar QR Code"}>
        <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(editingId); } : handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInput
            label="ID do QR Code"
            type="text"
            value={form.id}
            onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
            placeholder="ex: QR_RUA_1"
            required
            disabled={!!editingId}
          />
          <AdminInput
            label="ID da Rua"
            type="number"
            value={form.rua_id}
            onChange={(e) => setForm((f) => ({ ...f, rua_id: e.target.value }))}
            placeholder="ex: 1"
            required
          />
          <AdminInput
            label="Nome"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="ex: Rua Coberta"
            required
          />
          <AdminInput
            label="Descrição (opcional)"
            type="text"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="ex: QR Code na entrada da Rua Coberta"
          />
          <AdminInput
            label="Latitude"
            type="text"
            value={form.lat}
            onChange={(e) => setForm((f) => ({ ...f, lat: e.target.value }))}
            placeholder="ex: -29.3681"
            required
          />
          <AdminInput
            label="Longitude"
            type="text"
            value={form.lng}
            onChange={(e) => setForm((f) => ({ ...f, lng: e.target.value }))}
            placeholder="ex: -50.8361"
            required
          />
          <div className="md:col-span-2">
            <AdminInput
              label="Strings Válidas (separadas por vírgula)"
              type="text"
              value={form.valid_strings}
              onChange={(e) => setForm((f) => ({ ...f, valid_strings: e.target.value }))}
              placeholder="ex: oi, https://historin.com/?utm_source=test#/rua/7/, texto-simples"
              required
            />
            <p className="text-xs text-[#A0958A] mt-1">
              Digite as strings que serão aceitas ao escanear este QR code, separadas por vírgula. Pode ser URLs completas, textos simples, ou qualquer string.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              className="w-4 h-4 text-[#8B4513] border-[#E6D3B4] rounded focus:ring-[#8B4513]"
            />
            <label htmlFor="active" className="text-sm font-medium text-[#4A3F35]">
              QR Code Ativo
            </label>
          </div>
          <div className="md:col-span-2 flex gap-2">
            {editingId ? (
              <>
                <PrimaryButton disabled={!canSubmit || loading} type="submit">
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </PrimaryButton>
                <SecondaryButton onClick={cancelEdit} type="button">
                  Cancelar
                </SecondaryButton>
              </>
            ) : (
              <PrimaryButton disabled={!canSubmit || loading} type="submit">
                {loading ? "Criando..." : "Criar QR Code"}
              </PrimaryButton>
            )}
          </div>
        </form>
      </AdminSection>

      <AdminSection title={`QR Codes (${items.length})`}>
        {error && <p className="text-red-700 text-sm mb-4">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[#A0958A]">Nenhum QR code encontrado.</p>}
        <AdminTable
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Nome" },
            { key: "rua_id", label: "Rua ID" },
            { key: "valid_strings", label: "Strings Válidas" },
            { key: "description", label: "Descrição" },
            { key: "coordinates", label: "Coordenadas" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Ações" },
          ]}
        >
          {items.map((qr, rowIdx) => (
            <tr key={qr.id} className={rowIdx % 2 === 0 ? "bg-[#FEFCF8]" : "bg-[#FAF7F2]"}>
              <td className="py-3 pr-3 pl-3 align-top">
                <div className="font-mono text-xs font-medium text-[#4A3F35]">{qr.id}</div>
                <div className="text-[11px] text-[#A0958A] mt-1">{new Date(qr.created_at).toLocaleString()}</div>
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="font-medium text-[#4A3F35]">{qr.name}</div>
              </td>
              <td className="py-3 pr-3 align-top text-center">
                <span className="inline-block px-2 py-1 bg-[#E6D3B4] text-[#4A3F35] rounded text-xs font-medium">
                  {qr.rua_id}
                </span>
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="flex flex-wrap gap-1">
                  {qr.valid_strings.map((str, idx) => (
                    <span key={idx} className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">
                      {str}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="text-sm text-[#6B5B4F] max-w-xs">
                  {qr.description || <span className="text-[#A0958A] text-xs italic">Sem descrição</span>}
                </div>
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="text-xs font-mono text-[#6B5B4F]">
                  <div>Lat: {qr.coordinates.lat}</div>
                  <div>Lng: {qr.coordinates.lng}</div>
                </div>
              </td>
              <td className="py-3 pr-3 align-top">
                <button
                  onClick={() => handleToggleActive(qr)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    qr.active
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {qr.active ? "✓ Ativo" : "○ Inativo"}
                </button>
              </td>
              <td className="py-3 pr-3 align-top">
                <div className="flex gap-2">
                  <SecondaryButton onClick={() => startEdit(qr)}>Editar</SecondaryButton>
                  <DangerButton onClick={() => handleDelete(qr.id)}>Deletar</DangerButton>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminSection>

      {/* Info Section */}
      <AdminSection title="Informações">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <h4 className="font-bold mb-2">💡 Como usar o sistema de strings válidas:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Crie QR codes com IDs únicos (ex: QR_RUA_1, QR_RUA_2)</li>
            <li>Associe cada QR code a uma rua específica usando o ID da rua</li>
            <li>Defina <strong>múltiplas strings válidas</strong> separadas por vírgula (ex: string1, string2, string3)</li>
            <li>Quando um usuário escanear um QR code, o sistema verifica se o valor escaneado está na lista de strings válidas</li>
            <li>Gere QR codes físicos com URLs: <code className="bg-blue-100 px-1 rounded">https://seusite.com/?qr=string1</code></li>
            <li>Você pode ter vários QR codes físicos diferentes apontando para o mesmo local (usando strings diferentes)</li>
            <li>Usuários podem escanear com a câmera do celular ou pelo app</li>
            <li>Desative QR codes temporariamente sem deletá-los</li>
          </ul>
          <div className="mt-3 p-3 bg-blue-100 rounded">
            <p className="font-semibold mb-1">Exemplos práticos:</p>
            <p className="text-xs mb-2">
              <strong>Rua 7 - São Pedro:</strong><br/>
              Strings válidas: <code>oi, https://www.historin.com/?utm_source=cafe-sao-pedro&utm_medium=qr&utm_campaign=rua-gramado#/rua/7/, saopedro</code>
            </p>
            <p className="text-xs">
              ✅ QR code com texto "oi" → válido<br/>
              ✅ QR code com URL completa → válido<br/>
              ✅ QR code com "saopedro" → válido<br/>
              Todos apontam para a mesma Rua 7!
            </p>
          </div>
        </div>
      </AdminSection>
    </div>
  );
}
