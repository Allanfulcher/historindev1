'use client';

import React from 'react';

const WelcomeCard: React.FC = () => {
  const features = [
    "Explore histórias pela geografia e descubra a história por trás dos lugares!",
    "Navegue pela linha do tempo para reviver os eventos que moldaram nossa cidade!",
    "Contribua com suas histórias e experiências e aproveite a jornada!"
  ];

  return (
    <section className="w-full rounded-lg bg-[#FDF8E8] shadow-md ring-1 ring-[#A0958A]/20 p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#4A3F35] mb-4">
        Bem-vindo ao Historin!
      </h2>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-[#8B4513] text-white text-sm font-bold rounded-full flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-[#6B5B4F] leading-relaxed">
              {feature}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WelcomeCard;