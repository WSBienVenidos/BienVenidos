"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.login(email, password);
      // The backend sets an HttpOnly cookie; we rely on cookie-based auth now.
      try { await api.me(); } catch {}
      router.push("/users");
    } catch (err: any) {
      if (err?.body?.error) setError(err.body.error);
      else setError("Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] border border-[#f4d3b2] bg-white p-8 shadow-[0_25px_80px_-50px_rgba(26,161,213,0.35)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">BienVenidos</p>
          <h1 className="text-3xl font-semibold text-[#12376c]">Iniciar sesión</h1>
          <p className="text-sm text-[#1b3f7a]/70">Accede con tu correo y contraseña.</p>
        </div>

        <div className="mt-6">
          {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <label className="block text-sm text-[#1b3f7a]">
            Correo electrónico
            <input value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40" placeholder="tucorreo@bienvenidos.com" type="email" />
          </label>

          <label className="block mt-3 text-sm text-[#1b3f7a]">
            Contraseña
            <input value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40" placeholder="••••••••" type="password" />
          </label>

          <button disabled={loading} onClick={submit} className="mt-6 w-full rounded-full bg-[#1aa1d5] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(26,161,213,0.7)] transition hover:-translate-y-0.5 hover:bg-[#21b4e4]">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        <p className="mt-6 text-sm text-[#1b3f7a]/70">¿No tienes cuenta?{' '}
          <Link className="font-semibold text-[#e4528c] hover:text-[#c93f75]" href="/sign-in">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}
