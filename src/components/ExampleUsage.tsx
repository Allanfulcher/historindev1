'use client';

import React, { useState } from 'react';
import OnboardingPopup from './OnboardingPopup';
import DonationPopup from './DonationPopup';
import DataModal from './DataModal';
import PopupCarrossel from './PopupCarrossel';
import QuizModal from './QuizModal';
import Menu from './Menu';
import Link from 'next/link';
import LegadoAfricanoCard from './LegadoAfricanoCard';
import Carousel from './Carousel';
import MapView from './MapView';

const ExampleUsage: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showCarrossel, setShowCarrossel] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showLegadoCard, setShowLegadoCard] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [selectedRuaId, setSelectedRuaId] = useState('');
  const [previewContent, setPreviewContent] = useState<{
    type: 'rua' | 'historia';
    title: string;
    description: string;
    images: string[];
    ruaId: string;
    historiaId?: string;
  } | null>(null);
  
  // Quiz state
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Sample data for DataModal
  const sampleData = [
    { id: 1, name: 'João Silva', age: 30, city: 'São Paulo' },
    { id: 2, name: 'Maria Santos', age: 25, city: 'Rio de Janeiro' },
    { id: 3, name: 'Pedro Costa', age: 35, city: 'Belo Horizonte' },
  ];

  // Sample historias data for Menu
  const sampleHistorias = [
    { id: '1', rua_id: 'rua1', title: 'História da Rua das Flores' },
    { id: '2', rua_id: 'rua2', title: 'Memórias do Centro Histórico' },
    { id: '3', rua_id: 'rua3', title: 'Lendas da Praça Central' },
  ];

  // Sample data for Carousel
  const sampleCarouselItems = [
    { id: '1', nome: 'Rua Coberta', fotos: 'https://placehold.co/200x150' },
    { id: '2', nome: 'Rua das Hortênsias', fotos: 'https://placehold.co/200x150' },
    { id: '3', nome: 'Avenida Borges de Medeiros', fotos: 'https://placehold.co/200x150' },
  ];

  // Sample data for MapView
  const sampleRuas = [
    { id: '1', nome: 'Rua Coberta', coordenadas: [-29.3681, -50.8361] as [number, number] },
    { id: '2', nome: 'Rua das Hortênsias', coordenadas: [-29.3700, -50.8380] as [number, number] },
  ];

  const sampleMapHistorias = [
    {
      id: '1',
      rua_id: '1',
      titulo: 'História da Rua Coberta',
      descricao: 'A famosa rua coberta de Gramado',
      fotos: ['https://placehold.co/100x100'],
      coordenadas: [-29.3681, -50.8361] as [number, number]
    },
  ];

  const columns = [
    { accessor: 'name', header: 'Nome' },
    { accessor: 'age', header: 'Idade' },
    { accessor: 'city', header: 'Cidade' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Historin Components Example</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setShowOnboarding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Show Onboarding Popup
        </button>

        <button
          onClick={() => setShowDonation(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Show Donation Popup
        </button>

        <button
          onClick={() => setShowDataModal(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Show Data Modal
        </button>

        <button
          onClick={() => setShowCarrossel(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Show Popup Carrossel
        </button>

        <button
          onClick={() => setShowQuiz(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Show Quiz Modal
        </button>

        <button
          onClick={() => setMenuOpen(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          Show Menu
        </button>

        <Link
          href="/sobre"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-center block"
        >
          Go to About Page
        </Link>

        <Link
          href="/adicionar-historia"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition text-center block"
        >
          Add Story Page
        </Link>

        <Link
          href="/ruas-e-historias"
          className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition text-center block"
        >
          Streets & Stories Page
        </Link>

        <button
          onClick={() => setShowLegadoCard(!showLegadoCard)}
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
        >
          Toggle Legado Card
        </button>

        <button
          onClick={() => setShowCarousel(!showCarousel)}
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          Toggle Carousel
        </button>

        <button
          onClick={() => setShowMapView(!showMapView)}
          className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition"
        >
          Toggle Map View
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Migrated Components:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>✅ OnboardingPopup - Welcome tutorial with steps</li>
          <li>✅ DonationPopup - Simple donation request popup</li>
          <li>✅ DataModal - Generic data display modal</li>
          <li>✅ PopupCarrossel - Image carousel with navigation</li>
          <li>✅ QuizModal - Interactive quiz with email collection and scoring</li>
          <li>✅ Menu - Sidebar navigation with overlay and footer</li>
          <li>✅ Sobre - About page with team info, join modal, and donation</li>
          <li>✅ AdicionarHistoria - Add story form with Formspree integration</li>
          <li>✅ RuasEHistorias - Streets and stories listing with search</li>
          <li>✅ LegadoAfricanoCard - Reusable African legacy card component</li>
          <li>✅ Carousel - Reusable carousel component for items</li>
          <li>✅ MapView - Interactive Leaflet map with markers</li>
        </ul>
      </div>

      {/* Render popups */}
      {showOnboarding && (
        <OnboardingPopup onClose={() => setShowOnboarding(false)} />
      )}
      
      {showDonation && (
        <DonationPopup onClose={() => setShowDonation(false)} />
      )}
      
      {showDataModal && (
        <DataModal
          isOpen={showDataModal}
          onClose={() => setShowDataModal(false)}
          title="Usuários"
          data={sampleData}
          columns={columns}
        />
      )}
      
      {showCarrossel && (
        <PopupCarrossel onClose={() => setShowCarrossel(false)} />
      )}
      
      {showQuiz && (
        <QuizModal
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          email={email}
          setEmail={setEmail}
          emailSubmitted={emailSubmitted}
          setEmailSubmitted={setEmailSubmitted}
          quizStarted={quizStarted}
          setQuizStarted={setQuizStarted}
        />
      )}
      
      {/* Menu Component */}
      <Menu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setShowMap={setShowMap}
        historias={sampleHistorias}
      />
      
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Map View</h3>
            <p className="mb-4">Map component would be rendered here</p>
            <button
              onClick={() => setShowMap(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close Map
            </button>
          </div>
        </div>
      )}
      
      {/* Reusable Components Section */}
      {showLegadoCard && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Legado Africano Card:</h3>
          <LegadoAfricanoCard />
        </div>
      )}
      
      {showCarousel && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Carousel Component:</h3>
          <Carousel 
            items={sampleCarouselItems} 
            onItemClick={(item) => alert(`Clicked on: ${item.nome}`)} 
            type="rua" 
          />
        </div>
      )}
      
      {showMapView && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Interactive Map View:</h3>
          <MapView 
            setSelectedRuaId={setSelectedRuaId}
            setPreviewContent={setPreviewContent}
            ruas={sampleRuas}
            historias={sampleMapHistorias}
          />
          {previewContent && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-bold">Selected: {previewContent.title}</h4>
              <p>{previewContent.description}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ExampleUsage;
