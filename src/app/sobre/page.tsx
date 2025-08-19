import { Metadata } from 'next';
import { Suspense } from 'react';
import Sobre from '../../components/sobre/Sobre';

export const metadata: Metadata = {
  title: 'Sobre Nós - Historin',
  description: 'Saiba mais sobre o Historin, nossa visão, equipe e como você pode contribuir.',
};

export default function SobrePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
        <p className="text-[#6B5B4F]">Carregando...</p>
      </div>
    </div>}>
      <Sobre />
    </Suspense>
  );
}
