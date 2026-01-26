"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {

  // Initialize state variables for BACK END

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

  async function handleSignup() {
    setError(null);
    if (!email || !password) {
      setError("Por favor completa correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Error al crear cuenta");
        setLoading(false);
        return;
      }

      // Success — navigate to login page
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Error de red al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] border border-[#f4d3b2] bg-white p-8 shadow-[0_25px_80px_-50px_rgba(228,82,140,0.35)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">
            BienVenidos
          </p>
          <h1 className="text-3xl font-semibold text-[#12376c]">
            Crear cuenta
          </h1>
          <p className="text-sm text-[#1b3f7a]/70">
            Registro simple para unirte a la comunidad con invitación.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm text-[#1b3f7a]">
            Nombre completo
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="Ana Rodríguez"
              type="text"
            />
          </label>
          <label className="block text-sm text-[#1b3f7a]">
            Correo electrónico
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="ana@bienvenidos.com"
              type="email"
            />
          </label>
          <label className="block text-sm text-[#1b3f7a]">
            Crear contraseña
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="••••••••"
              type="password"
            />
          </label>
          <label className="block text-sm text-[#1b3f7a]">
            Código de invitación
            <input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="INV-2026"
              type="text"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            className="w-full rounded-full bg-[#e4528c] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(228,82,140,0.6)] transition hover:-translate-y-0.5 hover:bg-[#f0679c] disabled:opacity-60"
            type="button"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"} {/** Crear cuenta button */}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#1b3f7a]/70">
          ¿Ya tienes acceso?{" "}
          <Link
            className="font-semibold text-[#1aa1d5] hover:text-[#1693c2]"
            href="/login"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
