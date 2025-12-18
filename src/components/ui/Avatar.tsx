'use client';

import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl',
  };

  const ringClasses = {
    sm: 'ring-2',
    md: 'ring-2',
    lg: 'ring-4',
    xl: 'ring-4',
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`
          ${sizeClasses[size]}
          ${ringClasses[size]}
          rounded-full object-cover ring-[#E6D3B4]
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${ringClasses[size]}
        rounded-full bg-[#E6D3B4] ring-[#F5F1EB]
        flex items-center justify-center font-medium text-[#6B5B4F]
        ${className}
      `}
      aria-label={alt}
    >
      {name ? getInitials(name) : <i className="fas fa-user"></i>}
    </div>
  );
};

export default Avatar;
