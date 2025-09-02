import React from 'react';
import RuaHistoria from '../../../../../components/ruas/RuaHistoria';

export default function RuaHistoriaPage() {
  // Don't pass scrollToHistoriaId from URL - only trigger auto-scroll via explicit navigation
  return <RuaHistoria />;
}
