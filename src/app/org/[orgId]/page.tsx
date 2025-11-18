"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import HistoriaCard from "@/app/rua/_components/HistoriaCard";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Historia } from "@/types";

interface Org {
  id: string;
  nome: string;
  descricao?: string;
  logo_url?: string;
  site?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
}

export default function OrganizationPage() {
  const params = useParams();
  const router = useRouter();
  const raw = Array.isArray(params?.orgId) ? params.orgId[0] : (params?.orgId as string);
  const orgId = String(raw ?? "");

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [org, setOrg] = React.useState<Org | null>(null);
  const [historias, setHistorias] = React.useState<Historia[]>([]);

  // Header show/hide on scroll (like other pages)
  React.useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsHeaderVisible(current < lastScrollY || current === 0);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Load organization and its stories
  React.useEffect(() => {
    let mounted = true;
    async function load() {
      if (!orgId) return;
      setLoading(true);
      setError(null);
      try {
        // 1) Organization
        const { data: orgRow, error: orgErr } = await supabaseBrowser
          .from("organizations")
          .select("id, nome, descricao, logo_url, site, instagram, facebook, email")
          .eq("id", orgId)
          .maybeSingle();
        if (orgErr) throw orgErr;
        if (!orgRow) {
          if (mounted) setError("Organização não encontrada");
          return;
        }
        if (!mounted) return;
        setOrg({
          id: String(orgRow.id),
          nome: String(orgRow.nome ?? ""),
          descricao: orgRow.descricao ? String(orgRow.descricao) : undefined,
          logo_url: orgRow.logo_url ? String(orgRow.logo_url) : undefined,
          site: orgRow.site ? String(orgRow.site) : undefined,
          instagram: orgRow.instagram ? String(orgRow.instagram) : undefined,
          facebook: orgRow.facebook ? String(orgRow.facebook) : undefined,
          email: orgRow.email ? String(orgRow.email) : undefined,
        });

        // 2) Stories for this organization
        const { data: rows, error: stErr } = await supabaseBrowser
          .from("stories")
          .select("id, rua_id, titulo, descricao, fotos, tags, ano, criador")
          .eq("org_id", orgId)
          .limit(1000);
        if (stErr) throw stErr;

        const list: Historia[] = (rows ?? []).map((h: any) => ({
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
        if (mounted) setError(e?.message || "Erro ao carregar organização");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [orgId]);

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

      {/* Org header panel */}
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-4">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-5">
          {org ? (
            <div className="flex items-start gap-4">
              {/* Logo */}
              {org.logo_url ? (
                <img
                  src={org.logo_url}
                  alt={org.nome}
                  className="w-14 h-14 rounded-lg object-cover border border-[#E6D3B4]"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-[#F5F1E8] border border-[#E6D3B4] flex items-center justify-center text-[#8B4513] font-bold">
                  {org.nome?.charAt(0) || "O"}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1 className="text-[#1f2937] text-2xl sm:text-3xl font-semibold leading-tight">
                  {org.nome}
                </h1>
                {org.descricao && (
                  <p className="mt-2 text-sm text-[#4A3F35] leading-relaxed">
                    {org.descricao}
                  </p>
                )}

                {/* Links */}
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {org.site && (
                    <a
                      href={org.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Site
                    </a>
                  )}
                  {org.instagram && (
                    <a
                      href={org.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Instagram
                    </a>
                  )}
                  {org.facebook && (
                    <a
                      href={org.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Facebook
                    </a>
                  )}
                  {org.email && (
                    <a
                      href={`mailto:${org.email}`}
                      className="px-3 py-1 rounded-md border border-[#D4C4A8] text-[#4A3F35] hover:bg-[#F5F1E8]"
                    >
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600">Carregando organização...</div>
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
            <p className="text-gray-500">Nenhuma história desta organização ainda.</p>
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
