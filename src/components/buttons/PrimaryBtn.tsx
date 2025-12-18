'use client';

import React from 'react';

interface PrimaryBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center gap-2
        bg-[#8B4513] text-white font-medium
        py-2.5 px-5 rounded-lg
        hover:bg-[#A0522D] active:bg-[#6B3410]
        transition-all duration-200
        shadow-sm hover:shadow-md
        transform hover:-translate-y-0.5 active:translate-y-0
        focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-sm
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
