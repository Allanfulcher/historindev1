'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { useHistorias } from '../hooks/useLegacyData';
import { Historia, Rua as RuaType } from '../types';

interface PreviewContent {
  type: 'rua' | 'historia';
  title: string;
  description: string;
  images: string[];
  ruaId: string;
  historiaId?: string;
}

interface MapViewProps {
  setSelectedRuaId: (id: string) => void;
  setPreviewContent: (content: PreviewContent) => void;
  ruas?: RuaType[];
  onStreetClick?: (rua: RuaType, historia?: Historia) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  setSelectedRuaId, 
  setPreviewContent,
  ruas = [],
  onStreetClick
}) => {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);
  
  const { getByRuaId: getHistoriasByRuaId } = useHistorias();

  // Ensure we're on the client side and load Leaflet
  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Leaflet only on client side
    const loadLeaflet = async () => {
      if (typeof window !== 'undefined') {
        const leaflet = await import('leaflet');
        
        // Fix for default markers in Next.js
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        });
        
        setL(leaflet);
      }
    };
    
    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!isClient || !L) return;

    // Initialize the map only once, centered on Gramado coordinates
    mapRef.current = L.map('map', { zoomControl: false }).setView([-29.368110031921475, -50.83614840951764], 12);
    
    // Add OpenStreetMap tiles with proper attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add initial markers
    addMarkers();

    // Fix for map rendering issues - invalidate size after a short delay
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 100);

    // Add resize observer to handle dynamic container size changes
    let resizeObserver: ResizeObserver | null = null;
    if (mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      // Cleanup resize observer
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      // Remove the map when component is unmounted
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [isClient, L]);

  useEffect(() => {
    // Update markers when component loads
    if (isClient && L && mapRef.current) {
      addMarkers();
    }
  }, [isClient, L]);

  const recenterMap = () => {
    if (mapRef.current) {
      mapRef.current.setView([-29.368110031921475, -50.83614840951764], 12);
    }
  };

  const addMarkers = () => {
    if (!L || !mapRef.current) return;

    // Remove all existing markers from the map before adding new ones
    markersRef.current.forEach(marker => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Icon for streets
    const ruaIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
      shadowSize: [41, 41]
    });

    ruas.forEach(rua => {
      // Validate coordinates
      if (
        rua.coordenadas &&
        Array.isArray(rua.coordenadas) &&
        rua.coordenadas.length === 2 &&
        typeof rua.coordenadas[0] === 'number' &&
        typeof rua.coordenadas[1] === 'number'
      ) {
        const marker = L.marker(rua.coordenadas, { icon: ruaIcon }).addTo(mapRef.current);
        
        // Add click event to trigger external popup
        marker.on('click', () => {
          const historias = getHistoriasByRuaId(rua.id);
          const firstHistoria = historias.length > 0 ? historias[0] : undefined;
          
          if (onStreetClick) {
            onStreetClick(rua, firstHistoria);
          }
        });

        markersRef.current.push(marker);
      } else {
        console.warn(`Rua "${rua.nome}" não possui coordenadas válidas e foi ignorada.`);
      }
    });
  };

  // Don't render the map on server side
  if (!isClient) {
    return (
      <div className="map-container relative h-96 bg-gray-200 flex items-center justify-center">
        <p>Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div ref={mapContainerRef} className="map-container relative h-96 w-full z-0">
      {/* Recenter button in the top right corner */}
      <div className="absolute top-2 right-2 z-[1000]">
        <button
          onClick={recenterMap}
          className="px-3 py-2 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          title="Recentrar mapa em Gramado"
          style={{ zIndex: 1000 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </button>
      </div>
      
      {/* Map div where the map will be rendered */}
      <div id="map" className="h-full w-full rounded-lg"></div>
    </div>
  );
};

export default MapView;
