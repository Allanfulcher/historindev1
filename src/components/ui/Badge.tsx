'use client';

import React, { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-[#F5F1EB] text-[#6B5B4F]',
    primary: 'bg-[#8B4513] text-white',
    success: 'bg-[#6B8E23]/10 text-[#6B8E23] border border-[#6B8E23]/20',
    warning: 'bg-[#CD853F]/10 text-[#CD853F] border border-[#CD853F]/20',
    error: 'bg-[#A0522D]/10 text-[#A0522D] border border-[#A0522D]/20',
    outline: 'bg-transparent text-[#6B5B4F] border border-[#E6D3B4]',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {icon && <i className={`${icon} text-xs`}></i>}
      {children}
    </span>
  );
};

export const CountBadge: React.FC<{ count: number; className?: string }> = ({ 
  count, 
  className = '' 
}) => (
  <Badge variant="outline" size="sm" className={className}>
    {count}
  </Badge>
);

export const StatusBadge: React.FC<{ 
  status: 'active' | 'inactive' | 'pending'; 
  className?: string 
}> = ({ status, className = '' }) => {
  const config = {
    active: { variant: 'success' as const, label: 'Ativo', icon: 'fas fa-check' },
    inactive: { variant: 'error' as const, label: 'Inativo', icon: 'fas fa-times' },
    pending: { variant: 'warning' as const, label: 'Pendente', icon: 'fas fa-clock' },
  };

  const { variant, label, icon } = config[status];

  return (
    <Badge variant={variant} icon={icon} className={className}>
      {label}
    </Badge>
  );
};

export const YearBadge: React.FC<{ year: string | number; className?: string }> = ({ 
  year, 
  className = '' 
}) => (
  <Badge variant="primary" className={`rounded-full ${className}`}>
    {year}
  </Badge>
);

export default Badge;
