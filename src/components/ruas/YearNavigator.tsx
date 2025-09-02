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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [wheelOffset, setWheelOffset] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Extract available years from historias and sort them
  const availableYears = React.useMemo(() => {
    const years = historias
      .map(h => parseInt(h.ano || '0', 10))
      .filter(year => year > 0)
      .filter((year, index, arr) => arr.indexOf(year) === index) // unique
      .sort((a, b) => b - a); // newest first
    return years;
  }, [historias]);

  // Set initial selected year to the most recent
  useEffect(() => {
    if (availableYears.length > 0 && selectedYear === null) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  // Handle hold to open functionality
  const startHoldTimer = useCallback(() => {
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setIsOpen(true);
      setIsHolding(false);
    }, 500); // 500ms hold to open
  }, []);

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHolding(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    
    // Start hold timer if touching the icon area
    if (e.currentTarget.classList.contains('year-navigator-trigger')) {
      startHoldTimer();
    }
  }, [startHoldTimer]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touchX = e.touches[0].clientX;
    setCurrentX(touchX);
    
    const deltaX = touchX - startX;
    
    // Open panel if swiping right from left edge
    if (!isOpen && deltaX > 50 && startX < 50) {
      setIsOpen(true);
    }
    
    // Close panel if swiping left while open
    if (isOpen && deltaX < -50) {
      setIsOpen(false);
    }
  }, [isDragging, startX, isOpen]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    clearHoldTimer();
    
    // If panel is open and a year is selected, trigger navigation
    if (isOpen && selectedYear) {
      onYearSelect(selectedYear);
      setIsOpen(false);
    }
  }, [isOpen, selectedYear, onYearSelect, clearHoldTimer]);

  const handleMouseStart = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    
    // Start hold timer if clicking the icon area
    if (e.currentTarget.classList.contains('year-navigator-trigger')) {
      startHoldTimer();
    }
  }, [startHoldTimer]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const mouseX = e.clientX;
    setCurrentX(mouseX);
    
    const deltaX = mouseX - startX;
    
    if (!isOpen && deltaX > 50 && startX < 50) {
      setIsOpen(true);
    }
    
    if (isOpen && deltaX < -50) {
      setIsOpen(false);
    }
  }, [isDragging, startX, isOpen]);

  const handleMouseEnd = useCallback(() => {
    setIsDragging(false);
    clearHoldTimer();
    
    if (isOpen && selectedYear) {
      onYearSelect(selectedYear);
      setIsOpen(false);
    }
  }, [isOpen, selectedYear, onYearSelect, clearHoldTimer]);

  const handleWheelScroll = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!isOpen || availableYears.length === 0) return;
    
    const delta = e.deltaY > 0 ? 1 : -1;
    const currentIndex = availableYears.indexOf(selectedYear || availableYears[0]);
    const newIndex = Math.max(0, Math.min(availableYears.length - 1, currentIndex + delta));
    
    setSelectedYear(availableYears[newIndex]);
  }, [isOpen, availableYears, selectedYear]);

  const handleYearClick = useCallback((year: number) => {
    setSelectedYear(year);
    onYearSelect(year);
    setIsOpen(false);
  }, [onYearSelect]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Cleanup hold timer on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
    };
  }, []);

  if (availableYears.length === 0) {
    return null;
  }

  return (
    <>
      {/* Visible Year Navigator Trigger Icon */}
      <div
        className={`year-navigator-trigger fixed left-1 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-200 ease-out cursor-pointer ${
          isHolding ? 'scale-105' : 'scale-100'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseEnd}
      >
        <div className={`bg-white/90 backdrop-blur-sm rounded-r-lg p-2 shadow-sm border border-gray-200 transition-all duration-200 ${
          isHolding ? 'bg-[#E6D3B4]/90 shadow-md' : 'hover:bg-[#E6D3B4]/70 hover:shadow-md'
        }`}>
          <svg 
            className="w-4 h-4 text-gray-600" 
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
          
          {/* Hold progress indicator */}
          {isHolding && (
            <div className="absolute inset-0 rounded-r-lg border border-[#E6D3B4]/50">
              <div className="absolute inset-0 rounded-r-lg border border-gray-400 border-t-transparent animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Touch/Swipe Area - invisible trigger zone for edge swipe */}
      <div
        className="fixed left-0 top-0 w-8 h-full z-40 bg-transparent"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseEnd}
      />

      {/* Year Navigator Panel */}
      <div
        ref={containerRef}
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className || ''}`}
      >
        {/* Panel Background */}
        <div className="bg-white/95 backdrop-blur-sm rounded-r-2xl shadow-lg border border-gray-200 p-4 min-w-[120px]">

          {/* Title */}
          <div className="text-xs font-medium text-gray-700 mb-3 text-center">
            Anos
          </div>

          {/* Year Wheel */}
          <div 
            ref={wheelRef}
            className="relative h-32 overflow-hidden"
            onWheel={handleWheelScroll}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
              {availableYears.map((year, index) => {
                const isSelected = year === selectedYear;
                const distance = Math.abs(availableYears.indexOf(selectedYear || availableYears[0]) - index);
                const opacity = Math.max(0.3, 1 - distance * 0.3);
                const scale = isSelected ? 1 : Math.max(0.8, 1 - distance * 0.1);
                
                return (
                  <button
                    key={year}
                    onClick={() => handleYearClick(year)}
                    className={`text-sm font-medium transition-all duration-200 px-2 py-1 rounded ${
                      isSelected 
                        ? 'text-blue-600 bg-blue-50 font-bold' 
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                    }}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-gray-500 text-center mt-2">
            Scroll ou toque
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default YearNavigator;
