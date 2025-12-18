'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'skeleton bg-[#E6D3B4]/50';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-[#FEFCF8] rounded-xl shadow-sm p-4 ${className}`}>
    <Skeleton variant="rectangular" className="w-full h-48 mb-4" />
    <Skeleton variant="text" className="w-3/4 h-5 mb-2" />
    <Skeleton variant="text" className="w-full h-4 mb-1" />
    <Skeleton variant="text" className="w-2/3 h-4" />
  </div>
);

export const SkeletonHistoriaCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-[#F0E8DC] overflow-hidden ${className}`}>
    <Skeleton variant="rectangular" className="w-full aspect-square" />
    <div className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton variant="rectangular" className="w-16 h-6 rounded-full" />
        <Skeleton variant="text" className="flex-1 h-5" />
      </div>
      <Skeleton variant="text" className="w-full h-4 mb-2" />
      <Skeleton variant="text" className="w-full h-4 mb-2" />
      <Skeleton variant="text" className="w-2/3 h-4" />
    </div>
  </div>
);

export const SkeletonStreetCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
    <Skeleton variant="rectangular" className="w-full h-32" />
    <div className="p-3">
      <Skeleton variant="text" className="w-3/4 h-4 mb-2" />
      <Skeleton variant="text" className="w-full h-3" />
    </div>
  </div>
);

export const SkeletonMapView: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative h-64 md:h-96 rounded-lg overflow-hidden ${className}`}>
    <Skeleton variant="rectangular" className="w-full h-full" />
    <div className="absolute top-2 right-2">
      <Skeleton variant="rectangular" className="w-10 h-10 rounded-md" />
    </div>
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      <Skeleton variant="circular" className="w-3 h-3" />
      <Skeleton variant="circular" className="w-3 h-3" />
      <Skeleton variant="circular" className="w-3 h-3" />
    </div>
  </div>
);

export default Skeleton;
