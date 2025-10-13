'use client';

import React from 'react';

export interface AdBusiness {
  id: string;
  name: string;
  description: string;
  image: string; // image or logo
  link: string; // target URL
  tag?: string; // optional small ribbon/tag
}

interface AdCardProps {
  business: AdBusiness;
  className?: string;
}

const AdCard: React.FC<AdCardProps> = ({ business, className }) => {
  return (
    <div className={`max-w-sm mx-auto rounded-lg border border-[#E6D3B4] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className || ''}`}>
      {/* Header / Badge */}
      <div className="flex items-center gap-1 px-3 py-1">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8B6B3F] bg-[#F1E3C9] px-2 py-0.5 rounded-full uppercase">
          <i className="fas fa-bullhorn text-[10px]"></i>
          {business.tag || 'Anúncio'}
        </span>
      </div>

      <div className="flex items-stretch gap-3 px-3 pb-3">
        {/* Image */}
        <div className="w-28 h-24 rounded bg-[#F5F1EB] flex items-center justify-center overflow-hidden shrink-0">
          {business.image ? (
            <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-[#A09082] text-xs">Sem imagem</div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 py-1">
          <h3 className="text-base font-semibold text-[#4A3F35] leading-snug truncate">{business.name}</h3>
          <p className="text-xs text-[#6B5B4F] leading-snug line-clamp-2 mt-0.5">{business.description}</p>
          <div className="mt-2">
            <a
              href={business.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Conheça ${business.name}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3B82F6] text-white text-xs font-medium rounded-md shadow-sm hover:bg-[#2563EB] transition-colors"
            >
              Conheça
              <i className="fas fa-external-link-alt text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
;

export default AdCard;
