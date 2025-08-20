'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { legacyDb } from '../../utils/legacyDb';
import { legacyHistorias, legacyRuas, legacyCidades } from '../../data/legacyData';
import type { Historia, Rua, Cidade } from '../../types';
import Header from '../Header';
import Menu from '../Menu';
import NavigationTab from './NavigationTab';
import FeedbackPopup from '../popups/FeedbackPopup';

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
  const [ruaHistorias, setRuaHistorias] = useState<Historia[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // asc = oldest first
  const focusedHistoriaRef = useRef<HTMLDivElement | null>(null);

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
      // Load all historias for this rua
      const list = legacyDb.getHistoriasByRuaId(ruaId);
      setRuaHistorias(list || []);
      
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

  // Compute sorted historias for feed
  const sortedHistorias = useMemo(() => {
    const copy = [...ruaHistorias];
    copy.sort((a, b) => {
      const ay = parseInt(a.ano || '0', 10);
      const by = parseInt(b.ano || '0', 10);
      return sortOrder === 'asc' ? ay - by : by - ay;
    });
    return copy;
  }, [ruaHistorias, sortOrder]);

  // Only auto-scroll when the historiaId changes via client navigation, not on initial load
  const prevHistoriaIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (!historiaId) return;
    // Skip on initial mount
    if (prevHistoriaIdRef.current === null) {
      prevHistoriaIdRef.current = historiaId;
      return;
    }
    if (prevHistoriaIdRef.current !== historiaId) {
      const el = document.getElementById(`historia-${historiaId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      prevHistoriaIdRef.current = historiaId;
    }
  }, [historiaId]);

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
    <div className={`min-h-screen bg-[#f4ede0] ${className || ''}`}>
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
      <main className="w-full py-6 bg-[#f4ede0]">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 bg-[#f4ede0]">
          {/* Navigation Tabs */}
          <NavigationTab activeTab={activeTab} changeTab={changeTab} />
          
          {/* Content Card */}
          <div className="bg-[#FEFCF8] rounded-xl shadow-sm p-2 sm:p-3 lg:p-0 bg-[#f4ede0]">
            {activeTab === 'historia' && (
              <>
                {/* Feed Header and Controls */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs sm:text-sm text-[#A0958A] font-medium pt-1.5">
                    {(rua?.nome || cidade?.nome) && (
                      <span className="inline-flex items-center">
                        {rua?.nome && cidade?.nome && (
                          <span className="mx-2 text-[#D6C7B6]">•</span>
                        )}
                        {cidade?.nome && (
                          <span className="inline-flex items-center">
                            <i className="fas fa-map-marker-alt mr-2 text-[#CD853F]"></i>
                            <span>{cidade.nome}</span>
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <label htmlFor="sortOrder" className="text-sm text-[#6B5B4F]">Ordenar:</label>
                    <select
                      id="sortOrder"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                      className="text-sm bg-[#F5F1EB] text-[#4A3F35] border border-[#E6D3B4] rounded px-2 py-1"
                    >
                       <option value="asc">Antigas</option>
                      <option value="desc">Recentes</option> 
                    </select>
                  </div> */}
                </div>

                {/* Prominent Rua Title */}
                {rua?.nome && (
                  <div className="mb-3 lg:px-6 xl:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-normal text-[#4A3F35]">
                      {rua.nome}
                    </h1>
                  </div>
                )}
                <div className="h-px bg-[#EADCCD] mb-5 lg:mx-6 xl:mx-8"></div>

                {/* Historia Feed */}
                <div className="flex flex-col gap-8 bg-[#f4ede0]">
                  {sortedHistorias.length === 0 && (
                    <div className="text-center py-8 text-[#6B5B4F]">Nenhuma história para esta rua.</div>
                  )}

                  {sortedHistorias.map((h) => (
                    <div
                      key={h.id}
                      id={`historia-${h.id}`}
                      className="rounded-xl bg-[#FFFDF9] odd:bg-[#FEFBF5] ring-1 ring-[#E6D3B4]/60 shadow-sm p-5 transition-shadow hover:shadow-md"
                    >
                      {h.ano && (
                        <div className="mb-2 text-[#4A3F35]">
                          <span className="inline-flex items-center gap-2">
                            <i className="fas fa-calendar-alt text-[#CD853F]"></i>
                            <span className="text-3xl sm:text-4xl font-extrabold leading-tight">{h.ano}</span>
                          </span>
                        </div>
                      )}
                      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#4A3F35]">{h.titulo}</h2>

                      {/* Divider between header (year/title) and content */}
                      <div className="h-px bg-[#EADCCD] mb-4"></div>

                      {/* Scrollable text container first */}
                      <div className="prose max-w-none bg-[#FDFBF7] border border-[#F0E8DC] border-l-4 border-l-[#CD853F] rounded-lg p-4 max-h-64 overflow-y-auto mb-4 shadow-inner">
                        <p className="text-[#6B5B4F] leading-relaxed text-base">{h.descricao}</p>
                      </div>

                      {/* Divider between text and images */}
                      <div className="h-px bg-[#F0E8DC] mb-4"></div>

                      {/* Images below */}
                      {h.fotos && h.fotos.length > 0 && (
                        <div className="mt-2">
                          <h3 className="text-lg font-medium text-[#4A3F35] mb-3">
                            <i className="fas fa-images mr-2 text-[#CD853F]"></i>
                            Imagens
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {h.fotos.map((foto, index) => (
                              <div key={index} className="group cursor-pointer">
                                <img
                                  src={foto}
                                  alt={`${h.titulo} - Imagem ${index + 1}`}
                                  className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                                  onClick={() => window.open(foto, '_blank')}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'rua' && rua && (
              <>
                {/* Rua Content */}
                <div className="mb-6 p-4 sm:p-6 lg:p-8">
                  {/* Breadcrumb line (match História) */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-xs sm:text-sm text-[#A0958A] font-medium pt-1.5">
                      {(rua?.nome || cidade?.nome) && (
                        <span className="inline-flex items-center">
                          {rua?.nome && cidade?.nome && (
                            <span className="mx-2 text-[#D6C7B6]">•</span>
                          )}
                          {cidade?.nome && (
                            <span className="inline-flex items-center">
                              <i className="fas fa-map-marker-alt mr-2 text-[#CD853F]"></i>
                              <span>{cidade.nome}</span>
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prominent Rua Title (match História) */}
                  {rua?.nome && (
                    <div className="mb-3 lg:px-6 xl:px-8">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-normal text-[#4A3F35]">
                        {rua.nome}
                      </h1>
                    </div>
                  )}
                  <div className="h-px bg-[#EADCCD] mb-5 lg:mx-6 xl:mx-8"></div>

                  <div className="prose max-w-none bg-[#FDFBF7] border border-[#F0E8DC] border-l-4 border-l-[#CD853F] rounded-lg p-6 mb-8 shadow-inner">
                    <p className="text-[#6B5B4F] leading-relaxed text-lg">{rua.descricao}</p>
                  </div>
                  
                  {/* Image Gallery */}
                  {rua.fotos && (
                    <div className="mt-8">
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
                <div className="mb-6 p-4 sm:p-6 lg:p-8">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4A3F35]">{cidade.nome}</h1>
                  
                  <div className="prose max-w-none bg-[#FDFBF7] border border-[#F0E8DC] border-l-4 border-l-[#CD853F] rounded-lg p-6 mb-8 shadow-inner">
                    <p className="text-[#6B5B4F] leading-relaxed text-lg">{cidade.descricao}</p>
                  </div>
                  
                  <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#F5F1EB] rounded-lg">
                      <h3 className="text-base font-medium text-[#4A3F35] mb-2">Estado</h3>
                      <p className="text-[#6B5B4F] text-lg">{cidade.estado}</p>
                    </div>
                    <div className="p-6 bg-[#F5F1EB] rounded-lg">
                      <h3 className="text-base font-medium text-[#4A3F35] mb-2">População</h3>
                      <p className="text-[#6B5B4F] text-lg">{cidade.populacao}</p>
                    </div>
                  </div>
                  
                  {/* Image Gallery */}
                  {cidade.foto && (
                    <div className="mt-8">
                      <h3 className="text-xl font-medium text-[#4A3F35] mb-6">
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
      {showFeedback && (
        <FeedbackPopup
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
};

export default RuaHistoria;