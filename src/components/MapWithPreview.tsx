'use client';

import React, { useState } from 'react';
import MapView from './MapView';
import StreetPreviewPopup from './StreetPreviewPopup';
import { Historia, Rua as RuaType, PreviewContent } from '../types';

interface MapWithPreviewProps {
  ruas?: RuaType[];
  historias?: Historia[];
  setSelectedRuaId: (id: string) => void;
  setPreviewContent: (content: PreviewContent) => void;
}

const MapWithPreview: React.FC<MapWithPreviewProps> = ({
  ruas = [],
  historias = [],
  setSelectedRuaId,
  setPreviewContent
}) => {
  const [selectedStreet, setSelectedStreet] = useState<{
    rua: RuaType;
    historia?: Historia;
  } | null>(null);

  const handleStreetClick = (rua: RuaType, historia?: Historia) => {
    setSelectedStreet({ rua, historia });
  };

  const handleClosePopup = () => {
    setSelectedStreet(null);
  };

  const handleNavigateToStreet = (ruaId: string) => {
    // Ensure ruaId is properly converted to string
    const safeRuaId = String(ruaId);
    console.log('Navigating to rua:', safeRuaId); // Debug log
    window.location.href = `/rua/${safeRuaId}`;
  };

  return (
    <>
      <MapView
        ruas={ruas}
        setSelectedRuaId={setSelectedRuaId}
        setPreviewContent={setPreviewContent}
        onStreetClick={handleStreetClick}
      />
      
      {selectedStreet && (
        <StreetPreviewPopup
          rua={selectedStreet.rua}
          historia={selectedStreet.historia}
          historias={historias}
          isVisible={!!selectedStreet}
          onClose={handleClosePopup}
          onNavigate={handleNavigateToStreet}
        />
      )}
    </>
  );
};

export default MapWithPreview;
