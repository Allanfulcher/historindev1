"use client";

import React from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import HistoriaCard from "@/app/rua/_components/HistoriaCard";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Historia } from "@/types";

interface Negocio {
  id: string;
  nome: string;
  descricao?: string;
  logo_url?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  endereco?: string;
  telefone?: string;
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
          .select("id, nome, descricao, logo_url, website, instagram, facebook, email, endereco, telefone")
          .eq("id", negocioId)
          .maybeSingle();
        if (nErr) throw nErr;
        if (!nRow) {
          if (mounted) setError("Negócio não encontrado");
          return;
        }
        setNegocio({
          id: String(nRow.id),
          nome: String(nRow.nome ?? ""),
          descricao: nRow.descricao ? String(nRow.descricao) : undefined,
          logo_url: nRow.logo_url ? String(nRow.logo_url) : undefined,
          website: nRow.website ? String(nRow.website) : undefined,
          instagram: nRow.instagram ? String(nRow.instagram) : undefined,
          facebook: nRow.facebook ? String(nRow.facebook) : undefined,
          email: nRow.email ? String(nRow.email) : undefined,
          endereco: nRow.endereco ? String(nRow.endereco) : undefined,
          telefone: nRow.telefone ? String(nRow.telefone) : undefined,
        });
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
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Logo */}
              <div className="shrink-0">
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
              </div>

              <div className="flex-1 min-w-0 w-full">
                {/* Title + action icons */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <h1 className="text-[#1f2937] text-2xl sm:text-3xl font-semibold leading-tight">
                    {negocio.nome}
                  </h1>
                  <div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0">
                    {negocio.website && (
                      <a
                        href={negocio.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                        title="Website"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.93 9H16.9a15.7 15.7 0 00-1.02-4.14A8.02 8.02 0 0119.93 11zM12 4c1.2 0 2.86 1.86 3.67 5H8.33C9.14 5.86 10.8 4 12 4zM6.12 6.86A15.7 15.7 0 005.1 11H4.07a8.02 8.02 0 012.05-4.14zM4.07 13H5.1c.2 1.45.62 2.86 1.02 4.14A8.02 8.02 0 014.07 13zM12 20c-1.2 0-2.86-1.86-3.67-5h7.34C14.86 18.14 13.2 20 12 20zm5.88-2.86A15.7 15.7 0 0018.9 13h1.03a8.02 8.02 0 01-2.05 4.14z"/></svg>
                      </a>
                    )}
                    {negocio.instagram && (
                      <a
                        href={negocio.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM17.8 6.2a1 1 0 110 2 1 1 0 010-2z"/></svg>
                      </a>
                    )}
                    {negocio.facebook && (
                      <a
                        href={negocio.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        title="Facebook"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13 22v-8h2.5l.5-3H13V9.5c0-.9.3-1.5 1.6-1.5H16V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.9V11H7v3h3v8h3z"/></svg>
                      </a>
                    )}
                    {negocio.email && (
                      <a
                        href={`mailto:${negocio.email}`}
                        aria-label="Email"
                        title="Email"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4 6h16a2 2 0 012 2v.3l-10 5.6L2 8.3V8a2 2 0 012-2zm18 4.2v5.8a2 2 0 01-2 2H4a2 2 0 01-2-2v-5.8l10 5.6 10-5.6z"/></svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Address & phone */}
                {(negocio.endereco || negocio.telefone) && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#4A3F35]">
                    {negocio.endereco && (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
                        {negocio.endereco}
                      </span>
                    )}
                    {negocio.telefone && (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.24c1.2.48 2.6.74 4 .74a1 1 0 011 1v3.5a1 1 0 01-1 1A18.5 18.5 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.4.26 2.8.74 4a1 1 0 01-.24 1.1l-2.4 2.7z"/></svg>
                        {negocio.telefone}
                      </span>
                    )}
                  </div>
                )}

                {/* Description separated */}
                {negocio.descricao && (
                  <div className="mt-4 pt-4 border-t border-[#E6D3B4]">
                    <p className="text-sm text-[#4A3F35] leading-relaxed">{negocio.descricao}</p>
                  </div>
                )}
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
