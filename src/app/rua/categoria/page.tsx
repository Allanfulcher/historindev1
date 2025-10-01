"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiTag } from "react-icons/fi";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import SearchInput from "@/components/SearchInput";
import { supabaseBrowser } from "@/lib/supabase/client";

// Helper to create URL-friendly slugs
const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CategoriaIndexPage() {
  const router = useRouter();
  // Supabase-driven state
  const [historiasCount, setHistoriasCount] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle header hide/show on scroll
  useEffect(() => {
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

  // Fetch tags from Supabase (client-side)
  React.useEffect(() => {
    let isMounted = true;
    async function loadTags() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabaseBrowser
          .from("stories")
          .select("id, tags")
          .not("tags", "is", null)
          .limit(1000);
        if (error) throw error;
        const tagSet = new Set<string>();
        (data ?? []).forEach((row: any) => {
          const arr: string[] = row.tags || [];
          arr.forEach((t) => {
            const tt = String(t).trim();
            if (tt) tagSet.add(tt);
          });
        });
        if (!isMounted) return;
        const all = Array.from(tagSet).sort((a, b) => a.localeCompare(b, "pt"));
        setTags(all);
        setHistoriasCount((data ?? []).length);
      } catch (e: any) {
        if (!isMounted) return;
        setError(e?.message || "Erro ao carregar categorias");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTags();
    return () => {
      isMounted = false;
    };
  }, []);

  const allTags = useMemo(() => {
    const filtered = searchTerm
      ? tags.filter((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      : tags;
    return filtered;
  }, [tags, searchTerm]);

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

      {/* Sticky Search Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300"
        style={{ transform: isHeaderVisible ? "translateY(64px)" : "translateY(0)" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Voltar"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <SearchInput placeholder="Buscar categorias..." onSearch={setSearchTerm} />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-4">
        {/* Spacer */}
        <div className="h-35"></div>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4 pt-4">Categorias</h1>
          <p className="text-sm text-gray-600">
            Explore histórias por categorias. Toque em uma categoria para ver as histórias relacionadas.
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando categorias...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <section className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/rua/categoria/${slugify(tag)}`)}
                className="group w-full rounded-lg bg-white border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all text-left"
                aria-label={`Ver histórias da categoria ${tag}`}
              >
                <div className="flex items-center gap-2">
                  <FiTag className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-sm font-medium text-gray-900">{tag}</span>
                </div>
              </button>
            ))}
          </div>

          {allTags.length === 0 && !loading && !error && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma categoria encontrada.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
