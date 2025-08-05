'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AppData } from '../types';
import Home from './Home';
import { Preview } from './Preview';

interface AppProps {
  data: AppData;
}

interface PreviewContent {
  type: 'rua' | 'historia';
  title: string;
  content: string;
  image?: string;
}

// App Component - Clean, modern main application component
export const App: React.FC<AppProps> = ({ data }) => {
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);
  const pathname = usePathname();

  // Handle preview opening
  const handlePreviewOpen = (content: PreviewContent) => {
    setPreviewContent(content);
  };

  // Handle preview closing
  const handlePreviewClose = () => {
    setPreviewContent(null);
  };

  return (
    <div className="min-h-screen">
      {/* Main Content - For now just showing Home page */}
      {pathname === '/' && (
        <Home data={data} onPreviewOpen={handlePreviewOpen} />
      )}
      
      {/* Other routes can be added here later */}
      {pathname !== '/' && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Página em Desenvolvimento</h1>
            <p className="text-gray-600">Esta página será implementada em breve.</p>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <Preview content={previewContent} onClose={handlePreviewClose} />
    </div>
  );
};

export default App;
