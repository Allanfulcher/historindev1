/**
 * UI COMPONENTS - EXPORT INDEX
 * 
 * Centralized exports for all UI components in Historin.
 * Import from this file for cleaner imports throughout the app.
 */

// Popup System
export { default as Popup } from './Popup';
export type { PopupProps, PopupPosition, PopupSize, PopupAnimation } from './Popup';

export {
  ImagePopup,
  ConfirmationPopup,
  InfoPopup,
  LinkPopup,
  CustomContentPopup,
  LoadingPopup,
} from './PopupVariants';

export type {
  ImagePopupProps,
  ConfirmationPopupProps,
  InfoPopupProps,
  LinkPopupProps,
  CustomContentPopupProps,
  LoadingPopupProps,
  LinkItem,
} from './PopupVariants';

// Ad Quiz Popup (Interactive Advertisement)
export { AdQuizPopup } from './AdQuizPopup';
export type { AdQuizPopupProps } from './AdQuizPopup';

// Toast Notifications
export { ToastProvider, useToast } from './Toast';

// Skeleton Loaders
export { 
  Skeleton, 
  SkeletonCard, 
  SkeletonHistoriaCard, 
  SkeletonStreetCard, 
  SkeletonMapView 
} from './Skeleton';

// Empty States
export { 
  default as EmptyState,
  EmptyQuiz,
  EmptyHistorias,
  EmptySearch,
  EmptyQRHunt,
} from './EmptyState';

// Badge Components
export { 
  default as Badge,
  CountBadge,
  StatusBadge,
  YearBadge,
} from './Badge';

// Avatar Component
export { default as Avatar } from './Avatar';
