"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function HeaderAuth() {
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    api.me().then(u => { if (mounted) setUser(u); }).catch(() => { if (mounted) setUser(null); });
    return () => { mounted = false; };
  }, []);

  async function doLogout() {
    await api.logout();
    setUser(null);
    // page reload to clear client state
    window.location.href = '/';
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1b3f7a] transition hover:text-[#0f2d57]" href="/login">Conectar-se</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm text-[#1b3f7a]">
      <span className="font-medium">{user.email}</span>
      <button onClick={doLogout} className="rounded px-3 py-1 text-xs border">Salir</button>
    </div>
  );
}
