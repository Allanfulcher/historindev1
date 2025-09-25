"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminSession, isAdminAuthenticated, logoutAdmin } from "@/utils/adminApi";
import { useRouter } from "next/navigation";

type AdminHeaderProps = {
  title: string;
  className?: string;
};

export default function AdminHeader({ title, className }: AdminHeaderProps) {
  const router = useRouter();
  const [remainingMs, setRemainingMs] = useState<number>(getAdminSession()?.remainingMs ?? 0);

  useEffect(() => {
    // If not authenticated, redirect to /admin
    if (!isAdminAuthenticated()) {
      router.replace("/admin");
      return;
    }
    const id = setInterval(() => {
      const s = getAdminSession();
      setRemainingMs(s?.remainingMs ?? 0);
      if (!s) {
        router.replace("/admin");
      }
    }, 1000);
    return () => clearInterval(id);
  }, [router]);

  return (
    <div className={"flex items-center justify-between " + (className ?? "") }>
      <h1 className="text-2xl font-bold tracking-tight text-[#4A3F35]">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#A0958A]">
          Sessão: {Math.max(0, Math.floor(remainingMs / 60000))}:{String(Math.max(0, Math.floor((remainingMs % 60000) / 1000))).padStart(2, '0')}
        </span>
        <button
          onClick={() => { logoutAdmin(); router.replace('/admin'); }}
          className="px-3 py-1 rounded-md bg-[#8B4513] text-white hover:bg-[#A0522D] transition"
        >
          Logout
        </button>
        <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin">Voltar para Admin</Link>
      </div>
    </div>
  );
}
