'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Slide {
  image: string;
  text: string;
  buttonText: string;
  link: string;
}

interface PopupCarrosselProps {
  onClose: () => void;
}

const PopupCarrossel: React.FC<PopupCarrosselProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: Slide[] = [
    { 
      image: 'fotos/criadores-historin-gramado.jpeg', 
      text: 'Conheça mais sobre nós', 
      buttonText: 'Ver agora', 
      link: '/sobre' 
    },
    { 
      image: 'fotos/legado-africano-gramado.png', 
      text: 'Conheça o legado africano em Gramado', 
      buttonText: 'Saiba Mais!', 
      link: '/legado-africano' 
    },
    { 
      image: 'fotos/comprar-ingressos.png', 
      text: 'Ingressos para essa semana em Promoção', 
      buttonText: 'Comprar agora', 
      link: 'https://parksnet.com.br/ingressos/?bookingAgency=2818' 
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isExternalLink = (link: string) => link.startsWith('http');

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Fechar carrossel"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="text-center">
          <img 
            src={slides[currentSlide].image} 
            alt={`Slide ${currentSlide + 1}`} 
            className="rounded-lg mb-4 w-full object-cover h-64" 
          />
          <p className="text-lg font-semibold mb-4">{slides[currentSlide].text}</p>
          
          {isExternalLink(slides[currentSlide].link) ? (
            <a
              href={slides[currentSlide].link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition inline-block"
              onClick={onClose}
            >
              {slides[currentSlide].buttonText}
            </a>
          ) : (
            <Link
              href={slides[currentSlide].link}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition inline-block"
              onClick={onClose}
            >
              {slides[currentSlide].buttonText}
            </Link>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition flex items-center justify-center w-12 h-12"
            aria-label="Slide anterior"
          >
            <i className="fas fa-chevron-left text-black text-2xl"></i>
          </button>
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition flex items-center justify-center w-12 h-12"
            aria-label="Próximo slide"
          >
            <i className="fas fa-chevron-right text-black text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCarrossel;
