"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession, isAdminAuthenticated, logoutAdmin, setAdminSession } from "@/utils/adminApi";

export default function AdminHome() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const session = getAdminSession();
  const [remainingMs, setRemainingMs] = useState<number>(session?.remainingMs ?? 0);

  useEffect(() => {
    const id = setInterval(() => {
      const s = getAdminSession();
      setRemainingMs(s?.remainingMs ?? 0);
      if (!s) {
        // auto-logout UI state when expired
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const isAuthed = useMemo(() => isAdminAuthenticated(), [remainingMs]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setAdminSession(password.trim());
    // do not auto-navigate; allow admin to choose destination
  }

  function handleLogout() {
    logoutAdmin();
    setPassword("");
    setRemainingMs(0);
  }

  const minutes = Math.max(0, Math.floor(remainingMs / 60000));
  const seconds = Math.max(0, Math.floor((remainingMs % 60000) / 1000));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 text-[#6B5B4F]">
      <h1 className="text-2xl font-bold tracking-tight text-[#4A3F35]">Admin</h1>

      {!isAuthed ? (
        <form onSubmit={handleLogin} className="p-6 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-[#4A3F35]">Senha de ADM</h2>
          <p className="text-sm text-[#A0958A]">Forneça sua senha de ADM para acessar o painel. Sessão expira automaticamente após 10 minutos.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de ADM"
            className="w-full shadow appearance-none border border-[#F5F1EB] rounded px-3 py-2 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
            required
          />
          <button type="submit" className="px-4 py-2 rounded bg-[#8B4513] text-white hover:bg-[#A0522D] transition">Login</button>
        </form>
      ) : (
        <div className="p-6 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-[#4A3F35]">Sessão Ativa</h2>
          <p className="text-sm text-[#A0958A]">Você está logado. Auto-logout em {minutes}:{String(seconds).padStart(2, '0')}.</p>
          <div className="flex gap-3">
            <button onClick={handleLogout} className="px-4 py-2 rounded bg-transparent hover:bg-[#F5F1EB] text-[#6B5B4F] border border-[#8B4513] transition">Logout</button>
          </div>
        </div>
      )}

      <nav className="space-y-2 p-6 bg-[#FEFCF8] border border-[#F5F1EB] rounded-lg shadow-sm">
        <h2 className="font-semibold text-[#4A3F35]">Manage</h2>
        <ul className="list-disc list-inside">
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/questions">Quiz Questions</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/quiz-results">Quiz Results</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/popup-ads">Popup Ads (QR Codes)</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/sites">Sites</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/orgs">Organizations</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/autores">Autores</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/obras">Obras</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/negocios">Negócios</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/cidades">Cidades</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/ruas">Ruas</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/historias">Histórias</Link>
          </li>
          <li>
            <Link className="text-[#8B4513] hover:text-[#A0522D] underline" href="/admin/qr-codes">QR Codes (Caça ao QR)</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
