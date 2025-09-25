"use client";

import React from "react";

export function ActionsBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={("flex items-center gap-3 flex-wrap " + (className ?? "")).trim()}>
      {children}
    </div>
  );
}

export function PrimaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={("px-4 py-2 rounded bg-[#8B4513] text-white hover:bg-[#A0522D] transition disabled:opacity-60 " + (className ?? "")).trim()}>{children}</button>
  );
}

export function SecondaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={("px-4 py-2 rounded bg-transparent hover:bg-[#F5F1EB] text-[#6B5B4F] border border-[#F5F1EB] transition disabled:opacity-60 " + (className ?? "")).trim()}>{children}</button>
  );
}

export function DangerButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={("px-2.5 py-1.5 rounded bg-[#A0522D] text-white hover:bg-[#8B4513] transition disabled:opacity-60 " + (className ?? "")).trim()}>{children}</button>
  );
}
