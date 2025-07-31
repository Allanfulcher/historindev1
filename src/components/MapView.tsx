'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// Define interfaces for the data structures
interface Rua {
  id: string;
  nome: string;
  descricao?: string;
  coordenadas?: [number, number];
}

interface Historia {
  id: string;
  rua_id: string;
  titulo: string;
  descricao: string;
  fotos: string[];
  coordenadas?: [number, number];
}

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
  ruas?: Rua[];
  historias?: Historia[];
}

const MapView: React.FC<MapViewProps> = ({ 
  setSelectedRuaId, 
  setPreviewContent,
  ruas = [],
  historias = []
}) => {
  const [selectedType, setSelectedType] = useState<'ruas' | 'historias'>('ruas');
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);

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
    mapRef.current = L.map('map').setView([-29.368110031921475, -50.83614840951764], 12);
    
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
    // Update markers whenever the selected type (ruas or historias) changes
    if (isClient && L && mapRef.current) {
      addMarkers();
    }
  }, [selectedType, isClient, L]);

  const addMarkers = () => {
    if (!L || !mapRef.current) return;

    // Remove all existing markers from the map before adding new ones
    markersRef.current.forEach(marker => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    if (selectedType === 'ruas') {
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
          marker.bindPopup(`
            <b>${rua.nome}</b><br>
            <a href="https://www.google.com/maps?q=${rua.coordenadas[0]},${rua.coordenadas[1]}" target="_blank">
              Ver no Google Maps
            </a>
          `);

          marker.on('click', () => {
            setSelectedRuaId(rua.id);
            setPreviewContent({
              type: 'rua',
              title: rua.nome,
              description: rua.descricao || '',
              images: historias.filter(h => h.rua_id === rua.id).flatMap(h => h.fotos),
              ruaId: rua.id,
            });
          });

          markersRef.current.push(marker);
        } else {
          console.warn(`Rua "${rua.nome}" não possui coordenadas válidas e foi ignorada.`);
        }
      });
    } else if (selectedType === 'historias') {
      // Icon for stories
      const historiaIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        shadowSize: [41, 41]
      });

      historias.forEach(historia => {
        // Validate coordinates
        if (
          historia.coordenadas &&
          Array.isArray(historia.coordenadas) &&
          historia.coordenadas.length === 2 &&
          typeof historia.coordenadas[0] === 'number' &&
          typeof historia.coordenadas[1] === 'number'
        ) {
          const marker = L.marker(historia.coordenadas, { icon: historiaIcon }).addTo(mapRef.current);
          marker.bindPopup(`
            <b>${historia.titulo}</b><br>
            <a href="https://www.google.com/maps?q=${historia.coordenadas[0]},${historia.coordenadas[1]}" target="_blank">
              Ver no Google Maps
            </a>
          `);

          marker.on('click', () => {
            setSelectedRuaId(historia.rua_id);
            setPreviewContent({
              type: 'historia',
              title: historia.titulo,
              description: historia.descricao,
              images: historia.fotos,
              historiaId: historia.id,
              ruaId: historia.rua_id,
            });
          });

          markersRef.current.push(marker);
        } else {
          console.warn(`História "${historia.titulo}" não possui coordenadas válidas e foi ignorada.`);
        }
      });
    }
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
    <div ref={mapContainerRef} className="map-container relative h-96 w-full">
      {/* Buttons in the top left corner to toggle between street and story markers */}
      <div className="absolute top-2 left-2 z-50">
        <button
          onClick={() => setSelectedType('ruas')}
          className={`px-4 py-2 ${
            selectedType === 'ruas' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          } rounded-l-md border border-gray-300 hover:bg-blue-100 transition-colors duration-200`}
        >
          Ruas
        </button>
        <button
          onClick={() => setSelectedType('historias')}
          className={`px-4 py-2 ${
            selectedType === 'historias' ? 'bg-[#cb2940] text-white' : 'bg-white text-black'
          } rounded-r-md border border-gray-300 hover:bg-red-100 transition-colors duration-200`}
        >
          Histórias
        </button>
      </div>
      {/* Map div where the map will be rendered */}
      <div id="map" className="h-full w-full rounded-lg"></div>
    </div>
  );
};

export default MapView;
