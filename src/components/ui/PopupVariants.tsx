'use client';

import React, { ReactNode } from 'react';
import Popup, { PopupProps } from './Popup';

/**
 * POPUP VARIANTS
 * 
 * Pre-built popup components for common use cases in Historin.
 * All variants use the base Popup component with specific configurations.
 */

// ============================================================================
// IMAGE POPUP - Display images with optional caption and credits
// ============================================================================

export interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt?: string;
  caption?: string;
  credits?: string;
  showDownload?: boolean;
}

export const ImagePopup: React.FC<ImagePopupProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt = 'Imagem',
  caption,
  credits,
  showDownload = false,
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageAlt || 'imagem';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      position="center"
      animation="scale"
      padding={false}
    >
      <div className="relative">
        {/* Image */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
        />

        {/* Caption/Credits overlay */}
        {(caption || credits || showDownload) && (
          <div className="p-4 bg-[#FEFCF8] border-t border-[#F5F1EB]">
            {caption && (
              <p className="text-[#4A3F35] font-medium mb-2">{caption}</p>
            )}
            {credits && (
              <p className="text-[#A0958A] text-sm mb-3">
                <i className="fas fa-camera mr-1"></i>
                {credits}
              </p>
            )}
            {showDownload && (
              <button
                onClick={handleDownload}
                className="text-[#8B4513] hover:text-[#A0522D] text-sm font-medium transition-colors duration-200"
              >
                <i className="fas fa-download mr-2"></i>
                Baixar imagem
              </button>
            )}
          </div>
        )}
      </div>
    </Popup>
  );
};

// ============================================================================
// CONFIRMATION POPUP - Ask user to confirm an action
// ============================================================================

export interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: 'primary' | 'danger' | 'success';
  icon?: ReactNode;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmButtonColor = 'primary',
  icon,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const buttonColors = {
    primary: 'bg-[#8B4513] hover:bg-[#A0522D] text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      position="center"
      animation="scale"
      title={title}
    >
      {/* Icon */}
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}

      {/* Message */}
      <p className="text-[#6B5B4F] text-center mb-6 leading-relaxed">
        {message}
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#F5F1EB] hover:bg-[#E6D3B4] text-[#4A3F35] rounded transition-colors duration-200"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={`px-6 py-2 rounded transition-colors duration-200 ${buttonColors[confirmButtonColor]}`}
        >
          {confirmText}
        </button>
      </div>
    </Popup>
  );
};

// ============================================================================
// INFO POPUP - Display information with optional action button
// ============================================================================

export interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string | ReactNode;
  actionText?: string;
  onAction?: () => void;
  icon?: ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export const InfoPopup: React.FC<InfoPopupProps> = ({
  isOpen,
  onClose,
  title,
  message,
  actionText,
  onAction,
  icon,
  type = 'info',
}) => {
  const typeStyles = {
    info: {
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      defaultIcon: <i className="fas fa-info-circle text-3xl"></i>,
    },
    success: {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      defaultIcon: <i className="fas fa-check-circle text-3xl"></i>,
    },
    warning: {
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      defaultIcon: <i className="fas fa-exclamation-triangle text-3xl"></i>,
    },
    error: {
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      defaultIcon: <i className="fas fa-times-circle text-3xl"></i>,
    },
  };

  const style = typeStyles[type];

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      position="center"
      animation="scale"
      title={title}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className={`w-16 h-16 ${style.iconBg} ${style.iconColor} rounded-full flex items-center justify-center`}>
          {icon || style.defaultIcon}
        </div>
      </div>

      {/* Message */}
      <div className="text-[#6B5B4F] text-center mb-6 leading-relaxed">
        {typeof message === 'string' ? <p>{message}</p> : message}
      </div>

      {/* Action button */}
      <div className="flex justify-center gap-3">
        {actionText && onAction && (
          <button
            onClick={() => {
              onAction();
              onClose();
            }}
            className="px-6 py-2 bg-[#8B4513] hover:bg-[#A0522D] text-white rounded transition-colors duration-200"
          >
            {actionText}
          </button>
        )}
        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#F5F1EB] hover:bg-[#E6D3B4] text-[#4A3F35] rounded transition-colors duration-200"
        >
          Fechar
        </button>
      </div>
    </Popup>
  );
};

// ============================================================================
// LINK POPUP - Display a list of links with descriptions
// ============================================================================

export interface LinkItem {
  title: string;
  url: string;
  description?: string;
  icon?: ReactNode;
}

export interface LinkPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  links: LinkItem[];
}

export const LinkPopup: React.FC<LinkPopupProps> = ({
  isOpen,
  onClose,
  title,
  description,
  links,
}) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      position="center"
      animation="slide-up"
      title={title}
    >
      {/* Description */}
      {description && (
        <p className="text-[#6B5B4F] mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* Links list */}
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-[#F5F1EB] hover:bg-[#E6D3B4] rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              {link.icon && (
                <div className="text-[#8B4513] text-xl mt-1">
                  {link.icon}
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="font-medium text-[#4A3F35] group-hover:text-[#8B4513] transition-colors duration-200 flex items-center gap-2">
                  {link.title}
                  <i className="fas fa-external-link-alt text-xs"></i>
                </h3>
                {link.description && (
                  <p className="text-sm text-[#A0958A] mt-1">
                    {link.description}
                  </p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Popup>
  );
};

// ============================================================================
// CUSTOM CONTENT POPUP - Flexible popup for any custom content
// ============================================================================

export interface CustomContentPopupProps extends Omit<PopupProps, 'children'> {
  children: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
}

export const CustomContentPopup: React.FC<CustomContentPopupProps> = ({
  children,
  footer,
  header,
  ...popupProps
}) => {
  return (
    <Popup {...popupProps} padding={false}>
      {/* Header */}
      {header && (
        <div className="px-6 pt-6 pb-4 border-b border-[#F5F1EB]">
          {header}
        </div>
      )}

      {/* Content */}
      <div className="px-6 py-4">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-6 pb-6 pt-4 border-t border-[#F5F1EB]">
          {footer}
        </div>
      )}
    </Popup>
  );
};

// ============================================================================
// LOADING POPUP - Show loading state with message
// ============================================================================

export interface LoadingPopupProps {
  isOpen: boolean;
  message?: string;
  size?: 'sm' | 'md';
}

export const LoadingPopup: React.FC<LoadingPopupProps> = ({
  isOpen,
  message = 'Carregando...',
  size = 'sm',
}) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => {}} // Cannot close loading popup
      size={size}
      position="center"
      animation="fade"
      showCloseButton={false}
      closeOnBackdropClick={false}
      closeOnEscape={false}
    >
      <div className="flex flex-col items-center gap-4 py-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-[#F5F1EB] border-t-[#8B4513] rounded-full animate-spin"></div>
        
        {/* Message */}
        <p className="text-[#6B5B4F] text-center">
          {message}
        </p>
      </div>
    </Popup>
  );
};
