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
