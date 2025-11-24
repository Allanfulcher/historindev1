"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/admin/_component/AdminHeader";
import AdminSection from "@/app/admin/_component/AdminSection";
import AdminTable from "@/app/admin/_component/AdminTable";
import { AdminInput, AdminTextarea, AdminSelect } from "@/app/admin/_component/AdminField";
import { PrimaryButton, SecondaryButton, DangerButton, ActionsBar } from "@/app/admin/_component/AdminActions";

type PopupAd = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  question: string;
  answers: string[];
  image_url: string | null;
  business_name: string;
  street_ids: number[];
  active: boolean;
  phone: string | null;
  email: string | null;
  website: string | null;
};

export default function AdminPopupAdsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<PopupAd[]>([]);
  const [streets, setStreets] = useState<{ id: number; nome: string }[]>([]);
  const [selectedStreets, setSelectedStreets] = useState<number[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    question: "",
    answers: ["", "", ""], // 3 answer options by default
    image_url: "",
    business_name: "",
    street_ids: [] as number[],
    phone: "",
    email: "",
    website: "",
    active: true,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const validAnswers = form.answers.filter(a => a.trim().length > 0);
    return (
      form.title.trim().length > 0 &&
      form.description.trim().length > 0 &&
      form.question.trim().length > 0 &&
      validAnswers.length >= 2 &&
      form.business_name.trim().length > 0 &&
      form.street_ids.length > 0
    );
  }, [form]);

  async function loadStreets() {
    try {
      const res = await adminFetch<{ data: { id: number; nome: string }[] }>("/api/admin/ruas");
      setStreets(res.data);
    } catch (e: any) {
      console.error("Failed to load streets:", e);
    }
  }

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<{ data: PopupAd[] }>("/api/admin/popup-ads");
      setItems(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load popup ads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin");
      return;
    }
    loadStreets();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        question: form.question.trim(),
        answers: form.answers.filter(a => a.trim().length > 0),
        image_url: form.image_url.trim() || null,
        business_name: form.business_name.trim(),
        street_ids: form.street_ids,
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        website: form.website.trim() || null,
        active: form.active,
      };

      if (editingId) {
        await adminFetch(`/api/admin/popup-ads/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/api/admin/popup-ads", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to save popup ad");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja deletar este anúncio?")) return;
    setLoading(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/popup-ads/${id}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete popup ad");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(item: PopupAd) {
    setForm({
      title: item.title,
      description: item.description,
      question: item.question,
      answers: item.answers || ["", "", ""],
      image_url: item.image_url || "",
      business_name: item.business_name,
      street_ids: item.street_ids,
      phone: item.phone || "",
      email: item.email || "",
      website: item.website || "",
      active: item.active,
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm({
      title: "",
      description: "",
      question: "",
      answers: ["", "", ""],
      image_url: "",
      business_name: "",
      street_ids: [],
      phone: "",
      email: "",
      website: "",
      active: true,
    });
    setEditingId(null);
  }

  function toggleStreet(streetId: number) {
    setForm((prev) => ({
      ...prev,
      street_ids: prev.street_ids.includes(streetId)
        ? prev.street_ids.filter((id) => id !== streetId)
        : [...prev.street_ids, streetId],
    }));
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <AdminHeader title="Popup Ads" />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      <AdminSection title={editingId ? "Editar Anúncio" : "Criar Novo Anúncio"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput
              label="Nome do Negócio *"
              value={form.business_name}
              onChange={(e) => setForm({ ...form, business_name: e.target.value })}
              placeholder="Ex: Café São Pedro"
              required
            />

            <AdminInput
              label="Título do Anúncio *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ex: Desconto Especial!"
              required
            />
          </div>

          <AdminTextarea
            label="Descrição *"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Descreva o anúncio ou promoção..."
            rows={3}
            required
          />

          <AdminInput
            label="Pergunta/Call to Action *"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            placeholder="Ex: Quer conhecer nosso café?"
            required
          />

          {/* Answer Options */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#4A3F35]">
              Opções de Resposta * (mínimo 2)
            </label>
            {form.answers.map((answer, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...form.answers];
                      newAnswers[index] = e.target.value;
                      setForm({ ...form, answers: newAnswers });
                    }}
                    placeholder={`Opção ${index + 1}`}
                    className="w-full px-3 py-2 border border-[#F5F1EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                {form.answers.length > 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newAnswers = form.answers.filter((_, i) => i !== index);
                      setForm({ ...form, answers: newAnswers });
                    }}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            ))}
            {form.answers.length < 4 && (
              <button
                type="button"
                onClick={() => setForm({ ...form, answers: [...form.answers, ""] })}
                className="text-sm text-[#8B4513] hover:text-[#A0522D] font-medium"
              >
                + Adicionar Opção
              </button>
            )}
          </div>

          <AdminInput
            label="URL da Imagem"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            placeholder="https://exemplo.com/imagem.jpg"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AdminInput
              label="Telefone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(54) 99999-9999"
            />

            <AdminInput
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contato@negocio.com"
            />

            <AdminInput
              label="Website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://negocio.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3F35] mb-2">
              Ruas onde o anúncio aparecerá *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-[#F5F1EB] rounded">
              {streets.map((street) => (
                <label key={street.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.street_ids.includes(street.id)}
                    onChange={() => toggleStreet(street.id)}
                    className="rounded text-[#8B4513] focus:ring-[#8B4513]"
                  />
                  <span className="text-sm text-[#6B5B4F]">{street.nome}</span>
                </label>
              ))}
            </div>
            {form.street_ids.length === 0 && (
              <p className="text-xs text-red-600 mt-1">Selecione pelo menos uma rua</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="rounded text-[#8B4513] focus:ring-[#8B4513]"
            />
            <label htmlFor="active" className="text-sm text-[#6B5B4F]">
              Anúncio ativo
            </label>
          </div>

          <ActionsBar>
            <PrimaryButton type="submit" disabled={!canSubmit || loading}>
              {loading ? "Salvando..." : editingId ? "Atualizar" : "Criar"}
            </PrimaryButton>
            {editingId && (
              <SecondaryButton type="button" onClick={resetForm}>
                Cancelar
              </SecondaryButton>
            )}
          </ActionsBar>
        </form>
      </AdminSection>

      <AdminSection title="Anúncios Existentes">
        {loading && <p className="text-sm text-[#A0958A]">Carregando...</p>}
        {!loading && items.length === 0 && (
          <p className="text-sm text-[#A0958A]">Nenhum anúncio cadastrado ainda.</p>
        )}
        {!loading && items.length > 0 && (
          <AdminTable
            columns={[
              { key: "business", label: "Negócio" },
              { key: "title", label: "Título" },
              { key: "streets", label: "Ruas" },
              { key: "status", label: "Status" },
              { key: "actions", label: "Ações" },
            ]}
          >
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[#F5F1EB]/30">
                <td className="py-2 px-3">{item.business_name}</td>
                <td className="py-2 px-3">{item.title}</td>
                <td className="py-2 px-3">{item.street_ids.length} rua(s)</td>
                <td className="py-2 px-3">
                  {item.active ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      Ativo
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      Inativo
                    </span>
                  )}
                </td>
                <td className="py-2 px-3">
                  <div className="flex gap-2">
                    <SecondaryButton onClick={() => handleEdit(item)}>Editar</SecondaryButton>
                    <DangerButton onClick={() => handleDelete(item.id)}>Deletar</DangerButton>
                  </div>
                </td>
              </tr>
            ))}
          </AdminTable>
        )}
      </AdminSection>
    </div>
  );
}
