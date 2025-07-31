'use client';

import React from 'react';

interface Column {
  accessor: string;
  header?: string;
}

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[];
  columns: Column[];
}

const DataModal: React.FC<DataModalProps> = ({ isOpen, onClose, title, data, columns }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
        <div className="max-h-64 overflow-y-auto">
          <ul>
            {data.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b">
                {columns.map((column, colIndex) => (
                  <span key={colIndex} className="w-1/2">{item[column.accessor]}</span>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Total de {title.toLowerCase()}: <span className="font-bold">{data.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataModal;
