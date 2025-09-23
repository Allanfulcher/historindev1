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
};

export default function AdminTable({ columns, children, className, headerClassName, bodyClassName }: AdminTableProps) {
  return (
    <div className={("overflow-x-auto " + (className ?? "")).trim()}>
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
