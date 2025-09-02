'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Historia } from '../../types';

interface YearNavigatorProps {
  historias: Historia[];
  onYearSelect: (year: number) => void;
  className?: string;
}

const YearNavigator: React.FC<YearNavigatorProps> = ({ 
  historias, 
  onYearSelect, 
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [centerYear, setCenterYear] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract available years from historias and sort them chronologically
  const availableYears = React.useMemo(() => {
    const years = historias
      .map(h => parseInt(h.ano || '0', 10))
      .filter(year => year > 0)
      .filter((year, index, arr) => arr.indexOf(year) === index) // unique
      .sort((a, b) => a - b); // chronological order: oldest first
    return years;
  }, [historias]);

  // No default selected year - starts with nothing selected
  useEffect(() => {
    if (availableYears.length > 0 && centerYear === null) {
      setCenterYear(availableYears[availableYears.length - 1]);
    }
  }, [availableYears, centerYear]);

  // Lock/unlock body scroll when navigator opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Simple click to toggle
  const handleButtonClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  // Handle year click to select and close
  const handleYearClick = useCallback((year: number) => {
    setSelectedYear(year);
    setCenterYear(year);
    onYearSelect(year);
    setIsOpen(false);
  }, [onYearSelect]);

  // Handle navigator close
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (availableYears.length === 0) {
    return null;
  }

  return (
    <>
      {/* Year Navigator Button */}
      <button
        onClick={handleButtonClick}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 bg-[#FEFCF8] hover:bg-[#F5F1EB] border border-[#E6D3B4] rounded-r-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 group"
        title="Navegar por anos"
      >
        <div className="relative">
          <svg 
            className="w-4 h-4 text-[#6B5B4F]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </button>

      {/* Compact Year List */}
      <div
        ref={containerRef}
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        } ${className || ''}`}
      >
        <div className="bg-[#FEFCF8] border border-[#E6D3B4] rounded-lg shadow-lg w-40 max-h-96 flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-[#E6D3B4] bg-[#F5F1EB] rounded-t-lg">
            <h3 className="text-sm font-bold text-[#8B4513] text-center">Ano</h3>
          </div>
          
          {/* Scrollable Year List */}
          <div className="overflow-y-auto p-3 max-h-80">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`w-full text-center px-3 py-3 mb-2 rounded-lg text-base transition-all duration-200 ${
                  year === selectedYear
                    ? 'bg-[#E6D3B4] text-[#8B4513] font-bold shadow-sm'
                    : 'text-[#6B5B4F] hover:bg-[#F5F1EB] hover:text-[#8B4513] hover:shadow-sm'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#2D1B0E]/50 z-40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}
    </>
  );
};

export default YearNavigator;
