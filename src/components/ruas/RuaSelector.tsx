'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Rua {
  id: string;
  nome: string;
  cidade_id?: string;
}

interface RuaSelectorProps {
  ruas: Rua[];
  selectedRuaId: string;
  selectedCityId: string;
}

const RuaSelector: React.FC<RuaSelectorProps> = ({ ruas, selectedRuaId, selectedCityId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter ruas by selected city and search term
  const filteredRuas = ruas.filter(rua => {
    const matchesCity = rua.cidade_id === selectedCityId;
    const matchesSearch = rua.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  // Get current selected rua
  const selectedRua = ruas.find(rua => rua.id === selectedRuaId);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRuaSelect = (ruaId: string) => {
    setIsOpen(false);
    setSearchTerm('');
    router.push(`/rua/${ruaId}`);
  };

  return (
    <div className="mb-4" ref={dropdownRef}>
      <label className="block text-sm font-medium text-[#4A3F35] mb-2">
        Selecionar Rua
      </label>
      
      <div className="relative">
        {/* Dropdown trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-[#D4C4A8] rounded-lg px-4 py-3 text-left text-[#4A3F35] hover:bg-[#F5F1E8] transition-colors duration-200 flex items-center justify-between"
        >
          <span className="truncate">
            {selectedRua ? selectedRua.nome : 'Selecione uma rua...'}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[#D4C4A8] rounded-lg shadow-lg max-h-64 overflow-hidden">
            {/* Search input */}
            <div className="p-3 border-b border-[#D4C4A8]">
              <input
                type="text"
                placeholder="Buscar rua..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-[#D4C4A8] rounded-md text-sm text-[#4A3F35] placeholder-[#A0958A] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                autoFocus
              />
            </div>

            {/* Ruas list */}
            <div className="max-h-48 overflow-y-auto">
              {filteredRuas.length > 0 ? (
                filteredRuas.map((rua) => (
                  <button
                    key={rua.id}
                    onClick={() => handleRuaSelect(rua.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-[#F5F1E8] transition-colors duration-150 ${
                      rua.id === selectedRuaId ? 'bg-[#8B4513] text-white hover:bg-[#A0522D]' : 'text-[#4A3F35]'
                    }`}
                  >
                    <div className="truncate">{rua.nome}</div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-[#6B5B4F] text-sm">
                  {searchTerm ? 'Nenhuma rua encontrada' : 'Nenhuma rua disponível para esta cidade'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RuaSelector;
