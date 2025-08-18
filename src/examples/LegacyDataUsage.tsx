/**
 * Example component showing how to use the legacy database utility
 * This demonstrates various ways to access and use your legacy data
 */

'use client';

import React from 'react';
import { useLegacyData, useHistorias, useRuas } from '../hooks/useLegacyData';

// Example 1: Using the main hook
const ExampleWithMainHook: React.FC = () => {
  const { data, getHistoriaById, searchHistorias } = useLegacyData();

  const handleSearch = (query: string) => {
    const results = searchHistorias(query);
    console.log('Search results:', results);
  };

  const handleGetHistoria = (id: string) => {
    const historia = getHistoriaById(id);
    console.log('Historia found:', historia);
  };

  return (
    <div className="p-6 bg-[#FEFCF8] rounded-lg">
      <h2 className="text-xl font-semibold text-[#4A3F35] mb-4">Legacy Data Example</h2>
      
      <div className="mb-4">
        <p className="text-[#6B5B4F]">Total historias: {data.historias.length}</p>
        <p className="text-[#6B5B4F]">Total ruas: {data.ruas.length}</p>
        <p className="text-[#6B5B4F]">Total cidades: {data.cidades.length}</p>
      </div>

      <div className="space-y-2">
        <button 
          onClick={() => handleSearch('Parque Hotel')}
          className="px-4 py-2 bg-[#8B4513] text-white rounded hover:bg-[#A0522D] transition-colors"
        >
          Search for "Parque Hotel"
        </button>
        
        <button 
          onClick={() => handleGetHistoria('1')}
          className="px-4 py-2 bg-[#8B4513] text-white rounded hover:bg-[#A0522D] transition-colors ml-2"
        >
          Get Historia ID 1
        </button>
      </div>
    </div>
  );
};

// Example 2: Using specific hooks
const ExampleWithSpecificHooks: React.FC = () => {
  const { historias, getByRuaId } = useHistorias();
  const { ruas, getById: getRuaById } = useRuas();

  const handleGetHistoriasByRua = (ruaId: string) => {
    const historiasInRua = getByRuaId(ruaId);
    console.log(`Historias in rua ${ruaId}:`, historiasInRua);
  };

  return (
    <div className="p-6 bg-[#FEFCF8] rounded-lg mt-4">
      <h2 className="text-xl font-semibold text-[#4A3F35] mb-4">Specific Hooks Example</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-[#4A3F35] mb-2">Historias ({historias.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {historias.slice(0, 3).map((historia) => (
              <div key={historia.id} className="p-2 bg-[#F5F1EB] rounded text-sm">
                <p className="font-medium text-[#4A3F35]">{historia.titulo}</p>
                <p className="text-[#6B5B4F] text-xs">{historia.ano}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-[#4A3F35] mb-2">Ruas ({ruas.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {ruas.map((rua) => (
              <div key={rua.id} className="p-2 bg-[#F5F1EB] rounded text-sm">
                <p className="font-medium text-[#4A3F35]">{rua.nome}</p>
                <button
                  onClick={() => handleGetHistoriasByRua(rua.id)}
                  className="text-xs text-[#8B4513] hover:underline mt-1"
                >
                  View historias in this street
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example 3: Direct import usage (for components that don't need hooks)
import { appData, legacyDb } from '../data/legacyData';

const ExampleWithDirectImport: React.FC = () => {
  // You can use appData directly for static data
  const totalHistorias = appData.historias.length;
  
  // Or use legacyDb for queries
  const parqueHotelHistorias = legacyDb.searchHistorias('Parque Hotel');

  return (
    <div className="p-6 bg-[#FEFCF8] rounded-lg mt-4">
      <h2 className="text-xl font-semibold text-[#4A3F35] mb-4">Direct Import Example</h2>
      
      <div className="space-y-2">
        <p className="text-[#6B5B4F]">Total historias (direct): {totalHistorias}</p>
        <p className="text-[#6B5B4F]">Parque Hotel stories: {parqueHotelHistorias.length}</p>
        
        <div className="mt-4">
          <h4 className="font-medium text-[#4A3F35] mb-2">Parque Hotel Stories:</h4>
          {parqueHotelHistorias.map((historia) => (
            <div key={historia.id} className="p-2 bg-[#F5F1EB] rounded mb-2">
              <p className="font-medium text-[#4A3F35] text-sm">{historia.titulo}</p>
              <p className="text-[#6B5B4F] text-xs">{historia.descricao.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component combining all examples
const LegacyDataUsage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4ede0] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A3F35] mb-8">Legacy Database Usage Examples</h1>
        
        <ExampleWithMainHook />
        <ExampleWithSpecificHooks />
        <ExampleWithDirectImport />
        
        <div className="mt-8 p-6 bg-[#FEFCF8] rounded-lg border border-[#F5F1EB]">
          <h2 className="text-xl font-semibold text-[#4A3F35] mb-4">How to Use in Your Components</h2>
          <div className="space-y-4 text-sm text-[#6B5B4F]">
            <div>
              <h4 className="font-medium text-[#4A3F35]">1. Replace your current data imports:</h4>
              <code className="block bg-[#F5F1EB] p-2 rounded mt-1">
                {`import { useLegacyData } from '../hooks/useLegacyData';`}
              </code>
            </div>
            
            <div>
              <h4 className="font-medium text-[#4A3F35]">2. Use in your component:</h4>
              <code className="block bg-[#F5F1EB] p-2 rounded mt-1">
                {`const { data } = useLegacyData();
const { historias, ruas, cidades } = data;`}
              </code>
            </div>
            
            <div>
              <h4 className="font-medium text-[#4A3F35]">3. For specific data types:</h4>
              <code className="block bg-[#F5F1EB] p-2 rounded mt-1">
                {`const { historias, getById } = useHistorias();`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacyDataUsage;
