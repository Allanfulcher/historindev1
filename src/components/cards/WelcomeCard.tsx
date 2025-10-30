'use client';

import React from 'react';

const WelcomeCard: React.FC = () => {
  return (
    <section className="w-full rounded-lg bg-[#FDF8E8] shadow-md ring-1 ring-[#A0958A]/20 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-[#4A3F35] mb-2">
        Bem-vindo ao Historin!
      </h2>
      <p className="text-sm sm:text-base text-[#6B5B4F] leading-relaxed">
        Explore as incríveis histórias de Gramado e Canela pela geografia!
      </p>
    </section>
  );
};

export default WelcomeCard;