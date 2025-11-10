'use client';

import { useRouter } from 'next/navigation';
import { FiMapPin, FiPhone, FiMail, FiGlobe, FiInstagram, FiFacebook } from 'react-icons/fi';

interface Negocio {
  id: number;
  nome: string;
  endereco: string;
  telefone?: string;
  categoria: string;
  descricao?: string;
  foto?: string;
  logo_url?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
}

interface BusinessCardProps {
  negocios: Negocio[];
  className?: string;
}

const BusinessCard = ({ negocios, className = '' }: BusinessCardProps) => {
  const router = useRouter();

  const handleBusinessClick = (negocioId: number) => {
    router.push(`/negocio/${negocioId}`);
  };

  const getBusinessImage = (negocio: Negocio): string => {
    return negocio.foto || negocio.logo_url || '/images/default-business.jpg';
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {negocios.map((negocio) => (
        <button
          key={negocio.id}
          onClick={() => handleBusinessClick(negocio.id)}
          className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-[#8B4513]/20 text-left w-full cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Image Section */}
          <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            <img
              src={getBusinessImage(negocio)}
              alt={negocio.nome}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/default-business.jpg';
              }}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#8B4513] text-white shadow-lg">
                {negocio.categoria}
              </span>
            </div>

            {/* Logo overlay if available */}
            {negocio.logo_url && negocio.foto && (
              <div className="absolute bottom-3 right-3 h-12 w-12 overflow-hidden rounded-lg bg-white shadow-lg ring-2 ring-white">
                <img
                  src={negocio.logo_url}
                  alt={`${negocio.nome} logo`}
                  className="h-full w-full object-contain p-1"
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-[#4A3F35] line-clamp-1 group-hover:text-[#8B4513] transition-colors">
              {negocio.nome}
            </h3>
            
            {negocio.descricao && (
              <p className="mt-2 text-sm text-[#6B5B4F] line-clamp-2">
                {negocio.descricao}
              </p>
            )}

            {/* Address */}
            <div className="mt-3 flex items-start gap-2 text-sm text-[#A0958A]">
              <FiMapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#8B4513]" />
              <span className="line-clamp-1">{negocio.endereco}</span>
            </div>

            {/* Contact Icons */}
            <div className="mt-3 flex items-center gap-2">
              {negocio.telefone && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F1EB] text-[#8B4513] group-hover:bg-[#8B4513] group-hover:text-white transition-colors">
                  <FiPhone className="w-4 h-4" />
                </div>
              )}
              {negocio.email && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F1EB] text-[#8B4513] group-hover:bg-[#8B4513] group-hover:text-white transition-colors">
                  <FiMail className="w-4 h-4" />
                </div>
              )}
              {negocio.website && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F1EB] text-[#8B4513] group-hover:bg-[#8B4513] group-hover:text-white transition-colors">
                  <FiGlobe className="w-4 h-4" />
                </div>
              )}
              {negocio.instagram && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F1EB] text-[#8B4513] group-hover:bg-[#8B4513] group-hover:text-white transition-colors">
                  <FiInstagram className="w-4 h-4" />
                </div>
              )}
              {negocio.facebook && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F1EB] text-[#8B4513] group-hover:bg-[#8B4513] group-hover:text-white transition-colors">
                  <FiFacebook className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Hover arrow indicator */}
          <div className="absolute right-4 bottom-4 text-[#A0958A] group-hover:text-[#8B4513] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default BusinessCard;
