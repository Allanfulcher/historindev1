'use client';

import React from 'react';

interface PreviewContent {
  type: 'rua' | 'historia';
  title: string;
  content: string;
  image?: string;
}

interface PreviewProps {
  content: PreviewContent | null;
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{content.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {content.image && (
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <p className="text-gray-700 leading-relaxed">{content.content}</p>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tipo:</strong> {content.type === 'rua' ? 'Rua' : 'História'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
