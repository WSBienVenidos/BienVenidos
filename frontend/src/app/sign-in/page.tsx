"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";

export default function SignInPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (!email || !password) { setError("Email and password are required"); return; }
    setLoading(true);
    try {
      const res = await api.signup(email, password);
      // backend sets HttpOnly cookie; rely on cookie-based auth
      try { await api.me(); } catch {}
      router.push('/');
    } catch (err: any) {
      if (err?.body?.error) setError(err.body.error);
      else setError('Signup failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] border border-[#f4d3b2] bg-white p-8 shadow-[0_25px_80px_-50px_rgba(228,82,140,0.35)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">BienVenidos</p>
          <h1 className="text-3xl font-semibold text-[#12376c]">Crear cuenta</h1>
          <p className="text-sm text-[#1b3f7a]/70">Registro simple para unirte a la comunidad con invitación.</p>
        </div>

        <div className="mt-6">
          {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <label className="block text-sm text-[#1b3f7a]">Nombre completo
            <input value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40" placeholder="Ana Rodríguez" type="text" />
          </label>

          <label className="block mt-3 text-sm text-[#1b3f7a]">Correo electrónico
            <input value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40" placeholder="ana@bienvenidos.com" type="email" />
          </label>

          <label className="block mt-3 text-sm text-[#1b3f7a]">Crear contraseña
            <input value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40" placeholder="••••••••" type="password" />
          </label>

          <label className="block mt-3 text-sm text-[#1b3f7a]">Código de invitación
            <input value={invite} onChange={e => setInvite(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40" placeholder="INV-2026" type="text" />
          </label>

          <button disabled={loading} onClick={submit} className="mt-6 w-full rounded-full bg-[#e4528c] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(228,82,140,0.6)] transition hover:-translate-y-0.5 hover:bg-[#f0679c]">{loading ? 'Creando...' : 'Crear cuenta'}</button>
        </div>

        <p className="mt-6 text-sm text-[#1b3f7a]/70">¿Ya tienes acceso?{' '}
          <Link className="font-semibold text-[#1aa1d5] hover:text-[#1693c2]" href="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
