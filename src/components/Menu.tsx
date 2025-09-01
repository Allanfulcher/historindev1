'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdFooter from './extra/AdFooter';
import BrownBtn from './buttons/BrownBtn';

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
      router.push(`/rua/${String(randomHistoria.rua_id)}/historia/${String(randomHistoria.id)}`);
      setMenuOpen(false);
    } else {
      alert('Nenhuma história disponível.');
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

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
      {/* Overlay with high z-index */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[9998] ${
          menuOpen ? 'opacity-40 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Navigation Menu */}
      {/* Menu with highest z-index */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-[#FEFCF8] shadow-lg z-[9999] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-[#F5F1EB] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundImage: 'linear-gradient(to bottom, #FEFCF8, #FAF7F2)'
        }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
        {/* Menu Header */}
        <div className="text-center mt-8 px-6 border-b border-[#F5F1EB] pb-4">
          <h2 className="text-3xl font-serif font-bold text-[#4A3F35]">Menu</h2>
          <div className="w-16 h-1 bg-[#8B4513] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col flex-grow px-6 space-y-2 mt-8">
          <Link
            href="/"
            className="px-4 py-3 hover:bg-[#F5F1EB] rounded-md transition-colors duration-200 border-b border-[#F5F1EB]"
            onClick={handleHomeClick}
          >
            <span className="block text-lg font-semibold text-[#6B5B4F]">INÍCIO</span>
            <span className="block text-sm font-medium text-[#A0958A]">e MAPA</span>
          </Link>

          <Link
            href="/adicionar-historia"
            className="px-4 py-3 hover:bg-[#F5F1EB] rounded-md transition-colors duration-200 border-b border-[#F5F1EB]"
            onClick={handleMenuItemClick}
          >
            <span className="block text-sm font-medium text-[#A0958A]">Conte a sua</span>
            <span className="block text-lg font-semibold text-[#6B5B4F]">HISTÓRIA</span>
          </Link>

          <Link
            href="/ruasehistorias"
            className="px-4 py-3 hover:bg-[#F5F1EB] rounded-md transition-colors duration-200 border-b border-[#F5F1EB]"
            onClick={handleMenuItemClick}
          >
            <span className="block text-lg font-semibold text-[#6B5B4F]">TODAS</span>
            <span className="block text-sm font-medium text-[#A0958A]">Ruas e Histórias</span>
          </Link>

          <Link
            href="/sobre"
            className="px-4 py-3 hover:bg-[#F5F1EB] rounded-md text-lg font-semibold text-[#6B5B4F] transition-colors duration-200 border-b border-[#F5F1EB]"
            onClick={handleMenuItemClick}
          >
            SOBRE
          </Link>

          <Link
            href="/legado-africano"
            className="px-4 py-3 hover:bg-[#F5F1EB] rounded-md text-lg font-semibold text-[#6B5B4F] transition-colors duration-200 border-b border-[#F5F1EB]"
            onClick={handleMenuItemClick}
          >
            Legado Afro no RS
          </Link>

          <Link
            href="/referencias"
            className="px-4 py-3 hover:bg-[#F5F1EB] rounded-md transition-colors duration-200 border-b border-[#F5F1EB]"
            onClick={handleMenuItemClick}
          >
            <span className="block text-lg font-semibold text-[#6B5B4F]">REFERÊNCIAS</span>
            <span className="block text-sm font-medium text-[#A0958A]">+ conteúdo</span>
          </Link>

          {/* Surprise Me Button (if historias are available) */}
          {historias.length > 0 && (
            <BrownBtn
              onClick={handleSurpriseMe}
            >
              SURPREENDA-ME
            </BrownBtn>
          )}
        </div>
        {/* Menu Footer */}
        <AdFooter />
        </div>
      </nav>
    </>
  );
};

export default Menu;
