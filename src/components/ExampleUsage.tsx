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
  const [showCityCarousel, setShowCityCarousel] = useState(false);
  const [showRuaCarousel, setShowRuaCarousel] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState('1');
  const [showNotFound, setShowNotFound] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
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
    { id: '3', nome: 'Avenida Borges de Medeiros', coordenadas: [-29.3720, -50.8400] as [number, number] },
  ];

  // Sample data for CityCarousel
  const sampleCidades = [
    { id: '1', nome: 'Gramado' },
    { id: '2', nome: 'Canela' },
    { id: '3', nome: 'Nova Petrópolis' },
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

        {/* Newly Migrated Components (13-19) */}
        <button
          onClick={() => setPreviewContent({
            type: 'rua',
            title: 'Rua Coberta',
            description: 'A famosa rua coberta de Gramado com sua arquitetura única e história fascinante.',
            images: ['https://placehold.co/400x200'],
            ruaId: '1'
          })}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          Show Preview Component
        </button>

        <Link
          href="/referencias"
          className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600 transition text-center block"
        >
          Referencias Page
        </Link>

        <Link
          href="/legado-africano"
          className="bg-stone-500 text-white px-4 py-2 rounded hover:bg-stone-600 transition text-center block"
        >
          Legado Africano Page
        </Link>

        <Link
          href="/rua/1"
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition text-center block"
        >
          RuaHistoria Page
        </Link>

        <button
          onClick={() => setShowCityCarousel(!showCityCarousel)}
          className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 transition"
        >
          Toggle City Carousel
        </button>

        <button
          onClick={() => setShowRuaCarousel(!showRuaCarousel)}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
        >
          Toggle Rua Carousel
        </button>

        <button
          onClick={() => setShowNotFound(!showNotFound)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Show NotFound (404)
        </button>

        <button
          onClick={() => setShowFeedbackPopup(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Show Feedback Popup
        </button>

        <button
          onClick={() => setShowHeader(!showHeader)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Toggle Header
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
          <li>✅ <strong>Preview</strong> - Content preview cards with dynamic links</li>
          <li>✅ <strong>CityCarousel</strong> - City selector with auto-scroll</li>
          <li>✅ <strong>RuaCarousel</strong> - Street selector carousel</li>
          <li>✅ <strong>HistoriaContent</strong> - Complex story display with tabs/galleries</li>
          <li>✅ <strong>Referencias</strong> - References page with collapsible sections</li>
          <li>✅ <strong>LegadoAfricano</strong> - African legacy historical content page</li>
          <li>✅ <strong>RuaHistoria</strong> - Main page orchestrator with routing</li>
          <li>✅ <strong>NotFound</strong> - 404 error page with navigation</li>
          <li>✅ <strong>FeedbackPopup</strong> - User feedback form with star rating</li>
          <li>✅ <strong>Header</strong> - Top header with logo and action buttons</li>
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
      
      {/* Newly Migrated Components (13-19) */}
      {previewContent && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Preview Component:</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg">{previewContent.title}</h4>
              <button
                onClick={() => setPreviewContent(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-3">{previewContent.description}</p>
            {previewContent.images && previewContent.images.length > 0 && (
              <img 
                src={previewContent.images[0]} 
                alt={previewContent.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <div className="flex gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Type: {previewContent.type}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                ID: {previewContent.ruaId}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {showCityCarousel && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">City Carousel Component:</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {sampleCidades.map((cidade) => (
                <button
                  key={cidade.id}
                  onClick={() => setSelectedCityId(cidade.id)}
                  className={`px-4 py-2 rounded whitespace-nowrap transition ${
                    selectedCityId === cidade.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cidade.nome}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Selected City: {sampleCidades.find(c => c.id === selectedCityId)?.nome}
            </p>
          </div>
        </div>
      )}
      
      {showRuaCarousel && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Rua Carousel Component:</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {sampleRuas.map((rua) => (
                <button
                  key={rua.id}
                  onClick={() => setSelectedRuaId(rua.id)}
                  className={`px-4 py-2 rounded whitespace-nowrap transition ${
                    selectedRuaId === rua.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rua.nome}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Selected Rua: {sampleRuas.find(r => r.id === selectedRuaId)?.nome || 'None'}
            </p>
          </div>
        </div>
      )}
      
      {/* Components 20-22 */}
      {showNotFound && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">NotFound (404) Component:</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="p-4">
              <h1 className="text-3xl font-bold text-center">404 - Página Não Encontrada</h1>
              <p className="text-center">Desculpe, a página que você está procurando não existe.</p>
              <div className="flex justify-center mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Voltar para Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showFeedbackPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowFeedbackPopup(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">Envie seu Feedback</h3>
            <p className="text-gray-600 text-center mb-4">
              Estamos em fase inicial da nossa plataforma e sua opinião é muito importante para nós!
            </p>
            <div className="mb-4 text-center">
              <label className="block text-gray-700 text-sm font-bold mb-2">Avaliação:</label>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" className="text-3xl text-gray-300">
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Seu nome (opcional)"
              />
            </div>
            <div className="mb-4">
              <textarea
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                rows={3}
                placeholder="Escreva seu feedback"
              ></textarea>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
              Enviar Feedback
            </button>
          </div>
        </div>
      )}
      
      {showHeader && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Header Component:</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <header className="flex justify-between items-center p-4 bg-[#E6D3B4]">
              <div className="flex items-center">
                <div className="mr-2">
                  <div className="text-2xl font-bold">HISTORIN</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                  <i className="fas fa-question-circle mr-2"></i>
                  Quiz
                </button>
                <button className="text-2xl pr-2 hover:text-blue-600">
                  <i className="fas fa-share-alt"></i>
                </button>
                <button className="text-2xl pr-2 hover:text-blue-600">
                  <i className="fas fa-comment-dots"></i>
                </button>
                <div className="text-2xl cursor-pointer hover:text-blue-600">
                  <i className="fas fa-bars"></i>
                </div>
              </div>
            </header>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExampleUsage;
