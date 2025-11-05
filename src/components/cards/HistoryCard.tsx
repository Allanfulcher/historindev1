'use client'

import { Historia } from '@/types';
import { useRouter } from 'next/navigation';

interface HistoryCardProps {
  historias: Historia[];
  className?: string;
  onHistoriaClick?: (ruaId: string, historiaId: string) => void;
}

const HistoryCard = ({ historias, className = '', onHistoriaClick }: HistoryCardProps) => {
  const router = useRouter();

  const handleHistoriaClick = (historia: Historia) => {
    if (onHistoriaClick) {
      onHistoriaClick(historia.rua_id, historia.id);
    } else {
      // Default behavior: navigate to street page without auto-scroll
      router.push(`/rua/${historia.rua_id}`);
    }
  };

  const getHistoriaImage = (historia: Historia): string => {
    if (!historia.fotos || historia.fotos.length === 0) {
      return '/images/historias/festa-hortensias.webp'; // fallback image
    }
    
    // Handle both string arrays and FotoWithCredit arrays
    const firstPhoto = historia.fotos[0];
    return typeof firstPhoto === 'string' ? firstPhoto : firstPhoto.url;
  };

  return (
    <div className={`grid gap-4 ${className}`}>
      {historias.map((historia) => (
        <button
          key={historia.id}
          onClick={() => handleHistoriaClick(historia)}
          className="group relative flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-blue-500/20 text-left w-full cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={getHistoriaImage(historia)}
              alt={historia.titulo}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/historias/festa-hortensias.webp';
              }}
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900 line-clamp-2">
              {historia.titulo}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {historia.descricao}
            </p>
          </div>
          
          <div className="absolute right-4 top-4 text-gray-400 group-hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default HistoryCard;