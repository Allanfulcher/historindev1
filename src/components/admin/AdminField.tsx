"use client";

import React from "react";

const baseInput = "shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]";

type CommonProps = {
  label: string;
  hint?: string;
  containerClassName?: string;
  labelClassName?: string;
};

export function AdminInput({ label, hint, containerClassName, labelClassName, ...props }: CommonProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={containerClassName}>
      <label className={("block text-[#4A3F35] text-sm font-bold mb-1 " + (labelClassName ?? "")).trim()}>{label}</label>
      <input {...props} className={baseInput + (props.className ? ` ${props.className}` : "")} />
      {hint && <div className="text-xs text-[#A0958A] mt-1">{hint}</div>}
    </div>
  );
}

export function AdminTextarea({ label, hint, containerClassName, labelClassName, ...props }: CommonProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={containerClassName}>
      <label className={("block text-[#4A3F35] text-sm font-bold mb-1 " + (labelClassName ?? "")).trim()}>{label}</label>
      <textarea {...props} className={baseInput + (props.className ? ` ${props.className}` : "")} />
      {hint && <div className="text-xs text-[#A0958A] mt-1">{hint}</div>}
    </div>
  );
}

export function AdminSelect({ label, hint, containerClassName, labelClassName, children, ...props }: CommonProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={containerClassName}>
      <label className={("block text-[#4A3F35] text-sm font-bold mb-1 " + (labelClassName ?? "")).trim()}>{label}</label>
      <select {...props} className={baseInput + (props.className ? ` ${props.className}` : "")}>
        {children}
      </select>
      {hint && <div className="text-xs text-[#A0958A] mt-1">{hint}</div>}
    </div>
  );
}
