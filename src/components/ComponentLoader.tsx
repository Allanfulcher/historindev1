'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with loading states
const DynamicApp = dynamic(() => import('./App'), {
  loading: () => <div className="animate-pulse">Carregando aplicação...</div>,
  ssr: false
});

// You can add more dynamic imports here for other components as needed
// const DynamicOnboardingPopup = dynamic(() => import('./OnboardingPopup'), {
//   loading: () => null,
//   ssr: false
// });

interface ComponentLoaderProps {
  children?: React.ReactNode;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Inicializando...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        setLoadingStatus('Preparando componentes...');
        setLoadingProgress(20);

        // Simulate component loading progress
        await new Promise(resolve => setTimeout(resolve, 300));
        setLoadingStatus('Carregando interface...');
        setLoadingProgress(60);

        await new Promise(resolve => setTimeout(resolve, 300));
        setLoadingStatus('Finalizando...');
        setLoadingProgress(90);

        await new Promise(resolve => setTimeout(resolve, 200));
        setLoadingProgress(100);
        setIsLoading(false);

      } catch (err) {
        console.error('Error loading components:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    };

    loadComponents();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4ECE1] p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Erro ao Carregar</h1>
          <p className="text-gray-600 mb-4">Falha ao carregar os componentes.</p>
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4ECE1] p-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#8A5A44] mx-auto mb-6"></div>
          <h1 className="text-3xl font-bold text-[#3E3A33] mb-2">Historin</h1>
          <p className="text-gray-600 mb-4">Carregando aplicação...</p>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-[#8A5A44] to-[#A0694F] h-3 rounded-full transition-all duration-300" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          <p className="text-lg font-semibold text-[#8A5A44] mb-2">{Math.round(loadingProgress)}%</p>
          <p className="text-sm text-gray-500">{loadingStatus}</p>
        </div>
      </div>
    );
  }

  return <DynamicApp />;
};

export default ComponentLoader;
