'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import Head from 'next/head';

// Sample data (in production, this would come from an API)
const sampleRuas = [
  { id: '1', nome: 'Rua Coberta', fotos: 'https://placehold.co/300x200', cidade_id: '1' },
  { id: '2', nome: 'Rua das Hortênsias', fotos: 'https://placehold.co/300x200', cidade_id: '1' },
  { id: '3', nome: 'Avenida Borges de Medeiros', fotos: 'https://placehold.co/300x200', cidade_id: '1' },
  { id: '4', nome: 'Praça Major Nicoletti', fotos: 'https://placehold.co/300x200', cidade_id: '1' }
];

const sampleHistorias = [
  { 
    id: '1', 
    rua_id: '1', 
    titulo: 'A História da Rua Coberta', 
    descricao: 'Descubra como surgiu a famosa rua coberta de Gramado e sua importância para o turismo local. Uma história fascinante de arquitetura e tradição que moldou a identidade da cidade.',
    fotos: ['https://placehold.co/400x300', 'https://placehold.co/400x300'],
    coordenadas: [-29.3681, -50.8361]
  },
  { 
    id: '2', 
    rua_id: '2', 
    titulo: 'Memórias das Hortênsias', 
    descricao: 'As flores que deram nome à rua e as histórias dos primeiros moradores da região. Uma jornada pela história botânica de Gramado e suas tradições.',
    fotos: ['https://placehold.co/400x300'],
    coordenadas: [-29.3700, -50.8380]
  },
  { 
    id: '3', 
    rua_id: '3', 
    titulo: 'Borges de Medeiros e Gramado', 
    descricao: 'A conexão histórica entre o político gaúcho e o desenvolvimento da cidade. Como a política influenciou o crescimento urbano e a formação da identidade local.',
    fotos: ['https://placehold.co/400x300'],
    coordenadas: [-29.3720, -50.8400]
  }
];

const sampleCidades = [
  { id: '1', nome: 'Gramado' },
  { id: '2', nome: 'Canela' },
  { id: '3', nome: 'Nova Petrópolis' }
];

// Simple Header Component
const Header: React.FC<{ setMenuOpen: (open: boolean) => void; setShowFeedback: (show: boolean) => void }> = ({ setMenuOpen, setShowFeedback }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Historin - Histórias de Gramado',
        text: 'Descubra as histórias de Gramado através do Historin!',
        url: window.location.href,
      }).catch((error) => console.error('Erro ao compartilhar:', error));
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#E6D3B4]">
      <div className="flex items-center">
        <Link to="/" className="mr-2">
          <div className="text-2xl font-bold text-[#3E3A33]">HISTORIN</div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowQuiz(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 flex items-center"
        >
          <i className="fas fa-question-circle mr-2"></i>
          Quiz
        </button>
        
        <button
          onClick={handleShare}
          aria-label="Compartilhar"
          className="text-2xl pr-2 hover:text-blue-600"
        >
          <i className="fas fa-share-alt"></i>
        </button>
        
        <button
          onClick={() => setShowFeedback(true)}
          aria-label="Feedback"
          className="text-2xl pr-2 hover:text-blue-600"
        >
          <i className="fas fa-comment-dots"></i>
        </button>
        
        <div
          className="text-2xl cursor-pointer hover:text-blue-600"
          onClick={() => setMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

// Simple Menu Component
const Menu: React.FC<{ menuOpen: boolean; setMenuOpen: (open: boolean) => void }> = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const handleSurpriseMe = () => {
    const randomHistoria = sampleHistorias[Math.floor(Math.random() * sampleHistorias.length)];
    navigate(`/rua/${randomHistoria.rua_id}/historia/${randomHistoria.id}`);
    setMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <nav className="space-y-4">
            <Link
              to="/"
              className="block py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-home mr-3"></i>Início
            </Link>
            <Link
              to="/sobre"
              className="block py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-info-circle mr-3"></i>Sobre
            </Link>
            <Link
              to="/ruas-e-historias"
              className="block py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-book mr-3"></i>Ruas e Histórias
            </Link>
            <Link
              to="/adicionar-historia"
              className="block py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-plus mr-3"></i>Adicionar História
            </Link>
            <Link
              to="/referencias"
              className="block py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-bookmark mr-3"></i>Referências
            </Link>
            <Link
              to="/legado-africano"
              className="block py-2 px-4 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-heart mr-3"></i>Legado Africano
            </Link>
            <button
              onClick={handleSurpriseMe}
              className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100"
            >
              <i className="fas fa-surprise mr-3"></i>Me Surpreenda!
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

// Simple Map View Component
const MapView: React.FC<{ setPreviewContent: (content: any) => void }> = ({ setPreviewContent }) => {
  const handleRuaClick = (rua: any) => {
    const historia = sampleHistorias.find(h => h.rua_id === rua.id);
    if (historia) {
      setPreviewContent({
        type: 'historia',
        title: historia.titulo,
        description: historia.descricao,
        images: historia.fotos,
        ruaId: rua.id,
        historiaId: historia.id
      });
    }
  };

  return (
    <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
      <div className="text-white text-center z-10">
        <i className="fas fa-map-marked-alt text-4xl mb-2"></i>
        <p className="text-lg font-semibold">Mapa Interativo</p>
        <p className="text-sm opacity-90">Clique nas ruas para explorar</p>
      </div>
      
      {/* Simulated map markers */}
      <div className="absolute inset-0">
        {sampleRuas.slice(0, 3).map((rua, index) => (
          <button
            key={rua.id}
            onClick={() => handleRuaClick(rua)}
            className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg hover:bg-red-600 transition-colors"
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 15}%`
            }}
            title={rua.nome}
          >
            <i className="fas fa-map-pin text-white text-xs"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

// Simple Preview Component
const Preview: React.FC<{ previewContent: any; onClose: () => void }> = ({ previewContent, onClose }) => {
  if (!previewContent) return null;

  let linkTo = '/';
  if (previewContent.type === 'rua') {
    linkTo = `/rua/${previewContent.ruaId}`;
  } else if (previewContent.type === 'historia') {
    linkTo = `/rua/${previewContent.ruaId}/historia/${previewContent.historiaId}`;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-30 max-w-md mx-auto">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{previewContent.title}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 ml-2"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{previewContent.description}</p>
      
      {previewContent.images && previewContent.images.length > 0 && (
        <img
          src={previewContent.images[0]}
          alt={previewContent.title}
          className="w-full h-32 object-cover rounded mb-3"
        />
      )}
      
      <Link
        to={linkTo}
        className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
        onClick={onClose}
      >
        Ver Detalhes
      </Link>
    </div>
  );
};

// Home Page Component
const HomePage: React.FC = () => {
  const [showSteps, setShowSteps] = useState(false);
  const [previewContent, setPreviewContent] = useState<any>(null);

  return (
    <div className="w-full relative">
      <MapView setPreviewContent={setPreviewContent} />
      
      {previewContent && (
        <Preview
          previewContent={previewContent}
          onClose={() => setPreviewContent(null)}
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
          <Link to="/ruas-e-historias" className="text-sm text-[#8A5A44] hover:underline">
            Ver tudo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sampleRuas.slice(0, 4).map((rua) => (
            <Link
              key={rua.id}
              to={`/rua/${rua.id}`}
              className="bg-white p-3 rounded-lg shadow cursor-pointer block hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={rua.fotos || 'https://placehold.co/300x200'}
                alt={rua.nome}
                className="rounded-lg mb-2 w-full h-40 object-cover"
              />
              <h3 className="font-semibold text-gray-800">{rua.nome}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Most Viewed Stories */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Histórias Mais Vistas</h2>
          <Link to="/ruas-e-historias" className="text-sm text-[#8A5A44] hover:underline">
            Ver tudo
          </Link>
        </div>

        <div className="space-y-3">
          {sampleHistorias.map((historia) => (
            <Link
              key={historia.id}
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
            </Link>
          ))}
        </div>

        {/* Platform Information */}
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
                O Historin é mais do que uma plataforma de histórias. Nossa jornada está apenas
                começando, e em breve, traremos uma experiência imersiva com{' '}
                <strong>Realidade Aumentada</strong>. QR codes serão espalhados pelas ruas de
                Gramado, permitindo a todos explorar a história de maneira interativa, conectando o
                passado e o presente de forma inovadora. Fique atento às novidades!
              </p>
              <Link
                to="/sobre"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition inline-block"
              >
                Saiba mais sobre o Historin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple placeholder pages
const AboutPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Sobre o Historin</h1>
    <p className="text-gray-700">
      O Historin é uma plataforma dedicada a preservar e compartilhar as histórias de Gramado.
      Nossa missão é conectar pessoas através das narrativas que moldaram nossa cidade.
    </p>
  </div>
);

const NotFoundPage = () => (
  <div className="p-4 text-center">
    <h1 className="text-3xl font-bold">404 - Página Não Encontrada</h1>
    <p className="mt-2 text-gray-600">Desculpe, a página que você está procurando não existe.</p>
    <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
      Voltar para Home
    </Link>
  </div>
);

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-700">Esta página está em desenvolvimento. Em breve teremos mais conteúdo!</p>
    <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
      ← Voltar ao início
    </Link>
  </div>
);

// Main App Component
const HistorinApp: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="font-roboto bg-[#F4ECE1] text-[#3E3A33] min-h-screen flex flex-col">
      <Head>
        <title>Historin - História das Cidades</title>
        <meta name="description" content="Descubra as histórias de Gramado através do Historin. Explore ruas, conheça eventos marcantes e contribua com suas próprias histórias." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Header setMenuOpen={setMenuOpen} setShowFeedback={setShowFeedback} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/ruas-e-historias" element={<PlaceholderPage title="Ruas e Histórias" />} />
        <Route path="/adicionar-historia" element={<PlaceholderPage title="Adicionar História" />} />
        <Route path="/referencias" element={<PlaceholderPage title="Referências" />} />
        <Route path="/legado-africano" element={<PlaceholderPage title="Legado Africano" />} />
        <Route path="/rua/:id" element={<PlaceholderPage title="Detalhes da Rua" />} />
        <Route path="/rua/:id/historia/:historiaId" element={<PlaceholderPage title="História Detalhada" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Fixed footer for desktop */}
      <footer className="hidden md:block fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2 text-sm z-10">
        <p>Essa aplicação funciona melhor em dispositivos móveis</p>
      </footer>
    </div>
  );
};

export default function Home() {
  return (
    <Router>
      <HistorinApp />
    </Router>
  );
}
