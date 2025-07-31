'use client';

import React from 'react';

interface CarouselItem {
  id: string;
  nome?: string;
  titulo?: string;
  fotos?: string;
  [key: string]: any;
}

interface CarouselProps {
  items: CarouselItem[];
  onItemClick: (item: CarouselItem) => void;
  type: 'rua' | 'historia';
}

const Carousel: React.FC<CarouselProps> = ({ items, onItemClick, type }) => {
  return (
    <div className="carousel flex overflow-x-auto space-x-4 pb-4">
      {items.map(item => (
        <div
          key={item.id}
          className="carousel-item flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={() => onItemClick(item)}
        >
          <img 
            src={item.fotos || (type === 'rua' ? 'https://placehold.co/200x150' : 'https://placehold.co/200x150')} 
            alt={item.nome || item.titulo} 
            className="w-48 h-40 object-cover rounded-lg" 
          />
          <div className="item-content mt-2 px-2">
            <h3 className="font-semibold text-sm text-center">
              {item.nome || item.titulo}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
