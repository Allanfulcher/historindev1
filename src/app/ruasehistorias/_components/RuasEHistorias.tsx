'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiTag } from 'react-icons/fi';
import { useLegacyData } from '../../../hooks/useLegacyData';
import { Rua, Historia } from '../../../types';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import SearchInput from './SearchInput';
import ViewMap from '../../../components/MapView';
import StreetCard from '../../../components/cards/StreetCard';
import HistoryCard from '../../../components/cards/HistoryCard';
import FeedbackPopup from '../../../components/popups/FeedbackPopup';
import QuizModal from '../../../components/popups/QuizModal';

const RuasEHistorias: React.FC = () => {
  // Use legacy data hook
  const { data } = useLegacyData();
  const { ruas, historias } = data;
  // Router and state management
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRuas, setFilteredRuas] = useState<Rua[]>(ruas);
  const [filteredHistorias, setFilteredHistorias] = useState<Historia[]>(historias);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMap, setShowMap] = useState(true); // For the Menu component
  const [showQuiz, setShowQuiz] = useState(false);

  // Helper: slugify tag names for URL
  const slugify = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  // Filter ruas and historias based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredRuas(ruas);
      setFilteredHistorias(historias);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      setFilteredRuas(ruas.filter(rua => rua.nome.toLowerCase().includes(lowercasedTerm)));
      setFilteredHistorias(historias.filter(historia => historia.titulo.toLowerCase().includes(lowercasedTerm)));
    }
  }, [searchTerm, ruas, historias]);

  // Map filteredRuas to include a deterministic photo from associated stories
  const filteredRuasWithImages = useMemo(() => {
    return filteredRuas.map(rua => {
      const historiasDaRua = historias.filter(historia => historia.rua_id === rua.id);
      const fotos = historiasDaRua.flatMap(historia => {
        // Handle both string arrays and FotoWithCredit arrays
        if (Array.isArray(historia.fotos)) {
          return historia.fotos.map(foto => 
            typeof foto === 'string' ? foto : foto.url
          );
        }
        return [];
      });
      // Use deterministic selection based on rua.id to avoid hydration mismatch
      const photoIndex = fotos.length > 0 ? parseInt(rua.id) % fotos.length : 0;
      const selectedFoto = fotos.length > 0 ? fotos[photoIndex] : null;
      return { ...rua, fotos: selectedFoto || 'https://placehold.co/300x200' };
    });
  }, [filteredRuas, historias]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Always show header when at top of page
      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
      } else {
        // Hide header when scrolling down, show when scrolling up
        setIsHeaderVisible(currentScrollY < lastScrollY);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#f4ede0] relative overflow-x-hidden">
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 overflow-x-hidden ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <Header 
          setMenuOpen={() => setMenuOpen(true)} 
          setShowFeedback={setShowFeedback} 
          setShowQuiz={() => setShowQuiz(true)}
        />
      </div>
      
      {/* Menu Component - Placed outside the header at the root level */}
      <Menu 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setShowMap={setShowMap}
        historias={historias}
      />
      
      {/* Sticky Search Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 overflow-x-hidden"
           style={{ transform: isHeaderVisible ? 'translateY(64px)' : 'translateY(0)' }}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => router.back()}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95"
              aria-label="Voltar"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 min-w-0">
              <SearchInput 
                placeholder="Buscar ruas e histórias..."
                onSearch={setSearchTerm}
              />
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-4 pb-4">
        {/* Spacer to push content below fixed search bar */}
        <div className="h-35">
          
        </div>
        
        <div className="mb-3">
          <h1 className="text-xl font-bold text-gray-900 mb-4 pt-4">Ruas e Histórias</h1>
          <ViewMap 
            ruas={ruas}
            setSelectedRuaId={(id: string) => router.push(`/rua/${String(id)}`)}
            setPreviewContent={(_content) => {}}
          />
        </div>

        {/* Categories Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiTag className="w-5 h-5 text-gray-700" />
              Categorias
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['Igrejas', 'Cinema', 'Eventos'].map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/rua/categoria/${slugify(tag)}`)}
                className="group w-full rounded-lg bg-white border border-gray-200 p-3 shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                aria-label={`Ver histórias da categoria ${tag}`}
              >
                <div className="flex items-center gap-2">
                  <FiTag className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-sm font-medium text-gray-900">{tag}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        

        {/* All Streets Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Todas as Ruas</h2>
          </div>
          {filteredRuasWithImages.length > 0 ? (
            <StreetCard ruas={filteredRuasWithImages} handleRuaClick={(rua) => router.push(`/rua/${String(rua.id)}`)} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma rua encontrada para "{searchTerm}"</p>
            </div>
          )}
        </section>

        {/* All Stories Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Todas as Histórias</h2>
          </div>
          {filteredHistorias.length > 0 ? (
            <HistoryCard 
              historias={filteredHistorias}
              onHistoriaClick={(ruaId, historiaId) => {
                // Navigate with scroll query parameter to trigger auto-scroll
                router.push(`/rua/${ruaId}/historia/${historiaId}?scroll=true`);
              }}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma história encontrada para "{searchTerm}"</p>
            </div>
          )}
        </section>
      </main>
      {showFeedback && (
            <FeedbackPopup  
                isOpen={showFeedback}
                onClose={() => setShowFeedback(false)}
            />
        )}
      {showQuiz && (
            <QuizModal 
                isOpen={showQuiz}
                onClose={() => setShowQuiz(false)}
            />
        )}
    </div>
  );
};

// Add display name for better debugging
RuasEHistorias.displayName = 'RuasEHistorias';

export default RuasEHistorias;


