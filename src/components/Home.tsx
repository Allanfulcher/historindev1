'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiTag, FiMapPin, FiAward, FiBook, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { Historia, Rua, Cidade, PreviewContent } from '../types';
import { useLegacyData } from '../hooks/useLegacyData';
import { supabaseBrowser } from '@/lib/supabase/client';
import Header from './Header';
import Menu from './Menu';
import MapWithPreview from './MapWithPreview';
import LegadoAfricanoCard from './cards/LegadoAfricanoCard';
import FeedbackPopup from './popups/FeedbackPopup';
import QuizModal from './popups/QuizModal';
import OnboardingPopup from './popups/OnboardingPopup';
import DonationPopup from './popups/DonationPopup';
import PopupCarrossel from './popups/PopupCarrossel';
import SiteInfo from './cards/SiteInfo';
import Footer from './extra/footer';
import RecomendedStreets from './cards/RecomendedStreets';
import RecomendedHistorias from './cards/RecomendedHistorias';
import WelcomeCard from './cards/WelcomeCard';
import DonationCard from './cards/DonationCard';
import BusinessCard from './cards/BusinessCard';
import QrHuntCard from './cards/QrHuntCard';

interface HomeProps {
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onPreviewOpen: (content: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}


interface Negocio {
  id: number;
  nome: string;
  endereco: string;
  telefone?: string;
  categoria: string;
  descricao?: string;
  foto?: string;
  logo_url?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
}

const Home: React.FC<HomeProps> = ({ onPreviewOpen }) => {
  const router = useRouter();
  
  // Use legacy data hook
  const { data } = useLegacyData();
  const { historias, ruas, cidades } = data;
  
  // Fetch negocios from Supabase
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  
  // State for UI components
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [selectedRuaId, setSelectedRuaId] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string>('1'); // Default to Gramado
  const [showSteps, setShowSteps] = useState(false);
  
  // Popup states
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleRuaClick = (rua: Rua) => {
    const safeRuaId = String(rua.id);
    window.location.href = `/rua/${safeRuaId}`;
  };

  const handlePreviewContent = (content: PreviewContent) => {
    onPreviewOpen({
      type: content.type,
      title: content.title,
      content: content.description,
      image: content.images?.[0] || ''
    });
  };

  // Helper: slugify tag names for URL
  const slugify = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  // Fetch negocios from Supabase
  useEffect(() => {
    let isMounted = true;

    async function fetchNegocios() {
      try {
        const { data: negociosData, error } = await supabaseBrowser
          .from('businesses')
          .select('id, nome, endereco, telefone, categoria, descricao, foto, logo_url, website, instagram, facebook, email')
          .order('nome', { ascending: true })
          .limit(3); // Only fetch 3 for featured section

        if (error) throw error;

        if (isMounted && negociosData) {
          setNegocios(negociosData);
        }
      } catch (err) {
        console.error('Error fetching negocios:', err);
      }
    }

    fetchNegocios();

    return () => {
      isMounted = false;
    };
  }, []);

  // Get featured businesses (first 3)
  const featuredNegocios = useMemo(() => {
    return negocios.slice(0, 3);
  }, [negocios]);

  return (
    <div className="min-h-screen bg-[#f4ede0]">
      {/* Header Component */}
      <Header 
        setMenuOpen={setMenuOpen}
        setShowFeedback={setShowFeedback}
        setShowQuiz={setShowQuiz}
      />

      {/* Menu Component */}
      <Menu 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setShowMap={setShowMap}
        historias={historias}
      />

      {/* Main Content */}
      <div className="relative">
        {/* Interactive Map Section */}
        {showMap && (
          <div className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-0 py-0">
              <MapWithPreview 
                setSelectedRuaId={setSelectedRuaId}
                setPreviewContent={handlePreviewContent}
                ruas={ruas}
                historias={historias}
              />
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <WelcomeCard />
        </div>

        {/* Main Content Container */}
        <div className="max-w-4xl mx-auto px-4 pb-8">
          
          {/* Quiz CTA Banner */}
          <section className="mb-8">
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-left"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FiAward className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">Teste seus conhecimentos!</h3>
                  <p className="text-sm sm:text-base text-white/90">Faça o quiz sobre a história de Gramado e Canela</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-bold">Faça o quiz</span>
                <FiArrowRight className="w-5 h-5" />
              </div>
            </button>
          </section>

          {/* QR Hunt Card */}
          <section className="mb-8">
            <QrHuntCard />
          </section>

          {/* Categories Section */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
                <FiTag className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B4513]" />
                Explore por Categoria
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Igrejas', 'Eventos'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => router.push(`/rua/categoria/${slugify(tag)}`)}
                  className="group w-full rounded-lg bg-white border-2 border-[#F5F1EB] hover:border-[#8B4513] p-4 shadow-sm hover:shadow-md transition-all duration-200 text-left"
                  aria-label={`Ver histórias da categoria ${tag}`}
                >
                  <div className="flex flex-col gap-2">
                    <FiTag className="w-5 h-5 text-[#8B4513] group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base font-semibold text-[#4A3F35]">{tag}</span>
                    <span className="text-xs text-[#A0958A]">Ver histórias</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Recommended Streets */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
                <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B4513]" />
                Ruas Recomendadas
              </h2>
              <button
                onClick={() => router.push('/ruasehistorias')}
                className="text-sm font-medium text-[#8B4513] hover:text-[#A0522D] transition-colors"
              >
                Ver todas →
              </button>
            </div>
            <RecomendedStreets ruas={ruas} historias={historias} handleRuaClick={handleRuaClick} />
          </section>

          {/* Recommended Historias */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
                <FiBook className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B4513]" />
                Histórias Recomendadas
              </h2>
              <button
                onClick={() => router.push('/ruasehistorias')}
                className="text-sm font-medium text-[#8B4513] hover:text-[#A0522D] transition-colors"
              >
                Ver todas →
              </button>
            </div>
            <RecomendedHistorias historias={historias} />
          </section>

          {/* Businesses Section */}
          {featuredNegocios.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
                  <FiShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B4513]" />
                  Negócios Locais
                </h2>
                <button
                  onClick={() => router.push('/negocios')}
                  className="text-sm font-medium text-[#8B4513] hover:text-[#A0522D] transition-colors"
                >
                  Ver todos →
                </button>
              </div>
              <BusinessCard negocios={featuredNegocios} />
            </section>
          )}

          {/* African Legacy Card */}
          <section className="mb-10">
            <LegadoAfricanoCard />
          </section>

          {/* Platform Information */}
          <section className="mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-[#F5F1EB]">
              <SiteInfo />
            </div>
          </section>

          {/* Donation Card */}
          <section className="mb-10">
            <DonationCard />
          </section>
        </div>
      </div>

      {/* Popup Components - Conditional Rendering */}
      {showOnboarding && (
        <OnboardingPopup
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {showDonation && (
        <DonationPopup
          onClose={() => setShowDonation(false)}
        />
      )}

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

      {showPopup && (
        <PopupCarrossel
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Fixed footer for desktop */}
      <Footer />
    </div>
    
  );
};

export default Home;
