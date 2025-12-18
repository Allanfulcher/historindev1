'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  illustration?: ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'fas fa-inbox',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  illustration,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      {illustration ? (
        <div className="mb-6">{illustration}</div>
      ) : (
        <div className="w-20 h-20 rounded-full bg-[#F5F1EB] flex items-center justify-center mb-6">
          <i className={`${icon} text-3xl text-[#A0958A]`}></i>
        </div>
      )}
      
      <h3 className="text-xl font-bold text-[#4A3F35] mb-2">{title}</h3>
      
      {description && (
        <p className="text-[#6B5B4F] mb-6 max-w-sm">{description}</p>
      )}
      
      {(actionLabel && (actionHref || onAction)) && (
        actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 bg-[#8B4513] hover:bg-[#A0522D] text-white font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 bg-[#8B4513] hover:bg-[#A0522D] text-white font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
};

export const EmptyQuiz: React.FC<{ onAction?: () => void }> = ({ onAction }) => (
  <EmptyState
    icon="fas fa-clipboard-check"
    title="Nenhum quiz completado ainda!"
    description="Teste seus conhecimentos sobre a história de Gramado e Canela."
    actionLabel="Fazer um Quiz"
    actionHref="/quiz"
    onAction={onAction}
  />
);

export const EmptyHistorias: React.FC = () => (
  <EmptyState
    icon="fas fa-book-open"
    title="Nenhuma história encontrada"
    description="Explore outras ruas para descobrir histórias incríveis."
    actionLabel="Ver todas as ruas"
    actionHref="/ruasehistorias"
  />
);

export const EmptySearch: React.FC<{ onClear?: () => void }> = ({ onClear }) => (
  <EmptyState
    icon="fas fa-search"
    title="Nenhum resultado encontrado"
    description="Tente buscar com outros termos ou explore as categorias."
    actionLabel="Limpar busca"
    onAction={onClear}
  />
);

export const EmptyQRHunt: React.FC = () => (
  <EmptyState
    icon="fas fa-qrcode"
    title="Comece sua aventura!"
    description="Explore a cidade e encontre QR Codes escondidos para desbloquear histórias."
    actionLabel="Começar Caça ao QR Code"
    actionHref="/caca-qr"
  />
);

export default EmptyState;
