'use client';

import React from 'react';

interface TransparentBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    'aria-label'?: string;
    className?: string;
}

const TransparentBtn: React.FC<TransparentBtnProps> = ({ 
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
                bg-transparent hover:bg-[#F5F1EB] 
                text-[#6B5B4F] 
                p-2 rounded-full 
                flex items-center justify-center 
                text-xl
                transition-all duration-200 
                cursor-pointer 
                transform hover:scale-105 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default TransparentBtn;
