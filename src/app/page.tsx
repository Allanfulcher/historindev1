'use client';

import React from 'react';
import { AppProviders } from '../contexts/AppContext';
import { App } from '../components/App';
import { sampleData } from '../data/sampleData';

// Main page component - clean and simple
export default function HistorinPage() {
  return (
    <AppProviders>
      <App data={sampleData} />
    </AppProviders>
  );
}
