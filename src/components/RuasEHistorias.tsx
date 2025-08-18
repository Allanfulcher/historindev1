'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import Header from './Header';
import Menu from './Menu';
import SearchInput from './SearchInput';
import ViewMap from './buttons/ViewMap';
import StreetCard from './cards/StreetCard';
import HistoryCard from './cards/HistoryCard';

interface Rua {
  id: string;
  nome: string;
  fotos?: string;
}

interface Historia {
  id: string;
  rua_id: string;
  titulo: string;
  descricao: string;
  fotos: string[];
}

interface RuasEHistoriasProps {
  ruas?: Rua[];
  historias?: Historia[];
}

const RuasEHistorias: React.FC<RuasEHistoriasProps> = ({ 
  ruas = [], 
  historias = [] 
}) => {
  // Router and state management
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRuas, setFilteredRuas] = useState<Rua[]>(ruas);
  const [filteredHistorias, setFilteredHistorias] = useState<Historia[]>(historias);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMap, setShowMap] = useState(true); // For the Menu component

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

  // Map filteredRuas to include a random photo from associated stories
  const filteredRuasWithImages = useMemo(() => {
    return filteredRuas.map(rua => {
      const historiasDaRua = historias.filter(historia => historia.rua_id === rua.id);
      const fotos = historiasDaRua.flatMap(historia => historia.fotos);
      const randomFoto = fotos.length > 0 ? fotos[Math.floor(Math.random() * fotos.length)] : null;
      return { ...rua, fotos: randomFoto || 'https://placehold.co/300x200' };
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
    <div className="min-h-screen bg-[#f4ede0] relative">
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <Header 
          setMenuOpen={() => setMenuOpen(true)} 
          setShowFeedback={setShowFeedback} 
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
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300"
           style={{ transform: isHeaderVisible ? 'translateY(64px)' : 'translateY(0)' }}>
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
              <SearchInput />
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
          <ViewMap />
        </div>

        {/* All Streets Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Todas as Ruas</h2>
          </div>
          {filteredRuasWithImages.length > 0 ? (
            <StreetCard ruas={filteredRuasWithImages} handleRuaClick={(rua) => console.log(rua)} />
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
            <HistoryCard historias={filteredHistorias} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma história encontrada para "{searchTerm}"</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

// Add display name for better debugging
RuasEHistorias.displayName = 'RuasEHistorias';

export default RuasEHistorias;

