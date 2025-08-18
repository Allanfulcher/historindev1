'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { AppProviders } from '../../../../../contexts/AppContext';
import RuaHistoria from '../../../../../components/ruas/RuaHistoria';
import { sampleData } from '../../../../../data/sampleData';

// Dynamic page for individual rua/historia combinations
export default function RuaHistoriaPage() {
  const params = useParams();
  const ruaId = params.ruaId as string;
  const historiaId = params.historiaId as string;

  return (
    <AppProviders>
      <RuaHistoria 
        data={sampleData}
        initialRuaId={ruaId}
        initialHistoriaId={historiaId}
      />
    </AppProviders>
  );
}
