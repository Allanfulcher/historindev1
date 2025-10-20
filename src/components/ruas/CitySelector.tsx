'use client';

import React from 'react';

interface CitySelectorProps {
  selectedCityId: string;
  onCityChange: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCityId, onCityChange }) => {
  const cities = [
    { id: '0', name: 'Gramado' },
    { id: '1', name: 'Canela' }
  ];

  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-[#4A3F35] mb-1">
        Cidade
      </label>
      <div className="flex gap-1">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onCityChange(city.id)}
            className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              selectedCityId === city.id
                ? 'bg-[#8B4513] text-white shadow-sm'
                : 'bg-white text-[#4A3F35] border border-[#D4C4A8] hover:bg-[#F5F1E8]'
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySelector;
