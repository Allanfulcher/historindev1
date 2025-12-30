'use client';

import React from 'react';
import Link from 'next/link';

const WelcomeCard: React.FC = () => {
  return (
    <section className="relative z-10 w-full rounded-xl bg-gradient-to-br from-[#FEFCF8] to-[#FDF8E8] shadow-md ring-1 ring-[#A0958A]/20 p-5 sm:p-8">
      {/* Mobile layout: simpler, no floating icon */}
      <div className="md:hidden">
        <h2 className="text-xl font-bold text-[#4A3F35] mb-2">
          Descubra as histórias escondidas
        </h2>
        <p className="text-sm text-[#6B5B4F] leading-relaxed mb-4">
          Explore as ruas de Gramado e Canela e conheça as histórias que moldaram nossa região.
        </p>
        
        {/* Stats - horizontal scroll on mobile */}
        <div className="flex gap-4 text-xs mb-4 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 text-[#6B5B4F] whitespace-nowrap">
            <i className="fas fa-road text-[#CD853F]"></i>
            <span><strong>25+</strong> ruas</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#6B5B4F] whitespace-nowrap">
            <i className="fas fa-book-open text-[#CD853F]"></i>
            <span><strong>200+</strong> histórias</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#6B5B4F] whitespace-nowrap">
            <i className="fas fa-city text-[#CD853F]"></i>
            <span><strong>2</strong> cidades</span>
          </div>
        </div>
        
        <Link
          href="/ruasehistorias"
          className="inline-flex items-center gap-2 bg-[#8B4513] hover:bg-[#A0522D] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm text-sm"
        >
          <span>Explorar</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>

      {/* Desktop layout: with icon */}
      <div className="hidden md:flex md:flex-row md:items-center gap-6">
        {/* Icon/Illustration */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-[#8B4513]/10 flex items-center justify-center">
            <i className="fas fa-map-marked-alt text-3xl text-[#8B4513]"></i>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#4A3F35] mb-2">
            Descubra as histórias escondidas
          </h2>
          <p className="text-lg text-[#6B5B4F] leading-relaxed mb-4">
            Explore as ruas de Gramado e Canela e conheça as histórias que moldaram nossa região.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-[#6B5B4F]">
              <i className="fas fa-road text-[#CD853F]"></i>
              <span><strong>20+</strong> ruas</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B5B4F]">
              <i className="fas fa-book-open text-[#CD853F]"></i>
              <span><strong>200+</strong> histórias</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B5B4F]">
              <i className="fas fa-city text-[#CD853F]"></i>
              <span><strong>2</strong> cidades</span>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex-shrink-0">
          <Link
            href="/ruasehistorias"
            className="inline-flex items-center gap-2 bg-[#8B4513] hover:bg-[#A0522D] text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span>Explorar</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeCard;