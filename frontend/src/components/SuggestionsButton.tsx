"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const SUGGESTIONS_EMAIL = "bienvenidotoutah@gmail.com";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwprnzpv";

const instructions = [
  "Comparte el nombre del recurso y por que es util.",
  "Incluye enlaces, direccion y telefono si los tienes.",
  "Si es un recurso gratis o de bajo costo, mencionalo.",
];

export default function SuggestionsButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const emailRef = useRef<HTMLInputElement>(null);

  const isEmailValid = useMemo(() => {
    return /^\S+@\S+\.\S+$/.test(email.trim());
  }, [email]);

  const canSubmit = useMemo(() => {
    return isEmailValid && message.trim().length > 10;
  }, [isEmailValid, message]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => emailRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitState("sending");
    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        setSubmitState("error");
        return;
      }
      setSubmitState("success");
      setEmail("");
      setMessage("");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full border border-[#f4d3b2] bg-[#f28c28] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_-30px_rgba(242,140,40,0.8)] transition hover:-translate-y-1 hover:bg-[#e67f1d]"
        aria-haspopup="dialog"
      >
        Sugerencias
      </button>

      <div
        className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center px-4 transition ${open ? "opacity-100" : "opacity-0"}`}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="suggestions-title"
            className={`w-full max-w-2xl translate-y-6 rounded-[28px] border border-[#f4d3b2] bg-white p-6 text-left shadow-[0_30px_80px_-50px_rgba(15,42,78,0.6)] transition ${open ? "translate-y-0" : "translate-y-6"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/50">
                  Ayudanos a crecer
                </p>
                <h3 id="suggestions-title" className="text-lg font-semibold text-[#12376c]">
                  Sugiere un recurso
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#f4d3b2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#12376c]"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-[#1b3f7a]/80">
              <p>
                Queremos recibir sugerencias de recursos que no aparecen en la lista. Usa este formulario
                para enviarnos la informacion.
              </p>
              <ul className="space-y-2">
                {instructions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#f28c28]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-[#12376c]">
                Tu correo electronico
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nombre@correo.com"
                  className="mt-2 w-full rounded-2xl border border-[#f4d3b2] bg-white px-4 py-3 text-sm text-[#12376c] shadow-sm outline-none transition focus:border-[#f28c28]"
                />
              </label>
              {!isEmailValid && email.length > 0 ? (
                <p className="text-xs font-semibold text-[#e4528c]">
                  Ingresa un correo valido, por ejemplo nombre@correo.com.
                </p>
              ) : null}

              <label className="block text-sm font-semibold text-[#12376c]">
                Tu sugerencia
                <textarea
                  required
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Escribe el nombre del recurso, ubicacion y porque lo recomiendas."
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border border-[#f4d3b2] bg-white px-4 py-3 text-sm text-[#12376c] shadow-sm outline-none transition focus:border-[#1aa1d5]"
                />
              </label>
              <input type="hidden" name="source" value="BienVenidos suggestions" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#1b3f7a]/70">
                  Enviaremos tu correo a {SUGGESTIONS_EMAIL}.
                </p>
                <button
                  type="submit"
                  disabled={!canSubmit || submitState === "sending"}
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#1aa1d5] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5 hover:bg-[#1691c0] disabled:cursor-not-allowed disabled:bg-[#b9dfee]"
                >
                  {submitState === "sending" ? "Enviando..." : "Enviar"}
                </button>
              </div>

              {submitState === "success" ? (
                <p className="text-sm font-semibold text-[#1aa1d5]">
                  Gracias. Recibimos tu sugerencia.
                </p>
              ) : null}
              {submitState === "error" ? (
                <p className="text-sm font-semibold text-[#e4528c]">
                  No pudimos enviar tu sugerencia. Intenta de nuevo.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
