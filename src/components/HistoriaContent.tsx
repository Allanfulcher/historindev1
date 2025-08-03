'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Historia, Rua, Cidade, Organizacao, Negocio } from '../types';

// Types for component props
interface HistoriaContentProps {
  currentHistory: Historia | null;
  historiasDaRua: Historia[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  setCurrentHistory: (historia: Historia) => void;
  showAllStories: boolean;
  setShowAllStories: (show: boolean) => void;
  selectedRuaId: string;
  activeTab: 'historia' | 'rua' | 'cidade';
  changeTab: (tab: 'historia' | 'rua' | 'cidade') => void;
  rua: Rua | null;
  cidade: Cidade | null;
  orgs: Organizacao[];
  negocios: Negocio[];
}

// Types for modal state
interface ModalState {
  isOpen: boolean;
  selectedImage: string | null;
  zoom: number;
  translateX: number;
  translateY: number;
}

// Types for drag state
interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  initialTranslateX: number;
  initialTranslateY: number;
}

// Custom hook for modal functionality
const useImageModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    selectedImage: null,
    zoom: 1,
    translateX: 0,
    translateY: 0,
  });

  const openModal = useCallback((imageUrl: string) => {
    setModalState({
      isOpen: true,
      selectedImage: imageUrl,
      zoom: 1,
      translateX: 0,
      translateY: 0,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      selectedImage: null,
      zoom: 1,
      translateX: 0,
      translateY: 0,
    });
  }, []);

  const updateZoom = useCallback((newZoom: number) => {
    setModalState(prev => ({ ...prev, zoom: newZoom }));
  }, []);

  const updateTranslate = useCallback((x: number, y: number) => {
    setModalState(prev => ({ ...prev, translateX: x, translateY: y }));
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    updateZoom,
    updateTranslate,
  };
};

// Custom hook for drag functionality
const useDragHandler = (
  modalState: ModalState,
  updateTranslate: (x: number, y: number) => void
) => {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialTranslateX: 0,
    initialTranslateY: 0,
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (modalState.zoom <= 1) return;
    
    dragStateRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialTranslateX: modalState.translateX,
      initialTranslateY: modalState.translateY,
    };
  }, [modalState.zoom, modalState.translateX, modalState.translateY]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragStateRef.current.isDragging) return;
    
    const deltaX = e.clientX - dragStateRef.current.startX;
    const deltaY = e.clientY - dragStateRef.current.startY;
    
    updateTranslate(
      dragStateRef.current.initialTranslateX + deltaX,
      dragStateRef.current.initialTranslateY + deltaY
    );
  }, [updateTranslate]);

  const handleMouseUp = useCallback(() => {
    dragStateRef.current.isDragging = false;
  }, []);

  useEffect(() => {
    if (dragStateRef.current.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [handleMouseMove, handleMouseUp]);

  return { handleMouseDown };
};

// Image Modal Component
const ImageModal: React.FC<{
  modalState: ModalState;
  closeModal: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
}> = ({ modalState, closeModal, handleMouseDown }) => {
  if (!modalState.isOpen || !modalState.selectedImage) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div className="relative max-w-full max-h-full">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300"
          aria-label="Fechar modal"
        >
          ×
        </button>
        <img
          src={modalState.selectedImage}
          alt="Imagem ampliada"
          className="max-w-full max-h-full cursor-move"
          style={{
            transform: `scale(${modalState.zoom}) translate(${modalState.translateX}px, ${modalState.translateY}px)`,
            transformOrigin: 'center center',
          }}
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </div>
    </div>
  );
};

// Navigation Component
const NavigationControls: React.FC<{
  currentIndex: number;
  totalStories: number;
  onPrevious: () => void;
  onNext: () => void;
  onRangeChange: (index: number) => void;
}> = ({ currentIndex, totalStories, onPrevious, onNext, onRangeChange }) => {
  if (totalStories <= 1) return null;

  return (
    <div className="flex items-center space-x-4 mb-4">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          {currentIndex + 1} de {totalStories}
        </span>
        <input
          type="range"
          min="0"
          max={totalStories - 1}
          value={currentIndex}
          onChange={(e) => onRangeChange(parseInt(e.target.value))}
          className="w-32"
        />
      </div>
      
      <button
        onClick={onNext}
        disabled={currentIndex === totalStories - 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  );
};

// Tab Navigation Component
const TabNavigation: React.FC<{
  activeTab: 'historia' | 'rua' | 'cidade';
  onTabChange: (tab: 'historia' | 'rua' | 'cidade') => void;
}> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'historia' as const, label: 'História' },
    { key: 'rua' as const, label: 'Rua' },
    { key: 'cidade' as const, label: 'Cidade' },
  ];

  return (
    <div className="w-full lg:py-4 flex justify-between items-center border-b border-gray-300">
      <div className="flex items-center space-x-4">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`px-4 py-2 font-semibold text-sm ${
              activeTab === key
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => onTabChange(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Image Gallery Component
const ImageGallery: React.FC<{
  images: string[];
  onImageClick: (imageUrl: string) => void;
}> = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onImageClick(image)}
        >
          <img
            src={image}
            alt={`Imagem ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
            <i className="fas fa-search-plus text-white text-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Main HistoriaContent Component
const HistoriaContent: React.FC<HistoriaContentProps> = ({
  currentHistory,
  historiasDaRua,
  currentIndex,
  setCurrentIndex,
  setCurrentHistory,
  selectedRuaId,
  activeTab,
  changeTab,
  rua,
  cidade,
  orgs,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const { modalState, openModal, closeModal, updateTranslate } = useImageModal();
  const { handleMouseDown } = useDragHandler(modalState, updateTranslate);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const newHistory = historiasDaRua[newIndex];
      router.replace(`/rua/${selectedRuaId}/historia/${newHistory.id}`);
      setCurrentHistory(newHistory);
      setCurrentIndex(newIndex);
      changeTab('historia');
    }
  }, [currentIndex, historiasDaRua, selectedRuaId, router, setCurrentHistory, setCurrentIndex, changeTab]);

  const handleNext = useCallback(() => {
    if (currentIndex < historiasDaRua.length - 1) {
      const newIndex = currentIndex + 1;
      const newHistory = historiasDaRua[newIndex];
      router.replace(`/rua/${selectedRuaId}/historia/${newHistory.id}`);
      setCurrentHistory(newHistory);
      setCurrentIndex(newIndex);
      changeTab('historia');
    }
  }, [currentIndex, historiasDaRua, selectedRuaId, router, setCurrentHistory, setCurrentIndex, changeTab]);

  const handleRangeChange = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < historiasDaRua.length) {
      const newHistory = historiasDaRua[newIndex];
      router.replace(`/rua/${selectedRuaId}/historia/${newHistory.id}`);
      setCurrentHistory(newHistory);
      setCurrentIndex(newIndex);
      changeTab('historia');
    }
  }, [historiasDaRua, selectedRuaId, router, setCurrentHistory, setCurrentIndex, changeTab]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Get organization data
  const org = currentHistory?.orgId 
    ? orgs.find((o) => o.id === currentHistory.orgId) 
    : null;

  // Early return if no history
  if (!currentHistory && activeTab === 'historia') {
    return (
      <div className="w-full py-4">
        <h2 className="text-xl font-bold">
          Nenhuma história disponível para esta rua.
        </h2>
      </div>
    );
  }

  return (
    <div className="main-content w-full flex flex-col items-center flex-grow overflow-y-auto">
      <TabNavigation activeTab={activeTab} onTabChange={changeTab} />
      
      {activeTab === 'historia' && currentHistory && (
        <div className="w-full max-w-4xl px-4 py-6">
          <NavigationControls
            currentIndex={currentIndex}
            totalStories={historiasDaRua.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onRangeChange={handleRangeChange}
          />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{currentHistory.titulo}</h1>
            <p className="text-gray-700 mb-6">{currentHistory.descricao}</p>
            
            {currentHistory.ano && (
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {currentHistory.ano}
                </span>
              </div>
            )}
            
            {currentHistory.personagens && currentHistory.personagens.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Personagens:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentHistory.personagens.map((personagem, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {personagem}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <ImageGallery
              images={currentHistory.fotos}
              onImageClick={openModal}
            />
            
            {org && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Organização:</h3>
                <p className="font-medium">{org.nome}</p>
                <p className="text-gray-600">{org.descricao}</p>
                <p className="text-sm text-gray-500">{org.endereco}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'rua' && rua && (
        <div className="w-full max-w-4xl px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{rua.nome}</h1>
            {rua.descricao && (
              <p className="text-gray-700 mb-6">{rua.descricao}</p>
            )}
            <ImageGallery
              images={rua.fotos ? [rua.fotos] : []}
              onImageClick={openModal}
            />
          </div>
        </div>
      )}
      
      {activeTab === 'cidade' && cidade && (
        <div className="w-full max-w-4xl px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{cidade.nome}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <strong>Estado:</strong> {cidade.estado}
                </p>
                <p className="text-gray-600">
                  <strong>População:</strong> {cidade.populacao}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ImageModal
        modalState={modalState}
        closeModal={closeModal}
        handleMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default HistoriaContent;

// Export to window object for global access (for legacy compatibility)
if (typeof window !== 'undefined') {
  (window as any).HistoriaContent = HistoriaContent;
}
