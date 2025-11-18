"use client";

import React from "react";

type AdminSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AdminSection({ title, description, children, className }: AdminSectionProps) {
  return (
    <section className={("p-6 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg shadow-sm " + (className ?? "")).trim()}>
      <h2 className="text-lg font-semibold text-[#4A3F35]">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-[#A0958A]">{description}</p>
      )}
      <div className="mt-4 space-y-4">
        {children}
      </div>
    </section>
  );
}
