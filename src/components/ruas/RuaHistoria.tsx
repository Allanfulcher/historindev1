'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { legacyDb } from '../../utils/legacyDb';
import { legacyHistorias, legacyRuas, legacyCidades } from '../../data/legacyData';
import type { Historia, Rua, Cidade } from '../../types';
import Header from '../Header';
import Menu from '../Menu';
import NavigationTab from './NavigationTab';
import FeedbackPopup from '../popups/FeedbackPopup';
import CitySelector from './CitySelector';
import RuaSelector from './RuaSelector';
import LoadingSpinner from './LoadingSpinner';
import ValidationError from './ValidationError';
import HistoriaTab from './HistoriaTab';
import RuaTab from './RuaTab';
import CidadeTab from './CidadeTab';
import NotFoundContent from './NotFoundContent';
import YearNavigator from './YearNavigator';

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
      // Set selected city based on rua's city
      if (foundRua?.cidade_id) {
        setSelectedCityId(foundRua.cidade_id);
      }
      // Load all historias for this rua
      const list = legacyDb.getHistoriasByRuaId(ruaId);
      setRuaHistorias(list || []);
      
      if (foundRua?.cidade_id) {
        const foundCidade = legacyDb.getCidadeById(foundRua.cidade_id.toString());
        setCidade(foundCidade || null);
      }
    }

    // Remove URL-based historia loading - now handled via props-based auto-scroll
    setIsLoading(false);
  }, [ruaId, router]);

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
        historias={legacyDb.getHistorias()}
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
                ruas={legacyDb.getRuas()}
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
              />
            )}

            {activeTab === 'rua' && rua && (
              <RuaTab rua={rua} cidade={cidade} />
            )}

            {activeTab === 'cidade' && cidade && (
              <CidadeTab cidade={cidade} />
            )}

            {/* No content available */}
            {((activeTab === 'historia' && !historia) || 
              (activeTab === 'rua' && !rua) || 
              (activeTab === 'cidade' && !cidade)) && (
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
    </div>
  );
};

export default RuaHistoria;