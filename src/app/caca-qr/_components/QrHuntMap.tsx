'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { QrCode } from '@/types/database.types';

interface QrHuntMapProps {
  qrCodes: QrCode[];
  scannedIds: string[];
}

export default function QrHuntMap({ qrCodes, scannedIds }: QrHuntMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Gramado
    const map = L.map(mapContainerRef.current).setView([-29.3681, -50.8361], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add markers for each QR code
    qrCodes.forEach((qr) => {
      if (!mapRef.current) return;

      const coords = qr.coordinates as { lat: number; lng: number };
      const isScanned = scannedIds.includes(qr.id);

      // Create custom icon based on scan status
      const iconHtml = isScanned
        ? `<div style="background-color: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
               <polyline points="20 6 9 17 4 12"></polyline>
             </svg>
           </div>`
        : `<div style="background-color: #8B4513; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
               <rect x="3" y="3" width="7" height="7"></rect>
               <rect x="14" y="3" width="7" height="7"></rect>
               <rect x="14" y="14" width="7" height="7"></rect>
               <rect x="3" y="14" width="7" height="7"></rect>
             </svg>
           </div>`;

      const icon = L.divIcon({
        html: iconHtml,
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([coords.lat, coords.lng], { icon }).addTo(mapRef.current);

      // Add popup
      const popupContent = `
        <div style="text-align: center;">
          <strong style="color: #4A3F35;">${qr.name}</strong>
          ${qr.description ? `<p style="margin: 4px 0; font-size: 12px; color: #6B5B4F;">${qr.description}</p>` : ''}
          <p style="margin: 4px 0; font-size: 12px; font-weight: bold; color: ${isScanned ? '#10b981' : '#8B4513'};">
            ${isScanned ? '✓ Escaneado' : '○ Não escaneado'}
          </p>
        </div>
      `;
      marker.bindPopup(popupContent);
    });

    // Fit bounds to show all markers
    if (qrCodes.length > 0) {
      const bounds = L.latLngBounds(
        qrCodes.map((qr) => {
          const coords = qr.coordinates as { lat: number; lng: number };
          return [coords.lat, coords.lng] as [number, number];
        })
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [qrCodes, scannedIds]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="w-full h-96 rounded-lg"
        style={{ zIndex: 0 }}
      />
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#8B4513] border-2 border-white shadow"></div>
          <span className="text-[#6B5B4F]">Não escaneado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow"></div>
          <span className="text-[#6B5B4F]">Escaneado</span>
        </div>
      </div>
    </div>
  );
}
