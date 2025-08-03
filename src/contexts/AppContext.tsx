'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppData, PreviewContent } from '../types';
import { sampleData } from '../data/sampleData';

// Context for application data
interface AppContextType {
  data: AppData;
  setData: (data: AppData) => void;
}

// Context for UI state
interface UIContextType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  previewContent: PreviewContent | null;
  setPreviewContent: (content: PreviewContent | null) => void;
  selectedRuaId: string | null;
  setSelectedRuaId: (id: string | null) => void;
  showSteps: boolean;
  setShowSteps: (show: boolean) => void;
  // Popup states
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  showDonation: boolean;
  setShowDonation: (show: boolean) => void;
  showFeedback: boolean;
  setShowFeedback: (show: boolean) => void;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

// Create contexts
const AppContext = createContext<AppContextType | undefined>(undefined);
const UIContext = createContext<UIContextType | undefined>(undefined);

// Context providers
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(sampleData);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);
  const [selectedRuaId, setSelectedRuaId] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  
  // Popup states
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showDonation, setShowDonation] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <UIContext.Provider value={{
      menuOpen, setMenuOpen,
      showMap, setShowMap,
      previewContent, setPreviewContent,
      selectedRuaId, setSelectedRuaId,
      showSteps, setShowSteps,
      showOnboarding, setShowOnboarding,
      showDonation, setShowDonation,
      showFeedback, setShowFeedback,
      showPopup, setShowPopup,
    }}>
      {children}
    </UIContext.Provider>
  );
};

// Custom hooks for using contexts
export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

// Combined provider for convenience
export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <UIProvider>
        {children}
      </UIProvider>
    </AppProvider>
  );
};
