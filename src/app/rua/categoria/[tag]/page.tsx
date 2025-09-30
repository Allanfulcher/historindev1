"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiTag } from "react-icons/fi";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import HistoryCard from "@/components/cards/HistoryCard";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Historia } from "@/types";

// slug helpers
const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CategoriaTagPage() {
  const params = useParams();
  const router = useRouter();
  const tagSlug = Array.isArray(params?.tag) ? params.tag[0] : (params?.tag as string);

  // Supabase-driven state
  const [resolvedTag, setResolvedTag] = React.useState<string | null>(null);
  const [historias, setHistorias] = React.useState<Historia[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [showQuiz, setShowQuiz] = React.useState(false);
  // Filters
  const [cities, setCities] = React.useState<Array<{ id: string; nome: string }>>([]);
  const [allTags, setAllTags] = React.useState<string[]>([]);
  const [selectedCityId, setSelectedCityId] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(currentScrollY < lastScrollY);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Load: resolve slug to real tag, then fetch stories by tag
  React.useEffect(() => {
    let isMounted = true;
    async function loadByTag() {
      if (!tagSlug) return;
      setLoading(true);
      setError(null);
      try {
        // Step 1: build slug->tag map from existing tags and load all tags for selector
        const { data: tagsRows, error: tagsErr } = await supabaseBrowser
          .from("stories")
          .select("id, tags")
          .not("tags", "is", null)
          .limit(1000);
        if (tagsErr) throw tagsErr;
        const slugToTag = new Map<string, string>();
        const tagSet = new Set<string>();
        (tagsRows ?? []).forEach((row: any) => {
          const arr: string[] = row.tags || [];
          arr.forEach((t) => {
            const original = String(t).trim();
            if (original) slugToTag.set(slugify(original), original);
            if (original) tagSet.add(original);
          });
        });
        const realTag = slugToTag.get(tagSlug) || tagSlug;
        if (!isMounted) return;
        setResolvedTag(realTag);
        setAllTags(Array.from(tagSet).sort((a, b) => a.localeCompare(b, "pt")));

        // Step 2: fetch stories containing the resolved tag
        const { data: rows, error: err } = await supabaseBrowser
          .from("stories")
          .select("id, rua_id, titulo, descricao, fotos, tags")
          .contains("tags", [realTag])
          .limit(1000);
        if (err) throw err;

        const mapped: Historia[] = (rows ?? []).map((h: any) => ({
          id: String(h.id),
          rua_id: String(h.rua_id ?? ""),
          titulo: String(h.titulo ?? ""),
          descricao: String(h.descricao ?? ""),
          fotos: Array.isArray(h.fotos) ? h.fotos : [],
          tags: Array.isArray(h.tags) ? h.tags : [],
        }));
        if (!isMounted) return;
        setHistorias(mapped);

        // Step 3: load cities for filter
        const { data: citiesRows, error: citiesErr } = await supabaseBrowser
          .from("cities")
          .select("id, nome")
          .order("nome", { ascending: true });
        if (citiesErr) throw citiesErr;
        if (!isMounted) return;
        setCities((citiesRows ?? []).map((c: any) => ({ id: String(c.id), nome: String(c.nome) })));
      } catch (e: any) {
        if (!isMounted) return;
        setError(e?.message || "Erro ao carregar histórias da categoria");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadByTag();
    return () => {
      isMounted = false;
    };
  }, [tagSlug]);

  // When a city is chosen, filter historias by city (via rua -> cidade map)
  const [ruaToCity, setRuaToCity] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    let isMounted = true;
    async function mapStreetsToCities() {
      const ruaIds = Array.from(new Set(historias.map((h) => h.rua_id).filter(Boolean)));
      if (ruaIds.length === 0) {
        if (isMounted) setRuaToCity({});
        return;
      }
      const { data, error } = await supabaseBrowser
        .from("streets")
        .select("id, cidade_id")
        .in("id", ruaIds);
      if (error) return; // soft-fail
      const map: Record<string, string> = {};
      (data ?? []).forEach((r: any) => {
        map[String(r.id)] = r.cidade_id ? String(r.cidade_id) : "";
      });
      if (isMounted) setRuaToCity(map);
    }
    mapStreetsToCities();
    return () => {
      isMounted = false;
    };
  }, [historias]);

  const filteredHistorias = React.useMemo(() => {
    if (!selectedCityId) return historias;
    return historias.filter((h) => (ruaToCity[h.rua_id] || "") === selectedCityId);
  }, [historias, selectedCityId, ruaToCity]);

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
          setShowFeedback={setShowFeedback}
          setShowQuiz={() => setShowQuiz(true)}
        />
      </div>

      {/* Menu */}
      <Menu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setShowMap={() => {}}
        historias={[]}
      />

      {/* Category Header Panel (mobile-first) */}
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-4">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-lg bg-blue-50 text-blue-700 w-8 h-8">
                  <FiTag className="w-5 h-5" />
                </span>
                <span>Categoria: <span className="text-blue-700">{resolvedTag ?? tagSlug}</span></span>
              </h1>
              <p className="mt-1 text-sm text-gray-600">Filtre por cidade ou mude de categoria.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <label className="sr-only" htmlFor="city-select">Filtrar por cidade</label>
              <select
                id="city-select"
                className="rounded-lg border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 bg-white"
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                aria-label="Filtrar histórias por cidade"
              >
                <option value="">Todas as cidades</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>

              <label className="sr-only" htmlFor="tag-select">Selecionar outra categoria</label>
              <select
                id="tag-select"
                className="rounded-lg border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 bg-white"
                value={resolvedTag ?? tagSlug}
                onChange={(e) => router.push(`/rua/categoria/${slugify(e.target.value)}`)}
                aria-label="Selecionar outra categoria"
              >
                {(resolvedTag ? [resolvedTag, ...allTags.filter((t) => t !== resolvedTag)] : allTags).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-4">
        {/* Content */}

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

        <section className="mb-6">
          {filteredHistorias.length > 0 && !loading && !error ? (
            <HistoryCard
              historias={filteredHistorias}
              onHistoriaClick={(ruaId, historiaId) => {
                router.push(`/rua/${ruaId}/historia/${historiaId}?scroll=true`);
              }}
            />
          ) : (
            <div className="text-center py-8">
              {!loading && !error && (
                <p className="text-gray-500">Nenhuma história encontrada nesta categoria.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
