'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import RuaHistoria from '../../../../../components/ruas/RuaHistoria';

export default function RuaHistoriaPage() {
  const params = useParams();
  const historiaId = Array.isArray(params?.historiaId) ? params.historiaId[0] : params?.historiaId;

  return <RuaHistoria scrollToHistoriaId={historiaId} />;
}
