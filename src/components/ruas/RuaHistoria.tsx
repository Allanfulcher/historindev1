'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { legacyDb } from '../../utils/legacyDb';
import { legacyHistorias, legacyRuas, legacyCidades } from '../../data/legacyData';
import type { Historia, Rua, Cidade } from '../../types';
import Header from '../Header';
import Menu from '../Menu';
import NavigationTab from './NavigationTab';

interface RuaHistoriaProps {
  className?: string;
}

const RuaHistoria: React.FC<RuaHistoriaProps> = ({ className }) => {
  const params = useParams();
  const router = useRouter();
  const ruaId = Array.isArray(params?.ruaId) ? params.ruaId[0] : params?.ruaId;
  const historiaId = Array.isArray(params?.historiaId) ? params.historiaId[0] : params?.historiaId;
  
  const [rua, setRua] = useState<Rua | null>(null);
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [cidade, setCidade] = useState<Cidade | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'historia' | 'rua' | 'cidade'>('historia');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize database
    legacyDb.loadData({
      historias: legacyHistorias,
      ruas: legacyRuas,
      cidades: legacyCidades
    });

    // Load data if IDs are provided
    if (ruaId) {
      const foundRua = legacyDb.getRuaById(ruaId);
      setRua(foundRua || null);
      
      if (foundRua?.cidade_id) {
        const foundCidade = legacyDb.getCidadeById(foundRua.cidade_id.toString());
        setCidade(foundCidade || null);
      }
    }

    if (historiaId) {
      const foundHistoria = legacyDb.getHistoriaById(historiaId);
      
      // Validate that the historia belongs to the specified rua
      if (foundHistoria && ruaId) {
        if (foundHistoria.rua_id?.toString() !== ruaId) {
          // Historia doesn't belong to this rua - find the correct rua and redirect
          const correctRuaId = foundHistoria.rua_id?.toString();
          if (correctRuaId) {
            router.replace(`/rua/${correctRuaId}/historia/${historiaId}`);
            return;
          } else {
            setValidationError('Esta história não está associada a nenhuma rua válida.');
          }
        } else {
          setHistoria(foundHistoria);
        }
      } else if (foundHistoria) {
        setHistoria(foundHistoria);
      } else {
        setHistoria(null);
      }
    }

    setIsLoading(false);
  }, [ruaId, historiaId, router]);

  const changeTab = (tab: 'historia' | 'rua' | 'cidade') => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#6B5B4F]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (validationError) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <i className="fas fa-exclamation-triangle text-4xl text-[#CD853F] mb-4"></i>
          </div>
          <h2 className="text-xl font-bold text-[#4A3F35] mb-2">Erro de Validação</h2>
          <p className="text-[#6B5B4F] mb-6">{validationError}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded transition-colors duration-200"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#FAF7F2] ${className || ''}`}>
      {/* Header */}
      <Header 
        setMenuOpen={setMenuOpen}
        setShowFeedback={setShowFeedback}
      />

      {/* Menu */}
      <Menu 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        historias={legacyDb.getHistorias()}
      />

      {/* Main Content */}
      <main className="w-full py-6">
        <div className="max-w-5xl mx-auto px-4">
          {/* Navigation Tabs */}
          <NavigationTab activeTab={activeTab} changeTab={changeTab} />
          
          {/* Content Card */}
          <div className="bg-[#FEFCF8] rounded-xl shadow-sm ring-1 ring-[#A0958A]/20 p-6">
            {activeTab === 'historia' && historia && (
              <>
                {/* Historia Content */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-[#A0958A] font-medium">
                      {rua?.nome && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F1EB] text-[#6B5B4F] mr-2">
                          <i className="fas fa-road mr-2 text-[#CD853F]"></i>
                          {rua.nome}
                        </span>
                      )}
                      {cidade?.nome && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F1EB] text-[#6B5B4F]">
                          <i className="fas fa-map-marker-alt mr-2 text-[#CD853F]"></i>
                          {cidade.nome}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#4A3F35]">{historia.titulo}</h1>
                  
                  <div className="prose max-w-none mb-6">
                    <p className="text-[#6B5B4F] leading-relaxed text-base">{historia.descricao}</p>
                  </div>
                  
                  {historia.ano && (
                    <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-[#F5F1EB] text-sm text-[#6B5B4F] font-medium">
                      <i className="fas fa-calendar-alt mr-2 text-[#CD853F]"></i>
                      Ano: {historia.ano}
                    </div>
                  )}
                  
                  {/* Image Gallery */}
                  {historia.fotos && historia.fotos.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-[#4A3F35] mb-4">
                        <i className="fas fa-images mr-2 text-[#CD853F]"></i>
                        Galeria de Imagens
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {historia.fotos.map((foto, index) => (
                          <div key={index} className="group cursor-pointer">
                            <img
                              src={foto}
                              alt={`${historia.titulo} - Imagem ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                              onClick={() => {
                                // TODO: Add lightbox/modal for full-size viewing
                                window.open(foto, '_blank');
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'rua' && rua && (
              <>
                {/* Rua Content */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-[#A0958A] font-medium">
                      {cidade?.nome && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F1EB] text-[#6B5B4F]">
                          <i className="fas fa-map-marker-alt mr-2 text-[#CD853F]"></i>
                          {cidade.nome}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#4A3F35]">{rua.nome}</h1>
                  
                  <div className="prose max-w-none mb-6">
                    <p className="text-[#6B5B4F] leading-relaxed text-base">{rua.descricao}</p>
                  </div>
                  
                  {/* Image Gallery */}
                  {rua.fotos && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-[#4A3F35] mb-4">
                        <i className="fas fa-images mr-2 text-[#CD853F]"></i>
                        Galeria de Imagens
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(Array.isArray(rua.fotos) ? rua.fotos : [rua.fotos]).map((foto, index) => (
                          <div key={index} className="group cursor-pointer">
                            <img
                              src={foto}
                              alt={`${rua.nome} - Imagem ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                              onClick={() => {
                                window.open(foto, '_blank');
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'cidade' && cidade && (
              <>
                {/* Cidade Content */}
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#4A3F35]">{cidade.nome}</h1>
                  
                  <div className="prose max-w-none mb-6">
                    <p className="text-[#6B5B4F] leading-relaxed text-base">{cidade.descricao}</p>
                  </div>
                  
                  <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F5F1EB] rounded-lg">
                      <h3 className="text-sm font-medium text-[#4A3F35] mb-1">Estado</h3>
                      <p className="text-[#6B5B4F]">{cidade.estado}</p>
                    </div>
                    <div className="p-4 bg-[#F5F1EB] rounded-lg">
                      <h3 className="text-sm font-medium text-[#4A3F35] mb-1">População</h3>
                      <p className="text-[#6B5B4F]">{cidade.populacao}</p>
                    </div>
                  </div>
                  
                  {/* Image Gallery */}
                  {cidade.foto && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-[#4A3F35] mb-4">
                        <i className="fas fa-images mr-2 text-[#CD853F]"></i>
                        Galeria de Imagens
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(Array.isArray(cidade.foto) ? cidade.foto : [cidade.foto]).map((foto, index) => (
                          <div key={index} className="group cursor-pointer">
                            <img
                              src={foto}
                              alt={`${cidade.nome} - Imagem ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                              onClick={() => {
                                window.open(foto, '_blank');
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* No content available */}
            {((activeTab === 'historia' && !historia) || 
              (activeTab === 'rua' && !rua) || 
              (activeTab === 'cidade' && !cidade)) && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <i className="fas fa-search text-4xl text-[#A0958A] mb-4"></i>
                </div>
                <h2 className="text-xl font-bold text-[#4A3F35] mb-2">
                  {activeTab === 'historia' ? 'História não encontrada' : 
                   activeTab === 'rua' ? 'Rua não encontrada' : 
                   'Cidade não encontrada'}
                </h2>
                <p className="text-[#A0958A] text-lg">
                  Não foi possível encontrar informações sobre {activeTab === 'historia' ? 'esta história' : activeTab === 'rua' ? 'esta rua' : 'esta cidade'}.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => window.history.back()}
                    className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded transition-colors duration-200"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RuaHistoria;