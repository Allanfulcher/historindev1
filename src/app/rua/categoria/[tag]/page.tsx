"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiTag } from "react-icons/fi";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import HistoriaCard from "@/components/ruas/HistoriaCard";
import YearNavigator from "@/components/ruas/YearNavigator";
import CitySelector from "@/components/ruas/CitySelector";
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
  const [selectedCityId, setSelectedCityId] = React.useState<string>("");
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);

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

        // Step 2: fetch stories containing the resolved tag
        const { data: rows, error: err } = await supabaseBrowser
          .from("stories")
          .select("id, rua_id, titulo, descricao, fotos, tags, ano, criador")
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
          ano: h.ano ? String(h.ano) : undefined,
          criador: h.criador ? String(h.criador) : undefined,
        }));
        if (!isMounted) return;
        setHistorias(mapped);

        // No cities fetch needed (using static CitySelector)
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
    let list = historias;
    if (selectedCityId) {
      list = list.filter((h) => (ruaToCity[h.rua_id] || "") === selectedCityId);
    }
    if (selectedYear) {
      list = list.filter((h) => parseInt(h.ano || "0", 10) === selectedYear);
    }
    return list;
  }, [historias, selectedCityId, selectedYear, ruaToCity]);

  // Refs to scroll to first historia of a selected year
  const firstOfYearRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (selectedYear && firstOfYearRef.current) {
      firstOfYearRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedYear]);

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
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-4">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl text-gray-900 flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-lg bg-blue-50 text-blue-700 w-8 h-8 shrink-0">
                  <FiTag className="w-5 h-5" />
                </span>
                <div className="flex items-center gap-2">
                  <span className="sr-only sm:not-sr-only sm:text-sm sm:text-gray-700">Categoria:</span>
                  <span className="text-blue-700 text-2xl sm:text-3xl font-medium tracking-tight">
                    {resolvedTag ?? tagSlug}
                  </span>
                </div>
              </h1>
              <p className="mt-1 text-sm text-gray-600">Veja todas as historias desta categoria.</p>
            </div>

            {/* City selector with consistent styling */}
            <div className="min-w-[200px]">
              <CitySelector selectedCityId={selectedCityId} onCityChange={setSelectedCityId} />
            </div>
          </div>
        </div>
      </div>

      {/* Year Navigator (floating) */}
      <YearNavigator
        historias={historias}
        onYearSelect={(y) => setSelectedYear(y)}
      />

      <main className="max-w-2xl mx-auto px-4 pb-4">
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
            <div>
              {filteredHistorias.map((h, idx) => (
                <div
                  key={h.id}
                  ref={idx === 0 ? firstOfYearRef : undefined}
                >
                  <HistoriaCard historia={h} />
                </div>
              ))}
            </div>
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
