"use client";

import { useEffect, useState } from "react";
import { adminFetch, isAdminAuthenticated } from "@/utils/adminApi";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/admin/_component/AdminHeader";
import AdminSection from "@/app/admin/_component/AdminSection";
import AdminTable from "@/app/admin/_component/AdminTable";
import { AdminSelect } from "@/app/admin/_component/AdminField";

type QuizResult = {
  id: string;
  created_at: string;
  answers: any;
  score: number | null;
  meta: {
    name?: string;
    email?: string;
    city?: string;
    percentage?: number;
  } | null;
  user_id: string | null;
  user_email?: string;
  user_name?: string;
};

type QuizStats = {
  total: number;
  gramado: number;
  canela: number;
  averageScore: number;
  averagePercentage: number;
  withAuth: number;
  anonymous: number;
};

export default function AdminQuizResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [authFilter, setAuthFilter] = useState<string>("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (cityFilter !== "all") params.set("city", cityFilter);
      if (authFilter !== "all") params.set("auth", authFilter);

      const res = await adminFetch<{ data: QuizResult[]; stats: QuizStats }>(
        `/api/admin/quiz-results?${params.toString()}`
      );
      setResults(res.data);
      setStats(res.stats);
    } catch (e: any) {
      setError(e?.message || "Failed to load quiz results");
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
  }, [cityFilter, authFilter]);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function exportCSV() {
    const headers = ["Data", "Nome", "Email", "Cidade", "Pontuação", "Porcentagem", "Autenticado"];
    const rows = results.map((r) => [
      formatDate(r.created_at),
      r.user_name || r.meta?.name || "Anônimo",
      r.user_email || r.meta?.email || "-",
      r.meta?.city || "-",
      r.score?.toString() || "0",
      r.meta?.percentage?.toFixed(1) || "0",
      r.user_id ? "Sim" : "Não",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `quiz-results-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <AdminHeader title="Resultados do Quiz" />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg">
            <p className="text-sm text-[#A0958A]">Total de Respostas</p>
            <p className="text-2xl font-bold text-[#4A3F35]">{stats.total}</p>
          </div>
          <div className="p-4 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg">
            <p className="text-sm text-[#A0958A]">Gramado</p>
            <p className="text-2xl font-bold text-[#4A3F35]">{stats.gramado}</p>
          </div>
          <div className="p-4 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg">
            <p className="text-sm text-[#A0958A]">Canela</p>
            <p className="text-2xl font-bold text-[#4A3F35]">{stats.canela}</p>
          </div>
          <div className="p-4 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg">
            <p className="text-sm text-[#A0958A]">Média Geral</p>
            <p className="text-2xl font-bold text-[#4A3F35]">
              {stats.averagePercentage.toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg">
            <p className="text-sm text-[#A0958A]">Com Login</p>
            <p className="text-2xl font-bold text-[#4A3F35]">{stats.withAuth}</p>
          </div>
          <div className="p-4 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg">
            <p className="text-sm text-[#A0958A]">Anônimos</p>
            <p className="text-2xl font-bold text-[#4A3F35]">{stats.anonymous}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <AdminSelect
            label="Filtrar por Cidade"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="gramado">Gramado</option>
            <option value="canela">Canela</option>
          </AdminSelect>
        </div>
        <div className="flex-1">
          <AdminSelect
            label="Filtrar por Autenticação"
            value={authFilter}
            onChange={(e) => setAuthFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="authenticated">Com Login</option>
            <option value="anonymous">Anônimos</option>
          </AdminSelect>
        </div>
        <button
          onClick={exportCSV}
          disabled={results.length === 0}
          className="px-4 py-2 bg-[#6B8E23] text-white rounded hover:bg-[#556B2F] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Exportar CSV
        </button>
      </div>

      {/* Results Table */}
      <AdminSection title="Resultados">
        {loading && <p className="text-sm text-[#A0958A]">Carregando...</p>}
        {!loading && results.length === 0 && (
          <p className="text-sm text-[#A0958A]">Nenhum resultado encontrado.</p>
        )}
        {!loading && results.length > 0 && (
          <AdminTable
            columns={[
              { key: "date", label: "Data" },
              { key: "name", label: "Nome" },
              { key: "email", label: "Email" },
              { key: "city", label: "Cidade" },
              { key: "score", label: "Pontos" },
              { key: "percentage", label: "%" },
              { key: "auth", label: "Login" },
            ]}
          >
            {results.map((result) => (
              <tr key={result.id} className="hover:bg-[#F5F1EB]/30">
                <td className="py-2 px-3 text-xs">{formatDate(result.created_at)}</td>
                <td className="py-2 px-3">
                  {result.user_name || result.meta?.name || (
                    <span className="text-[#A0958A] italic">Anônimo</span>
                  )}
                </td>
                <td className="py-2 px-3 text-sm">
                  {result.user_email || result.meta?.email || "-"}
                </td>
                <td className="py-2 px-3">
                  <span className="px-2 py-1 bg-[#F5F1EB] text-[#6B5B4F] text-xs rounded capitalize">
                    {result.meta?.city || "-"}
                  </span>
                </td>
                <td className="py-2 px-3 font-semibold">{result.score || 0}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      (result.meta?.percentage || 0) >= 70
                        ? "bg-green-100 text-green-800"
                        : (result.meta?.percentage || 0) >= 50
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.meta?.percentage?.toFixed(1) || 0}%
                  </span>
                </td>
                <td className="py-2 px-3">
                  {result.user_id ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      Sim
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      Não
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </AdminTable>
        )}
      </AdminSection>
    </div>
  );
}
