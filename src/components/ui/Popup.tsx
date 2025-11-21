'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

/**
 * POPUP SYSTEM - Base Component
 * 
 * A flexible, accessible popup/modal system for Historin.
 * Handles overlay, animations, keyboard navigation, and focus management.
 * 
 * Features:
 * - Smooth enter/exit animations
 * - ESC key to close
 * - Click outside to close (optional)
 * - Focus trap for accessibility
 * - Mobile and desktop responsive
 * - Customizable positioning and sizing
 * - Follows Historin design system
 */

export type PopupPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'bottom-center';
export type PopupSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type PopupAnimation = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';

export interface PopupProps {
  /** Controls popup visibility */
  isOpen: boolean;
  
  /** Callback when popup should close */
  onClose: () => void;
  
  /** Content to display inside popup */
  children: ReactNode;
  
  /** Popup title (optional, for accessibility) */
  title?: string;
  
  /** Show close button in top-right corner */
  showCloseButton?: boolean;
  
  /** Allow closing by clicking backdrop */
  closeOnBackdropClick?: boolean;
  
  /** Allow closing with ESC key */
  closeOnEscape?: boolean;
  
  /** Position of the popup */
  position?: PopupPosition;
  
  /** Size preset */
  size?: PopupSize;
  
  /** Animation type */
  animation?: PopupAnimation;
  
  /** Custom className for popup container */
  className?: string;
  
  /** Custom className for backdrop */
  backdropClassName?: string;
  
  /** Z-index value */
  zIndex?: number;
  
  /** Disable body scroll when open */
  disableBodyScroll?: boolean;
  
  /** Custom max height */
  maxHeight?: string;
  
  /** Enable padding inside popup */
  padding?: boolean;
  
  /** Callback after popup opens (animation complete) */
  onAfterOpen?: () => void;
  
  /** Callback after popup closes (animation complete) */
  onAfterClose?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  position = 'center',
  size = 'md',
  animation = 'scale',
  className = '',
  backdropClassName = '',
  zIndex = 50,
  disableBodyScroll = true,
  maxHeight = '90vh',
  padding = true,
  onAfterOpen,
  onAfterClose,
}) => {
  const [shouldRender, setShouldRender] = React.useState(false);
  const [animationState, setAnimationState] = React.useState<'entering' | 'entered' | 'exiting'>('entering');
  const popupRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen && disableBodyScroll) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
        // Restore focus when closing
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, disableBodyScroll]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setAnimationState('entered');
        onAfterOpen?.();
      }, 10);
      return () => clearTimeout(timer);
    } else if (shouldRender) {
      setAnimationState('exiting');
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimationState('entering');
        onAfterClose?.();
      }, 300); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender, onAfterOpen, onAfterClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !popupRef.current) return;

    const focusableElements = popupRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen, animationState]);

  if (!shouldRender) return null;

  // Position classes
  const positionClasses: Record<PopupPosition, string> = {
    'center': 'items-center justify-center',
    'top': 'items-start justify-center pt-8',
    'bottom': 'items-end justify-center pb-8',
    'left': 'items-center justify-start pl-8',
    'right': 'items-center justify-end pr-8',
    'top-right': 'items-start justify-end pt-4 pr-4',
    'bottom-center': 'items-end justify-center pb-4',
  };

  // Size classes
  const sizeClasses: Record<PopupSize, string> = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    'full': 'max-w-full mx-4',
  };

  // Animation classes
  const getAnimationClasses = (): string => {
    const baseTransition = 'transition-all duration-300 ease-out';
    
    const animations: Record<PopupAnimation, { entering: string; entered: string; exiting: string }> = {
      'fade': {
        entering: 'opacity-0',
        entered: 'opacity-100',
        exiting: 'opacity-0',
      },
      'slide-up': {
        entering: 'opacity-0 translate-y-8',
        entered: 'opacity-100 translate-y-0',
        exiting: 'opacity-0 translate-y-8',
      },
      'slide-down': {
        entering: 'opacity-0 -translate-y-8',
        entered: 'opacity-100 translate-y-0',
        exiting: 'opacity-0 -translate-y-8',
      },
      'slide-left': {
        entering: 'opacity-0 translate-x-8',
        entered: 'opacity-100 translate-x-0',
        exiting: 'opacity-0 translate-x-8',
      },
      'slide-right': {
        entering: 'opacity-0 -translate-x-8',
        entered: 'opacity-100 translate-x-0',
        exiting: 'opacity-0 -translate-x-8',
      },
      'scale': {
        entering: 'opacity-0 scale-95',
        entered: 'opacity-100 scale-100',
        exiting: 'opacity-0 scale-95',
      },
      'none': {
        entering: '',
        entered: '',
        exiting: '',
      },
    };

    return `${baseTransition} ${animations[animation][animationState]}`;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex ${positionClasses[position]} ${backdropClassName}`}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'popup-title' : undefined}
    >
      {/* Backdrop with fade animation */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          animationState === 'entered' ? 'bg-black/50' : 'bg-black/0'
        }`}
      />

      {/* Popup container */}
      <div
        ref={popupRef}
        className={`
          relative bg-[#FEFCF8] rounded-lg shadow-xl
          ${sizeClasses[size]} w-full
          ${padding ? 'p-6' : ''}
          ${getAnimationClasses()}
          ${className}
        `}
        style={{ maxHeight }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-10 h-10 bg-transparent hover:bg-[#F5F1EB] text-[#6B5B4F] hover:text-[#4A3F35] rounded-full flex items-center justify-center transition-all duration-200"
            aria-label="Fechar popup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Title (if provided) */}
        {title && (
          <h2 id="popup-title" className="text-xl font-bold text-[#4A3F35] mb-4 pr-8">
            {title}
          </h2>
        )}

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - 4rem)` }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
