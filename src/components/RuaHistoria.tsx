'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppData, Historia, Rua, Cidade } from '../types';
import CityCarousel from './CityCarousel';
import Header from './Header';
import Menu from './Menu';
import PrimaryBtn from './buttons/PrimaryBtn';

interface RuaHistoriaProps {
  data: AppData;
  initialRuaId?: string;
  initialHistoriaId?: string;
}

interface PreviewContent {
  type: 'rua' | 'historia';
  title: string;
  content: string;
  image?: string;
}

const RuaHistoria: React.FC<RuaHistoriaProps> = ({ 
  data, 
  initialRuaId, 
  initialHistoriaId 
}) => {
  const router = useRouter();
  const [currentHistory, setCurrentHistory] = useState<Historia | null>(null);
  const [historiasDaRua, setHistoriasDaRua] = useState<Historia[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllStories, setShowAllStories] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string | undefined>(undefined);
  const [filteredRuas, setFilteredRuas] = useState<Rua[]>([]);
  const [activeTab, setActiveTab] = useState<'historia' | 'rua' | 'cidade'>('historia');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Find current rua and cidade
  const rua = data.ruas.find(r => r.id === initialRuaId) || null;
  const cidade = rua ? data.cidades.find(c => c.id === rua.cidade_id) || null : null;

  // Update meta tags
  const updateMetaTags = (description: string, imageUrl?: string) => {
    if (typeof document !== 'undefined') {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }

      if (imageUrl) {
        let metaImage = document.querySelector('meta[property="og:image"]');
        if (metaImage) {
          metaImage.setAttribute('content', imageUrl);
        } else {
          metaImage = document.createElement('meta');
          metaImage.setAttribute('property', 'og:image');
          metaImage.setAttribute('content', imageUrl);
          document.head.appendChild(metaImage);
        }
      }
    }
  };

  // Update document title and meta tags
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (activeTab === 'historia' && currentHistory) {
        const cidadeNome = cidade?.nome || "Cidade Desconhecida";
        document.title = `${currentHistory.titulo} - ${cidadeNome}`;
        updateMetaTags(currentHistory.descricao, currentHistory.fotos?.[0]);
      } else if (activeTab === 'rua' && rua) {
        document.title = `A história da ${rua.nome} - ${cidade?.nome || "Cidade Desconhecida"}`;
        updateMetaTags(rua.descricao || '', rua.fotos?.[0]);
      } else if (activeTab === 'cidade' && cidade) {
        document.title = `A história da cidade de ${cidade.nome}`;
        updateMetaTags(cidade.descricao || '', cidade.foto);
      }
    }
  }, [currentHistory, cidade, rua, activeTab]);

  // Initialize data based on URL parameters
  useEffect(() => {
    if (rua && data.historias) {
      const historiasList = data.historias
        .filter(h => h.rua_id === rua.id)
        .sort((a, b) => (parseInt(a.ano || '0') || 0) - (parseInt(b.ano || '0') || 0) || parseInt(a.id) - parseInt(b.id));
      
      setHistoriasDaRua(historiasList);

      if (initialHistoriaId) {
        const historia = historiasList.find(h => h.id === initialHistoriaId);
        if (historia) {
          setCurrentHistory(historia);
          const index = historiasList.findIndex(h => h.id === historia.id);
          setCurrentIndex(index);
        }
      } else if (historiasList.length > 0) {
        const primeiraHistoria = historiasList[0];
        setCurrentHistory(primeiraHistoria);
        setCurrentIndex(0);
        router.replace(`/rua/${initialRuaId}/historia/${primeiraHistoria.id}`);
      }
      
      if (rua.cidade_id) {
        setSelectedCityId(rua.cidade_id);
      }
    }
  }, [initialRuaId, initialHistoriaId, rua, data.historias, router]);

  // Filter ruas based on selected city
  useEffect(() => {
    if (data.ruas) {
      const filtered = selectedCityId 
        ? data.ruas.filter(r => r.cidade_id === selectedCityId) 
        : data.ruas;
      setFilteredRuas(filtered);
    }
  }, [selectedCityId, data.ruas]);

  const handleRuaClick = (rua: Rua) => {
    router.push(`/rua/${rua.id}`);
  };

  const handleCityClick = (cidade: Cidade) => {
    setSelectedCityId(cidade.id);
  };

  const changeTab = (tab: 'historia' | 'rua' | 'cidade') => {
    setActiveTab(tab);
  };

  const handleHistoriaNavigation = (direction: 'prev' | 'next') => {
    if (historiasDaRua.length === 0) return;
    
    let newIndex = currentIndex;
    if (direction === 'next' && currentIndex < historiasDaRua.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }
    
    if (newIndex !== currentIndex) {
      const newHistoria = historiasDaRua[newIndex];
      setCurrentIndex(newIndex);
      setCurrentHistory(newHistoria);
      router.push(`/rua/${initialRuaId}/historia/${newHistoria.id}`);
    }
  };

  if (!rua || !currentHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header setMenuOpen={setMenuOpen} setShowFeedback={setShowFeedback} />
        <Menu 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          historias={data.historias}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">História não encontrada</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header setMenuOpen={setMenuOpen} setShowFeedback={setShowFeedback} />
      <Menu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen}
        historias={data.historias}
      />

      <main className="container mx-auto px-4 py-8">
        {/* City Carousel */}
        <CityCarousel 
          cidades={data.cidades}
          handleCityClick={handleCityClick}
          selectedCityId={selectedCityId}
        />

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1">
            <PrimaryBtn
              onClick={() => changeTab('historia')}
              disabled={activeTab === 'historia'}
            >
              História
            </PrimaryBtn>
            <PrimaryBtn
              onClick={() => changeTab('rua')}
              disabled={activeTab === 'rua'}
            >
              Rua
            </PrimaryBtn>
            <PrimaryBtn
              onClick={() => changeTab('cidade')}
              disabled={activeTab === 'cidade'}
            >
              Cidade
            </PrimaryBtn>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'historia' && currentHistory && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => handleHistoriaNavigation('prev')}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  ← Anterior
                </button>
                <span className="text-sm text-gray-600">
                  {currentIndex + 1} de {historiasDaRua.length}
                </span>
                <button
                  onClick={() => handleHistoriaNavigation('next')}
                  disabled={currentIndex === historiasDaRua.length - 1}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  Próxima →
                </button>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{currentHistory.titulo}</h1>
              
              {currentHistory.fotos && currentHistory.fotos.length > 0 && (
                <img
                  src={currentHistory.fotos[0]}
                  alt={currentHistory.titulo}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{currentHistory.descricao}</p>
              </div>
              
              {currentHistory.ano && (
                <div className="mt-4 text-sm text-gray-600">
                  Ano: {currentHistory.ano}
                </div>
              )}
            </div>
          )}

          {activeTab === 'rua' && rua && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold mb-4">{rua.nome}</h1>
              {rua.fotos && rua.fotos.length > 0 && (
                <img
                  src={rua.fotos[0]}
                  alt={rua.nome}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{rua.descricao}</p>
              </div>
            </div>
          )}

          {activeTab === 'cidade' && cidade && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold mb-4">{cidade.nome}</h1>
              {cidade.foto && (
                <img
                  src={cidade.foto}
                  alt={cidade.nome}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{cidade.descricao}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RuaHistoria;
