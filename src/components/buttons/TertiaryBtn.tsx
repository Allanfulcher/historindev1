'use client';

import React from 'react';

interface TertiaryBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    'aria-label'?: string;
    className?: string;
}

const TertiaryBtn: React.FC<TertiaryBtnProps> = ({ 
    children, 
    onClick, 
    disabled,
    'aria-label': ariaLabel,
    className = '',
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`
                inline-flex items-center justify-center gap-2
                bg-transparent text-[#8B4513] font-medium
                py-2 px-4 rounded-lg
                hover:bg-[#F5F1EB] hover:text-[#6B3410]
                active:bg-[#E6D3B4]
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default TertiaryBtn;
