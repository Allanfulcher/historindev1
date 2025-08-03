'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppData, useUI } from '../contexts/AppContext';
import { Rua, Historia, PreviewContent } from '../types';

// App Component - Main application component that works with Next.js App Router
// This component handles the main application UI using modern React patterns
const App: React.FC = () => {
  // Use context for state management
  const { data } = useAppData();
  const {
    menuOpen, setMenuOpen,
    showMap, setShowMap,
    previewContent, setPreviewContent,
    selectedRuaId, setSelectedRuaId,
    showSteps, setShowSteps,
    showOnboarding, setShowOnboarding,
    showDonation, setShowDonation,
    showFeedback, setShowFeedback,
    showPopup, setShowPopup,
  } = useUI();
  
  // Next.js navigation hooks
  const router = useRouter();
  const pathname = usePathname();
  const prevLocation = useRef({ pathname, search: '' });
  
  // Popup tracking reference
  const popupsRef = useRef({
    showOnboarding: false,
    showPopup: false,
    showFeedback: false,
    showDonation: false,
  });

  // Update popup reference when states change
  useEffect(() => {
    popupsRef.current = {
      showOnboarding,
      showPopup,
      showFeedback,
      showDonation,
    };
  }, [showOnboarding, showPopup, showFeedback, showDonation]);

  // Get data from context instead of window globals
  const sampleRuas: Rua[] = data.ruas;
  const sampleHistorias: Historia[] = data.historias;

  const shouldShowPopup = (): boolean => {
    return Math.random() > 0.7; // 30% chance for demo purposes
  };

  // Preview close handler
  const handlePreviewClose = (): void => {
    setPreviewContent(null);
  };

  // Onboarding popup timer (first visit)
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      const onboardingTimer = setTimeout(() => {
        setShowOnboarding(true);
        localStorage.setItem('hasVisited', 'true');
      }, 2000); // 2 seconds after loading

      return () => clearTimeout(onboardingTimer);
    }
  }, []);

  // Donation popup timer (3 minutes)
  useEffect(() => {
    const donationTimer = setTimeout(() => {
      if (
        !popupsRef.current.showOnboarding &&
        !popupsRef.current.showPopup &&
        !popupsRef.current.showFeedback
      ) {
        setShowDonation(true);
      }
    }, 180000); // 3 minutes

    return () => clearTimeout(donationTimer);
  }, []);

  // Carousel popup timer (1 minute)
  useEffect(() => {
    const carouselTimer = setTimeout(() => {
      if (shouldShowPopup() && 
          !popupsRef.current.showOnboarding &&
          !popupsRef.current.showDonation &&
          !popupsRef.current.showFeedback) {
        setShowPopup(true);
      }
    }, 60000); // 1 minute

    return () => clearTimeout(carouselTimer);
  }, []);

  // Feedback popup timer (5 minutes)
  useEffect(() => {
    const feedbackTimer = setTimeout(() => {
      if (!popupsRef.current.showOnboarding &&
          !popupsRef.current.showPopup &&
          !popupsRef.current.showDonation) {
        setShowFeedback(true);
      }
    }, 300000); // 5 minutes

    return () => clearTimeout(feedbackTimer);
  }, []);

  // SEO and meta tag management based on current route
  useEffect(() => {
    const updateMetaTags = () => {
      const path = location.pathname;
      let title = 'Historin - Descubra as Histórias de Gramado';
      let description = 'Explore as fascinantes histórias das ruas de Gramado através de uma experiência interativa e imersiva.';

      if (path.includes('/sobre')) {
        title = 'Sobre - Historin';
        description = 'Conheça a equipe e a missão do Historin, plataforma dedicada às histórias de Gramado.';
      } else if (path.includes('/referencias')) {
        title = 'Referências - Historin';
        description = 'Fontes e referências utilizadas no projeto Historin.';
      } else if (path.includes('/legado-africano')) {
        title = 'Legado Africano - Historin';
        description = 'Descubra a rica herança africana na história de Gramado.';
      } else if (path.includes('/ruas-e-historias')) {
        title = 'Ruas e Histórias - Historin';
        description = 'Explore todas as ruas e suas histórias em Gramado.';
      }

      document.title = title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    };

    updateMetaTags();
  }, [location.pathname]);

  // Google Analytics page view tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  return (
    <div className="font-roboto bg-[#F4ECE1] text-[#3E3A33] min-h-screen flex flex-col">
      {/* Header Component */}
      {window.Header && (
        <window.Header 
          setMenuOpen={setMenuOpen} 
          setShowFeedback={setShowFeedback} 
        />
      )}

      {/* Menu Component */}
      {window.Menu && (
        <window.Menu 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative">
        {/* Home Page Content */}
        {location.pathname === '/' && showMap && (
          <div className="w-full relative">
            {/* Map View Component */}
            {window.MapView && (
              <window.MapView setPreviewContent={setPreviewContent} />
            )}
            
            {/* Preview Component */}
            {window.Preview && previewContent && (
              <window.Preview
                previewContent={previewContent}
                onClose={handlePreviewClose}
              />
            )}

            {/* Welcome Introduction */}
            <div className="introduction p-4">
              <h2 className="text-xl font-bold mb-2">Bem-vindo ao Historin!</h2>
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center justify-between mt-2 ml-auto text-blue-600 hover:text-blue-800"
              >
                <span>Ver mais</span>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    showSteps ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showSteps && (
                <div className="steps mt-4 space-y-3">
                  <div className="step flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      1
                    </span>
                    <p className="text-gray-700">
                      Explore histórias pela geografia e descubra a história por trás dos lugares!
                    </p>
                  </div>
                  <div className="step flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      2
                    </span>
                    <p className="text-gray-700">
                      Navegue pela linha do tempo para reviver os eventos que moldaram nossa cidade!
                    </p>
                  </div>
                  <div className="step flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      3
                    </span>
                    <p className="text-gray-700">
                      Contribua com suas histórias e experiências e aproveite a jornada!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Recommended Streets */}
            <div className="px-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Ruas Recomendadas</h2>
                {window.ReactRouterDOM && (
                  <window.ReactRouterDOM.Link 
                    to="/ruas-e-historias" 
                    className="text-sm text-[#8A5A44] hover:underline"
                  >
                    Ver tudo
                  </window.ReactRouterDOM.Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleRuas.slice(0, 4).map((rua) => (
                  <div key={rua.id}>
                    {window.ReactRouterDOM ? (
                      <window.ReactRouterDOM.Link
                        to={`/rua/${rua.id}`}
                        className="bg-white p-3 rounded-lg shadow cursor-pointer block hover:shadow-lg transition-shadow duration-300"
                      >
                        <img
                          src={rua.fotos || 'https://placehold.co/300x200'}
                          alt={rua.nome}
                          className="rounded-lg mb-2 w-full h-40 object-cover"
                        />
                        <h3 className="font-semibold text-gray-800">{rua.nome}</h3>
                      </window.ReactRouterDOM.Link>
                    ) : (
                      <div className="bg-white p-3 rounded-lg shadow">
                        <img
                          src={rua.fotos || 'https://placehold.co/300x200'}
                          alt={rua.nome}
                          className="rounded-lg mb-2 w-full h-40 object-cover"
                        />
                        <h3 className="font-semibold text-gray-800">{rua.nome}</h3>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Most Viewed Stories */}
            <div className="px-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Histórias Mais Vistas</h2>
                {window.ReactRouterDOM && (
                  <window.ReactRouterDOM.Link 
                    to="/ruas-e-historias" 
                    className="text-sm text-[#8A5A44] hover:underline"
                  >
                    Ver tudo
                  </window.ReactRouterDOM.Link>
                )}
              </div>

              <div className="space-y-3">
                {sampleHistorias.map((historia) => (
                  <div key={historia.id}>
                    {window.ReactRouterDOM ? (
                      <window.ReactRouterDOM.Link
                        to={`/rua/${historia.rua_id}/historia/${historia.id}`}
                        className="bg-white p-3 rounded-lg shadow flex items-center cursor-pointer block hover:shadow-lg transition-shadow duration-300"
                      >
                        <img
                          src={historia.fotos[0] || 'https://placehold.co/100x100'}
                          alt={historia.titulo}
                          className="rounded-lg mr-3 w-20 h-20 object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{historia.titulo}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {historia.descricao.slice(0, 80)}...
                          </p>
                        </div>
                      </window.ReactRouterDOM.Link>
                    ) : (
                      <div className="bg-white p-3 rounded-lg shadow flex items-center">
                        <img
                          src={historia.fotos[0] || 'https://placehold.co/100x100'}
                          alt={historia.titulo}
                          className="rounded-lg mr-3 w-20 h-20 object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{historia.titulo}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {historia.descricao.slice(0, 80)}...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* African legacy card */}
              {window.LegadoAfricanoCard && (
                <window.LegadoAfricanoCard className="mt-4" />
              )}

              {/* Platform information section */}
              <div className="mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
                  <img
                    loading="lazy"
                    src="https://i.imgur.com/nav9mZa.jpeg"
                    alt="Informações sobre a plataforma"
                    className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">Estamos só começando!</h2>
                    <p className="text-gray-700 mb-4">
                      O Historin é mais do que uma plataforma de histórias. Nossa jornada está apenas começando, e em breve, traremos uma experiência imersiva com{' '}
                      <strong>Realidade Aumentada</strong>
                      . QR codes serão espalhados pelas ruas de Gramado, permitindo a todos explorar a história de maneira interativa, conectando o passado e o presente de forma inovadora. Fique atento às novidades!
                    </p>
                    {window.ReactRouterDOM && (
                      <window.ReactRouterDOM.Link
                        to="/sobre"
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition inline-block"
                      >
                        Saiba mais sobre o Historin
                      </window.ReactRouterDOM.Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alternative view when map is hidden or other routes */}
        {(!showMap || location.pathname !== '/') && window.RuaHistoria && (
          <window.RuaHistoria />
        )}

        {/* 404 Not Found for unmatched routes */}
        {location.pathname !== '/' && !location.pathname.includes('/rua') && !location.pathname.includes('/sobre') && 
         !location.pathname.includes('/referencias') && !location.pathname.includes('/legado-africano') && 
         !location.pathname.includes('/ruas-e-historias') && !location.pathname.includes('/adicionar-historia') && 
         window.NotFound && (
          <window.NotFound />
        )}
      </main>

      {/* Popup Components */}
      {window.OnboardingPopup && (
        <window.OnboardingPopup
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {window.DonationPopup && (
        <window.DonationPopup
          isOpen={showDonation}
          onClose={() => setShowDonation(false)}
        />
      )}

      {window.FeedbackPopup && (
        <window.FeedbackPopup
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      )}

      {window.PopupCarrossel && (
        <window.PopupCarrossel
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Fixed footer for desktop */}
      <footer className="hidden md:block fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2 text-sm z-10">
        <p>Essa aplicação funciona melhor em dispositivos móveis</p>
      </footer>
    </div>
  );
};

// Export to global window object for legacy compatibility
if (typeof window !== 'undefined') {
  (window as any).App = App;
}

export default App;
