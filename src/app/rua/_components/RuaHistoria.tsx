'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { Historia, Rua, Cidade } from '../../../types';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import NavigationTab from './NavigationTab';
import FeedbackPopup from '../../../components/popups/FeedbackPopup';
import CitySelector from './CitySelector';
import RuaSelector from './RuaSelector';
import LoadingSpinner from './LoadingSpinner';
import ValidationError from './ValidationError';
import HistoriaTab from './HistoriaTab';
import RuaTab from './RuaTab';
import CidadeTab from './CidadeTab';
import NotFoundContent from './NotFoundContent';
import YearNavigator from './YearNavigator';
import QuizModal from '../../../components/popups/QuizModal';
import { AdQuizPopup } from '../../../components/ui';
import { popupAdService, type PopupAd } from '../../../services/popupAd.service';

interface RuaHistoriaProps {
  className?: string;
}

const RuaHistoria: React.FC<RuaHistoriaProps> = ({ className }) => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ruaId = Array.isArray(params?.ruaId) ? params.ruaId[0] : params?.ruaId;
  const historiaId = Array.isArray(params?.historiaId) ? params.historiaId[0] : params?.historiaId;
  const shouldScroll = searchParams.get('scroll') === 'true';
  
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
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string>('1'); // Default to Gramado
  const [hasAutoSwitchedTab, setHasAutoSwitchedTab] = useState(false);
  const [allRuas, setAllRuas] = useState<Rua[]>([]);
  const [allHistorias, setAllHistorias] = useState<Historia[]>([]);
  
  // QR Code popup state
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [popupAd, setPopupAd] = useState<PopupAd | null>(null);
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);

        // Load data if IDs are provided
        if (ruaId) {
          // Fetch rua from Supabase
          const { data: foundRua, error: ruaError } = await supabaseBrowser
            .from('streets')
            .select('id, nome, fotos, cidade_id, descricao')
            .eq('id', ruaId)
            .single();

          if (ruaError) throw ruaError;

          if (!isMounted) return;

          if (foundRua) {
            const normalizedRua: Rua = {
              id: String(foundRua.id),
              nome: foundRua.nome || '',
              fotos: foundRua.fotos || '',
              cidade_id: foundRua.cidade_id ? String(foundRua.cidade_id) : undefined,
              descricao: foundRua.descricao || undefined,
            };
            setRua(normalizedRua);

            // Set selected city based on rua's city
            if (foundRua.cidade_id) {
              setSelectedCityId(String(foundRua.cidade_id));
            }

            // Fetch cidade if available
            if (foundRua.cidade_id) {
              const { data: foundCidade } = await supabaseBrowser
                .from('cities')
                .select('id, nome, estado, populacao, descricao, foto')
                .eq('id', foundRua.cidade_id)
                .single();

              if (foundCidade && isMounted) {
                const normalizedCidade: Cidade = {
                  id: String(foundCidade.id),
                  nome: foundCidade.nome || '',
                  estado: foundCidade.estado || '',
                  populacao: foundCidade.populacao || '',
                  descricao: foundCidade.descricao || undefined,
                  foto: foundCidade.foto || undefined,
                };
                setCidade(normalizedCidade);
              }
            }
          }

          // Load all historias for this rua
          const { data: historiasData, error: historiasError } = await supabaseBrowser
            .from('stories')
            .select('id, rua_id, titulo, descricao, fotos, lat, lng, ano, criador, tags, negocio_id')
            .eq('rua_id', ruaId);

          if (historiasError) throw historiasError;

          if (!isMounted) return;

          const normalizedHistorias: Historia[] = (historiasData || []).map((h: any) => ({
            id: String(h.id),
            rua_id: String(h.rua_id),
            titulo: h.titulo || '',
            descricao: h.descricao || '',
            fotos: h.fotos || [],
            coordenadas: (h.lat && h.lng) ? [h.lat, h.lng] : undefined,
            ano: h.ano ? String(h.ano) : undefined,
            criador: h.criador || undefined,
            tags: h.tags || undefined,
            orgId: h.negocio_id || undefined,
          }));

          setRuaHistorias(normalizedHistorias);
        }

        // Fetch all ruas for the selector
        const { data: ruasData } = await supabaseBrowser
          .from('streets')
          .select('id, nome, fotos, cidade_id, descricao');

        if (ruasData && isMounted) {
          const normalizedRuas: Rua[] = ruasData.map((r: any) => ({
            id: String(r.id),
            nome: r.nome || '',
            fotos: r.fotos || '',
            cidade_id: r.cidade_id ? String(r.cidade_id) : undefined,
            descricao: r.descricao || undefined,
          }));
          setAllRuas(normalizedRuas);
        }

        // Fetch all historias for the menu
        const { data: allHistoriasData } = await supabaseBrowser
          .from('stories')
          .select('id, rua_id, titulo, descricao, fotos, lat, lng, ano, criador, tags, negocio_id');

        if (allHistoriasData && isMounted) {
          const normalizedAllHistorias: Historia[] = allHistoriasData.map((h: any) => ({
            id: String(h.id),
            rua_id: String(h.rua_id),
            titulo: h.titulo || '',
            descricao: h.descricao || '',
            fotos: h.fotos || [],
            coordenadas: (h.lat && h.lng) ? [h.lat, h.lng] : undefined,
            ano: h.ano ? String(h.ano) : undefined,
            criador: h.criador || undefined,
            tags: h.tags || undefined,
            orgId: h.negocio_id || undefined,
          }));
          setAllHistorias(normalizedAllHistorias);
        }
      } catch (error) {
        console.error('Error loading data from Supabase:', error);
        if (isMounted) {
          setValidationError('Erro ao carregar dados. Tente novamente mais tarde.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [ruaId, router]);

  // Check for QR code parameters, load ad, show popup, then clean URL
  useEffect(() => {
    // Debug logging
    console.log('🔍 RuaHistoria UTM check:', {
      utmSource,
      utmMedium,
      utmCampaign,
      hasRua: !!rua,
      ruaName: rua?.nome,
      ruaId
    });
    
    if (utmMedium === 'qr' && rua && ruaId) {
      console.log('✅ QR Code detected, loading ad...');
      
      // Load popup ad for this street
      const loadAd = async () => {
        const ad = await popupAdService.getAdForStreet(Number(ruaId));
        if (ad) {
          console.log('📢 Ad loaded:', ad.business_name);
          setPopupAd(ad);
        } else {
          console.log('⚠️ No ad found for this street');
        }
        
        // Show popup after loading (or show without ad if none found)
        setTimeout(() => {
          setShowQrPopup(true);
        }, 500);
      };
      
      loadAd();
      
      // Clean UTM parameters from URL after capturing them (like scroll=true)
      const cleanTimer = setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete('utm_source');
        url.searchParams.delete('utm_medium');
        url.searchParams.delete('utm_campaign');
        window.history.replaceState({}, '', url.toString());
      }, 1500);
      
      return () => {
        clearTimeout(cleanTimer);
      };
    }
  }, [utmMedium, rua, ruaId]);

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

  // URL query parameter-based auto-scroll - only scrolls when ?scroll=true is present
  useEffect(() => {
    if (!shouldScroll || !historiaId) return;
    
    const targetHistoria = sortedHistorias.find(h => h.id === historiaId);
    if (!targetHistoria) return;
    
    // Switch to historia tab if not already active
    if (activeTab !== 'historia') {
      setActiveTab('historia');
    }

    const headerOffset = 80; // approximate fixed header height
    const tryScroll = () => {
      const el = document.getElementById(`historia-${historiaId}`);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      return true;
    };

    if (!tryScroll()) {
      let attempts = 0;
      const timer = setInterval(() => {
        attempts += 1;
        if (tryScroll() || attempts >= 3) {
          clearInterval(timer);
        }
      }, 150);
      
      return () => clearInterval(timer);
    }

  }, [shouldScroll, historiaId, sortedHistorias, activeTab]);

  const changeTab = (tab: 'historia' | 'rua' | 'cidade') => {
    // Simply change the tab - URL cleanup is handled in NavigationTab component
    setActiveTab(tab);
  };

  // Handle year selection from YearNavigator
  const handleYearSelect = useCallback((year: number) => {
    // Switch to historia tab if not already active
    if (activeTab !== 'historia') {
      setActiveTab('historia');
    }

    // Find the first historia from the selected year
    const firstHistoriaOfYear = sortedHistorias.find(h => 
      parseInt(h.ano || '0', 10) === year
    );

    if (firstHistoriaOfYear) {
      // Scroll to the first historia of that year
      const headerOffset = 80;
      const tryScroll = (): boolean => {
        const el = document.getElementById(`historia-${firstHistoriaOfYear.id}`);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const y = rect.top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        return true;
      };

      // Try up to 3 times to account for async rendering
      if (!tryScroll()) {
        let attempts = 0;
        const timer = setInterval(() => {
          attempts += 1;
          if (tryScroll() || attempts >= 3) {
            clearInterval(timer);
          }
        }, 150);
      }
    }
  }, [activeTab, sortedHistorias]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (validationError) {
    return <ValidationError error={validationError} />;
  }

  return (
    <div className={`min-h-screen bg-[#f4ede0] ${className || ''}`}>
      {/* Header */}
      <Header 
        setShowQuiz={setShowQuiz}
        setMenuOpen={setMenuOpen}
        setShowFeedback={setShowFeedback}
      />

      {/* Menu */}
      <Menu 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        historias={allHistorias}
      />

      {/* Year Navigator - only show on historia tab */}
      {activeTab === 'historia' && ruaHistorias.length > 0 && (
        <YearNavigator 
          historias={ruaHistorias}
          onYearSelect={handleYearSelect}
        />
      )}

      {/* Main Content */}
      <main className="w-full py-6 bg-[#f4ede0]">
        <div className="w-full max-w-4xl mx-auto px-0 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 bg-[#f4ede0]">
          {/* Selectors Section */}
          <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CitySelector 
                selectedCityId={selectedCityId}
                onCityChange={setSelectedCityId}
              />
              <RuaSelector 
                ruas={allRuas}
                selectedRuaId={ruaId || ''}
                selectedCityId={selectedCityId}
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <NavigationTab activeTab={activeTab} changeTab={changeTab} />
          
          {/* Content Card */}
          <div className="bg-[#FEFCF8] rounded-xl shadow-sm p-0 sm:p-3 lg:p-0 bg-[#f4ede0]">
            {activeTab === 'historia' && (
              <HistoriaTab 
                historias={sortedHistorias}
                rua={rua}
                cidade={cidade}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                isReady={!isLoading}
              />
            )}

            {activeTab === 'rua' && rua && (
              <RuaTab rua={rua} cidade={cidade} />
            )}

            {activeTab === 'cidade' && cidade && (
              <CidadeTab cidade={cidade} />
            )}

            {/* No content available */}
            {(((activeTab === 'historia') && !isLoading && sortedHistorias.length === 0) ||
              ((activeTab === 'rua') && !rua) ||
              ((activeTab === 'cidade') && !cidade)) && (
              <NotFoundContent type={activeTab} />
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
      {showQuiz && (
        <QuizModal
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* QR Code Ad Popup */}
      {popupAd && (
        <AdQuizPopup
          isOpen={showQrPopup}
          onClose={() => setShowQrPopup(false)}
          businessName={popupAd.business_name}
          title={popupAd.title}
          description={popupAd.description}
          question={popupAd.question}
          answers={popupAd.answers}
          imageUrl={popupAd.image_url}
          phone={popupAd.phone}
          email={popupAd.email}
          website={popupAd.website}
        />
      )}
    </div>
  );
};

export default RuaHistoria;