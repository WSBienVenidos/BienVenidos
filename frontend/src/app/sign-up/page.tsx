"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type FieldErrors = Record<string, string>;

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite") ?? "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingInvite, setCheckingInvite] = useState(true);
  const [inviteValid, setInviteValid] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    let cancelled = false;

    async function checkInvite() {
      if (!inviteToken) {
        if (!cancelled) {
          setInviteValid(false);
          setCheckingInvite(false);
          setGenericError("Este enlace de invitacion es invalido.");
        }
        return;
      }

      const result = await api.validateInvite(inviteToken);
      if (cancelled) return;
      setInviteValid(result.valid);
      setCheckingInvite(false);
      if (!result.valid) {
        setGenericError("Este enlace ya fue usado o vencio.");
      }
    }

    checkInvite().catch(() => {
      if (!cancelled) {
        setInviteValid(false);
        setCheckingInvite(false);
        setGenericError("No se pudo validar la invitacion.");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [inviteToken]);

  async function handleSignup() {
    setGenericError(null);
    setFieldErrors({});

    if (!inviteToken) {
      setGenericError("Este enlace de invitacion es invalido.");
      return;
    }
    if (!email) {
      setGenericError("Por favor proporciona un correo electronico.");
      return;
    }
    if (!phone) {
      setGenericError("Por favor proporciona un numero de telefono.");
      return;
    }
    if (!password) {
      setGenericError("Por favor proporciona una contrasena.");
      return;
    }

    setLoading(true);
    try {
      await api.signup({
        email,
        phone: phone.replace(/\D/g, ""),
        password,
        firstName,
        lastName,
        inviteToken,
      });
      router.push("/login");
    } catch (err) {
      const apiError = err as { body?: { error?: string; fields?: FieldErrors } };
      if (apiError?.body?.fields) {
        setFieldErrors(apiError.body.fields);
      }
      setGenericError(apiError?.body?.error ?? "Error al crear cuenta");
    } finally {
      setLoading(false);
    }
  }

  if (checkingInvite) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-[#1b3f7a]/70">Validando invitacion...</p>
      </div>
    );
  }

  if (!inviteValid) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-md rounded-[32px] border border-[#f4d3b2] bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold text-[#12376c]">Invitacion invalida</h1>
          <p className="mt-2 text-sm text-[#1b3f7a]/70">
            {genericError ?? "Este enlace no es valido para crear cuenta."}
          </p>
          <Link className="mt-5 inline-block text-sm font-semibold text-[#1aa1d5]" href="/login">
            Ir a iniciar sesion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] border border-[#f4d3b2] bg-white p-8 shadow-[0_25px_80px_-50px_rgba(228,82,140,0.35)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">BienVenidos</p>
          <h1 className="text-3xl font-semibold text-[#12376c]">Crear cuenta</h1>
          <p className="text-sm text-[#1b3f7a]/70">Registro con enlace de invitacion de un solo uso.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={e => e.preventDefault()}>
          {genericError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {genericError}
            </div>
          ) : null}

          <label className="block text-sm text-[#1b3f7a]">
            Nombre
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="Ana"
              type="text"
            />
            {fieldErrors.firstName ? <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p> : null}
          </label>

          <label className="block text-sm text-[#1b3f7a]">
            Apellido
            <input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="Rodriguez"
              type="text"
            />
            {fieldErrors.lastName ? <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p> : null}
          </label>

          <label className="block text-sm text-[#1b3f7a]">
            Correo electronico
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="ana@bienvenidos.com"
              type="email"
            />
            {fieldErrors.email ? <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p> : null}
          </label>

          <label className="block text-sm text-[#1b3f7a]">
            Numero de telefono (min. 10 digitos)
            <input
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="18015551234"
              type="tel"
            />
            {fieldErrors.phone ? <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p> : null}
          </label>

          <label className="block text-sm text-[#1b3f7a]">
            Crear contrasena
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#e4528c]/40"
              placeholder="********"
              type="password"
            />
            {fieldErrors.password ? <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p> : null}
          </label>

          <button
            className="w-full rounded-full bg-[#e4528c] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(228,82,140,0.6)] transition hover:-translate-y-0.5 hover:bg-[#f0679c] disabled:opacity-60"
            type="button"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#1b3f7a]/70">
          Ya tienes acceso?{" "}
          <Link className="font-semibold text-[#1aa1d5] hover:text-[#1693c2]" href="/login">
            Iniciar sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
