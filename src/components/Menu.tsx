'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setShowMap?: (show: boolean) => void;
  historias?: Array<{ id: string; rua_id: string; [key: string]: any }>;
}

const Menu: React.FC<MenuProps> = ({ 
  menuOpen, 
  setMenuOpen, 
  setShowMap,
  historias = [] 
}) => {
  const router = useRouter();

  const handleSurpriseMe = () => {
    if (historias && historias.length > 0) {
      const randomHistoria = historias[Math.floor(Math.random() * historias.length)];
      router.push(`/rua/${randomHistoria.rua_id}/historia/${randomHistoria.id}`);
      setMenuOpen(false);
    } else {
      alert('Nenhuma história disponível.');
    }
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (setShowMap) {
      setShowMap(true);
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Navigation Menu */}
      <nav
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="text-center mt-8 px-6">
          <h2 className="text-3xl font-serif font-bold">Menu</h2>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col flex-grow mt-8 px-6 space-y-2">
          <Link
            href="/"
            className="px-4 py-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={handleHomeClick}
          >
            <span className="block text-lg font-semibold">INÍCIO</span>
            <span className="block text-sm text-gray-500">e MAPA</span>
          </Link>

          <Link
            href="/adicionar-historia"
            className="px-4 py-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={handleMenuItemClick}
          >
            <span className="block text-sm text-gray-500">Conte a sua</span>
            <span className="block text-lg font-semibold">HISTÓRIA</span>
          </Link>

          <Link
            href="/ruas-e-historias"
            className="px-4 py-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={handleMenuItemClick}
          >
            <span className="block text-lg font-semibold">TODAS</span>
            <span className="block text-sm text-gray-500">Ruas e Histórias</span>
          </Link>

          <Link
            href="/sobre"
            className="px-4 py-3 hover:bg-gray-100 rounded-md text-lg font-semibold transition-colors duration-200"
            onClick={handleMenuItemClick}
          >
            SOBRE
          </Link>

          <Link
            href="/legado-africano"
            className="px-4 py-3 hover:bg-gray-100 rounded-md text-lg font-semibold transition-colors duration-200"
            onClick={handleMenuItemClick}
          >
            Legado Afro no RS
          </Link>

          <Link
            href="/referencias"
            className="px-4 py-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={handleMenuItemClick}
          >
            <span className="block text-lg font-semibold">REFERÊNCIAS</span>
            <span className="block text-sm text-gray-500">+ conteúdo</span>
          </Link>

          {/* Surprise Me Button (if historias are available) */}
          {historias.length > 0 && (
            <button
              onClick={handleSurpriseMe}
              className="px-4 py-3 hover:bg-gray-100 rounded-md text-lg font-semibold transition-colors duration-200 text-left"
            >
              <span className="block">SURPREENDA-ME</span>
              <span className="block text-sm text-gray-500">História aleatória</span>
            </button>
          )}
        </div>

        {/* Menu Footer */}
        <div className="px-6 pb-6">
          {/* Footer Image */}
          <img
            src="https://i.postimg.cc/8C184M44/parks-net.png"
            alt="Banner"
            className="mb-4 w-full h-48 object-cover rounded-md"
          />

          {/* Buy Tickets Button */}
          <a
            href="https://parksnet.com.br/ingressos/?bookingAgency=2818"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 block text-center hover:bg-blue-600 transition-colors duration-200"
          >
            Compre seus ingressos
          </a>

          {/* Footer Text */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Criado em Gramado
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
