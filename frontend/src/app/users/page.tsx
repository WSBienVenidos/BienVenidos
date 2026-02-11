"use client";

import Link from "next/link";
import { useState } from "react";
import api, { type ApiError } from "@/lib/api";

function titleCase(s: string) {
  return s
    .replace(/[_\-.]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function UsersPage() {
  const email = "test1@gmail.com";
  const displayName = titleCase("rosa");
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);
  const [inviteLoading, setInviteLoading] = useState(false);

  async function handleInvite() {
    setInviteStatus(null);
    setInviteLoading(true);
    try {
      const result = await api.createInvite();
      try {
        await navigator.clipboard.writeText(result.inviteLink);
        setInviteStatus("Enlace de invitacion creado y copiado al portapapeles.");
      } catch {
        setInviteStatus(`Enlace creado: ${result.inviteLink}`);
      }
    } catch (err) {
      const apiError = err as ApiError;
      const body = apiError?.body as { error?: string } | undefined;
      setInviteStatus(body?.error ?? "No se pudo generar la invitacion.");
    } finally {
      setInviteLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-3">
        <div className="text-sm text-[#1b3f7a]/70">{email}</div>
        <button
          type="button"
          className="rounded-lg border border-[#f4d3b2] bg-white px-3 py-2 text-sm font-semibold text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
        >
          Salir
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-[#f4d3b2] bg-white shadow-[0_25px_80px_-55px_rgba(26,161,213,0.35)]">
        <div className="relative p-8">
          <div className="absolute right-[-140px] top-[-140px] h-80 w-80 rounded-full bg-[#1aa1d5]/18 blur-3xl" />
          <div className="absolute left-[-140px] bottom-[-140px] h-80 w-80 rounded-full bg-[#f6c343]/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
                Tu espacio seguro
              </div>
              <h1 className="mt-3 text-4xl font-semibold text-[#12376c]">
                Bienvenido, {displayName}.
              </h1>
              <p className="mt-2 text-sm text-[#1b3f7a]/70">
                Aqui puedes pedir ayuda o apoyar a otras familias.
              </p>
            </div>

            <div className="w-full max-w-xs">
              <button
                type="button"
                onClick={handleInvite}
                disabled={inviteLoading}
                className="w-full rounded-2xl border border-[#f4d3b2] bg-[#fff6ec] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#f28c28] disabled:opacity-60"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">
                  Invitaciones
                </div>
                <div className="mt-2 text-2xl font-semibold text-[#12376c]">
                  {inviteLoading ? "Generando..." : "Enviar invitacion"}
                </div>
                <p className="mt-2 text-sm text-[#1b3f7a]/70">
                  Genera un enlace de registro de un solo uso.
                </p>
              </button>
              {inviteStatus ? (
                <p className="mt-3 text-xs text-[#1b3f7a]/70">{inviteStatus}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#12376c]">Que te gustaria hacer hoy?</h2>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#f4d3b2] bg-white text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
          aria-label="Siguiente"
        >
          {">"}
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#f4d3b2] bg-white p-7 shadow-[0_25px_80px_-60px_rgba(242,140,40,0.18)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">Accion rapida</div>
          <div className="mt-2 text-2xl font-semibold text-[#12376c]">Necesito ayuda</div>
          <p className="mt-2 text-sm text-[#1b3f7a]/70">Encuentra recursos cerca de ti y pide apoyo.</p>
          <div className="mt-6">
            <Link
              href="/needhelp"
              className="inline-flex items-center justify-center rounded-full border border-[#f4d3b2] bg-[#fff6ec] px-6 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
            >
              Empezar
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#f4d3b2] bg-white p-7 shadow-[0_25px_80px_-60px_rgba(26,161,213,0.18)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">Accion rapida</div>
          <div className="mt-2 text-2xl font-semibold text-[#12376c]">Quiero ayudar</div>
          <p className="mt-2 text-sm text-[#1b3f7a]/70">Comparte tiempo, recursos o informacion util.</p>
          <div className="mt-6">
            <Link
              href="/offerhelp"
              className="inline-flex items-center justify-center rounded-full border border-[#f4d3b2] bg-[#fff6ec] px-6 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#1aa1d5]"
            >
              Empezar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
