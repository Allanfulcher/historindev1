'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = '#8B4513',
  text = 'Carregando...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div 
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-4 rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      />
      {text && (
        <p className={`${textSizes[size]} text-[#6B5B4F] font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
