'use client';

import React, { useState } from 'react';
import { Historia, Rua, Cidade } from '../types';
import { useLegacyData } from '../hooks/useLegacyData';
import Header from './Header';
import Menu from './Menu';
import MapView from './MapView';
import LegadoAfricanoCard from './cards/LegadoAfricanoCard';
import FeedbackPopup from './popups/FeedbackPopup';
import QuizModal from './popups/QuizModal';
import OnboardingPopup from './popups/OnboardingPopup';
import DonationPopup from './popups/DonationPopup';
import PopupCarrossel from './popups/PopupCarrossel';
import SiteInfo from './cards/SiteInfo';
import Footer from './extra/footer';
import RecomendedStreets from './cards/RecomendedStreets';
import WelcomeCard from './cards/WelcomeCard';

interface HomeProps {
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onPreviewOpen: (content: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface PreviewContent {
  type: 'rua' | 'historia';
  title: string;
  description: string;
  images: string[];
  ruaId: string;
  historiaId?: string;
}

const Home: React.FC<HomeProps> = ({ onPreviewOpen }) => {
  // Use legacy data hook
  const { data } = useLegacyData();
  const { historias, ruas, cidades } = data;
  
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
    window.location.href = `/rua/${rua.id}`;
  };

  const handlePreviewContent = (content: PreviewContent) => {
    onPreviewOpen({
      type: content.type,
      title: content.title,
      content: content.description,
      image: content.images[0]
    });
  };

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
              <MapView 
                setSelectedRuaId={setSelectedRuaId}
                setPreviewContent={handlePreviewContent}
                ruas={ruas}
              />
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8">
          <WelcomeCard />
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Recommended Streets */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#4A3F35] mb-6">Ruas Recomendadas</h2>
            <RecomendedStreets ruas={ruas} historias={historias} handleRuaClick={handleRuaClick} />
          </section>  
        </div>

        {/* African Legacy Card */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <LegadoAfricanoCard />
        </section>

        {/* Platform Information */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <SiteInfo />
          </div>
        </section>
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
