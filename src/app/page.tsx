'use client';

import React from 'react';
import { AppProviders } from '../contexts/AppContext';
import { App } from '../components/App';
import { sampleData } from '../data/sampleData';
import HashRouteHandler from '../components/HashRouteHandler';
import GoogleAnalytics from '../components/GoogleAnalytics';

// Main page component - clean and simple
export default function HistorinPage() {
  return (
    <>
      <GoogleAnalytics />
      <HashRouteHandler>
        <AppProviders>
          <App data={sampleData} />
        </AppProviders>
      </HashRouteHandler>
    </>
  );
}
