'use client';

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingPageProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = 'Preparando sua experiência...', 
  fullScreen = true 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-[#f4ede0] flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="mb-6">
          <img
            src="/images/meta/historin-logo.svg"
            alt="Historin"
            className="h-16 w-auto mx-auto mb-4 animate-pulse"
          />
        </div>
        <LoadingSpinner size="lg" text={message} />
        <div className="mt-6 max-w-md">
          <div className="w-full bg-[#E6D3B4] rounded-full h-2">
            <div className="bg-[#8B4513] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
