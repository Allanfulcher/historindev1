'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import LegadoAfricanoCard from './LegadoAfricanoCard';

interface Rua {
  id: string;
  nome: string;
  fotos?: string;
}

interface Historia {
  id: string;
  rua_id: string;
  titulo: string;
  descricao: string;
  fotos: string[];
}

interface RuasEHistoriasProps {
  ruas?: Rua[];
  historias?: Historia[];
}

const RuasEHistorias: React.FC<RuasEHistoriasProps> = ({ 
  ruas = [], 
  historias = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRuas, setFilteredRuas] = useState<Rua[]>(ruas);
  const [filteredHistorias, setFilteredHistorias] = useState<Historia[]>(historias);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredRuas(ruas);
      setFilteredHistorias(historias);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      setFilteredRuas(ruas.filter(rua => rua.nome.toLowerCase().includes(lowercasedTerm)));
      setFilteredHistorias(historias.filter(historia => historia.titulo.toLowerCase().includes(lowercasedTerm)));
    }
  }, [searchTerm, ruas, historias]);

  // Map filteredRuas to include a random photo from associated stories
  const filteredRuasWithImages = useMemo(() => {
    return filteredRuas.map(rua => {
      const historiasDaRua = historias.filter(historia => historia.rua_id === rua.id);
      const fotos = historiasDaRua.flatMap(historia => historia.fotos);
      const randomFoto = fotos.length > 0 ? fotos[Math.floor(Math.random() * fotos.length)] : null;
      return { ...rua, fotos: randomFoto || 'https://placehold.co/300x200' };
    });
  }, [filteredRuas, historias]);

  return (
    <div className="p-4 w-full lg:w-4/5 mx-auto">
      {/* Header and fixed search bar */}
      <header className="sticky top-0 z-10 bg-white py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl cursor-pointer">
            <Link href="/">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h1 className="text-lg font-bold">Ruas e Histórias</h1>
          <div className="w-10 h-10"></div>
        </div>
        
        {/* Enhanced Search Field */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A5A44]"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </header>

      {/* View Map Button */}
      <div className="mb-4">
        <Link href="/">
          <button className="w-full p-4 rounded-lg bg-[#8A5A44] text-white font-semibold flex items-center justify-center hover:bg-[#5a3e2e] transition-colors duration-200">
            <i className="fas fa-map-marker-alt mr-2"></i> Ver Mapa
          </button>
        </Link>
      </div>

      {/* Highlight Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Destaque</h2>
        <LegadoAfricanoCard />
      </section>

      {/* All Streets Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Todas as Ruas</h2>
        {filteredRuasWithImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRuasWithImages.map(rua => (
              <Link
                key={rua.id}
                href={`/rua/${rua.id}`}
                className="bg-white p-2 rounded-lg shadow cursor-pointer block hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={rua.fotos} 
                  alt={rua.nome} 
                  className="rounded-lg mb-2 w-full h-40 object-cover" 
                />
                <h3 className="font-semibold">{rua.nome}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma rua encontrada para "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* All Stories Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Todas as Histórias</h2>
        {filteredHistorias.length > 0 ? (
          <div className="space-y-2">
            {filteredHistorias.map(historia => (
              <Link
                key={historia.id}
                href={`/rua/${historia.rua_id}/historia/${historia.id}`}
                className="bg-white p-2 rounded-lg shadow mb-2 flex items-center cursor-pointer block hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={historia.fotos[0] || 'https://placehold.co/100x100'} 
                  alt={historia.titulo} 
                  className="rounded-lg mr-2 w-24 h-24 object-cover flex-shrink-0" 
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{historia.titulo}</h3>
                  <p className="text-sm text-gray-600">
                    {historia.descricao.length > 60 
                      ? `${historia.descricao.slice(0, 60)}...` 
                      : historia.descricao
                    }
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma história encontrada para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RuasEHistorias;
