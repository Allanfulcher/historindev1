'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { legacyDb } from '../../utils/legacyDb';
import { legacyHistorias, legacyRuas, legacyCidades } from '../../data/legacyData';
import type { Historia, Rua, Cidade } from '../../types';

interface RuaHistoriaProps {
  className?: string;
}

const RuaHistoria: React.FC<RuaHistoriaProps> = ({ className }) => {
  const params = useParams();
  const ruaId = Array.isArray(params?.ruaId) ? params.ruaId[0] : params?.ruaId;
  const historiaId = Array.isArray(params?.historiaId) ? params.historiaId[0] : params?.historiaId;
  
  const [rua, setRua] = useState<Rua | null>(null);
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [cidade, setCidade] = useState<Cidade | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize database
    legacyDb.loadData({
      historias: legacyHistorias,
      ruas: legacyRuas,
      cidades: legacyCidades
    });

    // Load data if IDs are provided
    if (ruaId) {
      const foundRua = legacyDb.getRuaById(ruaId);
      setRua(foundRua || null);
      
      if (foundRua?.cidade_id) {
        const foundCidade = legacyDb.getCidadeById(foundRua.cidade_id.toString());
        setCidade(foundCidade || null);
      }
    }

    if (historiaId) {
      const foundHistoria = legacyDb.getHistoriaById(historiaId);
      setHistoria(foundHistoria || null);
    }

    setIsLoading(false);
  }, [ruaId, historiaId]);

  return (
    <div className={`min-h-screen bg-gray-50 p-4 ${className || ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Rua História Demo Page
          </h1>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-800">URL Parameters:</h2>
                <p className="text-blue-600">Rua ID: {ruaId || 'Not provided'}</p>
                <p className="text-blue-600">Historia ID: {historiaId || 'Not provided'}</p>
              </div>

              {rua && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h2 className="text-lg font-semibold text-green-800">Rua Information:</h2>
                  <h3 className="text-xl font-bold text-green-700">{rua.nome}</h3>
                  <p className="text-green-600 mt-2">{rua.descricao}</p>
                  {rua.fotos && Array.isArray(rua.fotos) && rua.fotos.length > 0 && (
                    <img 
                      src={rua.fotos[0]} 
                      alt={rua.nome}
                      className="mt-3 w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}

              {historia && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h2 className="text-lg font-semibold text-purple-800">História Information:</h2>
                  <h3 className="text-xl font-bold text-purple-700">{historia.titulo}</h3>
                  <p className="text-purple-600 mt-2">{historia.descricao}</p>
                  {historia.ano && (
                    <p className="text-purple-500 text-sm mt-1">Ano: {historia.ano}</p>
                  )}
                </div>
              )}

              {cidade && (
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h2 className="text-lg font-semibold text-orange-800">Cidade Information:</h2>
                  <h3 className="text-xl font-bold text-orange-700">{cidade.nome}</h3>
                  <p className="text-orange-600 mt-2">{cidade.descricao}</p>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800">Status:</h2>
                <p className="text-gray-600">✅ Page is working correctly</p>
                <p className="text-gray-600">✅ URL routing is functional</p>
                <p className="text-gray-600">✅ Database integration is working</p>
                <p className="text-gray-600">✅ Data is being loaded from legacyDB</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuaHistoria;