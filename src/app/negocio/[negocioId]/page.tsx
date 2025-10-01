"use client";

import React from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import HistoriaCard from "@/components/ruas/HistoriaCard";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Historia } from "@/types";

interface Negocio {
  id: string;
  nome: string;
  descricao?: string;
  logo_url?: string;
  site?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
}

export default function NegocioPage() {
  const params = useParams();
  const raw = Array.isArray(params?.negocioId) ? params.negocioId[0] : (params?.negocioId as string);
  const negocioId = String(raw ?? "");

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [negocio, setNegocio] = React.useState<Negocio | null>(null);
  const [historias, setHistorias] = React.useState<Historia[]>([]);

  // Header show/hide on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsHeaderVisible(current < lastScrollY || current === 0);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Load negocio and its stories
  React.useEffect(() => {
    let mounted = true;
    async function load() {
      if (!negocioId) return;
      setLoading(true);
      setError(null);
      try {
        // 1) Negócio
        const { data: nRow, error: nErr } = await supabaseBrowser
          .from("businesses")
          .select("id, nome, descricao, logo_url, site, instagram, facebook, email")
          .eq("id", negocioId)
          .maybeSingle();
        if (nErr) throw nErr;
        if (!nRow) {
          if (mounted) setError("Negócio não encontrado");
          return;
        }
        if (!mounted) return;
        setNegocio({
          id: String(nRow.id),
          nome: String(nRow.nome ?? ""),
          descricao: nRow.descricao ? String(nRow.descricao) : undefined,
          logo_url: nRow.logo_url ? String(nRow.logo_url) : undefined,
          site: nRow.site ? String(nRow.site) : undefined,
          instagram: nRow.instagram ? String(nRow.instagram) : undefined,
          facebook: nRow.facebook ? String(nRow.facebook) : undefined,
          email: nRow.email ? String(nRow.email) : undefined,
        });

        // 2) Stories for this negocio (support both schemas: org_id or negocio_id)
        // Try a single query with OR when possible
        const { data: rows, error: stErr } = await supabaseBrowser
          .from("stories")
          .select("id, rua_id, titulo, descricao, fotos, tags, ano, criador, org_id, negocio_id")
          .or(`org_id.eq.${negocioId},negocio_id.eq.${negocioId}`)
          .limit(1000);
        if (stErr) throw stErr;

        const list: Historia[] = (rows ?? [])
          .filter((h: any) => String(h.org_id ?? h.negocio_id ?? "") === negocioId)
          .map((h: any) => ({
            id: String(h.id),
            rua_id: String(h.rua_id ?? ""),
            titulo: String(h.titulo ?? ""),
            descricao: String(h.descricao ?? ""),
            fotos: Array.isArray(h.fotos) ? h.fotos : [],
            tags: Array.isArray(h.tags) ? h.tags : [],
            ano: h.ano ? String(h.ano) : undefined,
            criador: h.criador ? String(h.criador) : undefined,
          }));

        // Sort by year (desc) then title
        list.sort((a, b) => {
          const ay = parseInt(a.ano || "0", 10);
          const by = parseInt(b.ano || "0", 10);
          if (by !== ay) return by - ay;
          return a.titulo.localeCompare(b.titulo, "pt");
        });

        if (mounted) setHistorias(list);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Erro ao carregar negócio");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [negocioId]);

  return (
    <div className="min-h-screen bg-[#f4ede0] relative">
      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Header
          setMenuOpen={() => setMenuOpen(true)}
          setShowFeedback={() => {}}
          setShowQuiz={() => {}}
        />
      </div>

      {/* Menu (kept for consistency) */}
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} setShowMap={() => {}} historias={[]} />

      {/* Negócio header panel */}
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-4">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-5">
          {negocio ? (
            <div className="flex items-start gap-4">
              {/* Logo */}
              {negocio.logo_url ? (
                <img
                  src={negocio.logo_url}
                  alt={negocio.nome}
                  className="w-14 h-14 rounded-lg object-cover border border-[#E6D3B4]"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-[#F5F1E8] border border-[#E6D3B4] flex items-center justify-center text-[#8B4513] font-bold">
                  {negocio.nome?.charAt(0) || "N"}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1 className="text-[#1f2937] text-2xl sm:text-3xl font-semibold leading-tight">
                  {negocio.nome}
                </h1>
                {negocio.descricao && (
                  <p className="mt-2 text-sm text-[#4A3F35] leading-relaxed">
                    {negocio.descricao}
                  </p>
                )}

                {/* Links */}
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {negocio.site && (
                    <a
                      href={negocio.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Site
                    </a>
                  )}
                  {negocio.instagram && (
                    <a
                      href={negocio.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Instagram
                    </a>
                  )}
                  {negocio.facebook && (
                    <a
                      href={negocio.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Facebook
                    </a>
                  )}
                  {negocio.email && (
                    <a
                      href={`mailto:${negocio.email}`}
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600">Carregando negócio...</div>
          )}
        </div>
      </div>

      {/* Stories feed */}
      <main className="max-w-2xl mx-auto px-4 pb-4">
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando histórias...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {!loading && !error && historias.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma história deste negócio ainda.</p>
          </div>
        )}

        {historias.length > 0 && (
          <section className="mb-6">
            <div>
              {historias.map((h) => (
                <div key={h.id}>
                  <HistoriaCard historia={h} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
