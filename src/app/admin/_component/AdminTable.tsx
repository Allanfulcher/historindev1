"use client";

import React from "react";

type Column = {
  key: string;
  label: string;
  className?: string;
};

type AdminTableProps = {
  columns: Column[];
  children: React.ReactNode; // <tbody> rows
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  // Optional CSV actions
  onExportCSV?: () => void;
  onImportCSV?: (file: File) => void;
};

export default function AdminTable({ columns, children, className, headerClassName, bodyClassName, onExportCSV, onImportCSV }: AdminTableProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file && onImportCSV) onImportCSV(file);
    // reset input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={("overflow-x-auto " + (className ?? "")).trim()}>
      {(onExportCSV || onImportCSV) && (
        <div className="flex items-center justify-end gap-2 mb-2">
          {onImportCSV && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleImportClick}
                className="text-xs bg-[#8B4513] text-white px-3 py-1 rounded hover:bg-[#A0522D] transition"
              >
                Importar CSV
              </button>
            </>
          )}
          {onExportCSV && (
            <button
              type="button"
              onClick={onExportCSV}
              className="text-xs bg-[#6B8E23] text-white px-3 py-1 rounded hover:bg-[#556B2F] transition"
            >
              Exportar CSV
            </button>
          )}
        </div>
      )}
      <table className="min-w-full text-sm border border-[#F5F1EB] rounded-lg overflow-hidden">
        <thead className={("bg-[#F5F1EB] text-[#4A3F35] " + (headerClassName ?? "")).trim()}>
          <tr className="text-left">
            {columns.map((c) => (
              <th key={c.key} className={("py-2 pr-3 pl-3 " + (c.className ?? "")).trim()}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className={("divide-y divide-[#F5F1EB] " + (bodyClassName ?? "")).trim()}>
          {children}
        </tbody>
      </table>
    </div>
  );
}
