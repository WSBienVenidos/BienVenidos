"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api, { type ApiError, type UserResponse } from "@/lib/api";
import {
  getMockNeedHelpPostsSnapshot,
  getMyNeedHelpPosts,
  getNeedHelpApiMode,
  type NeedHelpPost,
} from "@/lib/needHelpApi";
import {
  getMockOfferHelpMessagesForPostSnapshot,
  getOfferHelpApiMode,
  getOfferHelpMessagesForPost,
  type OfferHelpApiError,
  type OfferHelpMessage,
} from "@/lib/offerHelpApi";

function titleCase(s: string) {
  return s
    .replace(/[_\-.]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function UsersPage() {
  const needHelpMode = getNeedHelpApiMode();
  const offerHelpMode = getOfferHelpApiMode();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [needHelpHistory, setNeedHelpHistory] = useState<NeedHelpPost[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [selectedPostForMessages, setSelectedPostForMessages] = useState<NeedHelpPost | null>(null);
  const [offerMessages, setOfferMessages] = useState<OfferHelpMessage[]>([]);
  const [offerMessagesLoading, setOfferMessagesLoading] = useState(false);
  const [offerMessagesError, setOfferMessagesError] = useState<string | null>(null);
  const [offerMessageCounts, setOfferMessageCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let active = true;
    api.me()
      .then(result => {
        if (!active) return;
        setUser(result);
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
      })
      .finally(() => {
        if (!active) return;
        setUserLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const email = user?.email ?? "";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  const fallbackName = user?.email ? user.email.split("@")[0] : "amigo";
  const displayName = userLoading ? "..." : titleCase(fullName || fallbackName);

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      if (needHelpMode === "mock") {
        if (!active) return;
        setNeedHelpHistory(getMockNeedHelpPostsSnapshot());
        setHistoryError(null);
        setHistoryLoading(false);
        return;
      }

      if (!active) return;
      setHistoryLoading(true);
      setHistoryError(null);
      try {
        const posts = await getMyNeedHelpPosts();
        if (!active) return;
        setNeedHelpHistory(posts);
      } catch (err) {
        if (!active) return;
        const apiError = err as { body?: { error?: string } };
        setHistoryError(apiError?.body?.error ?? "No se pudo cargar el historial.");
      } finally {
        if (!active) return;
        setHistoryLoading(false);
      }
    }

    void loadHistory();
    return () => {
      active = false;
    };
  }, [needHelpMode]);

  useEffect(() => {
    if (offerHelpMode === "mock") {
      const counts = Object.fromEntries(
        needHelpHistory.map(post => [post.id, getMockOfferHelpMessagesForPostSnapshot(post.id).length])
      );
      setOfferMessageCounts(counts);
      return;
    }

    let active = true;
    async function loadCounts() {
      if (needHelpHistory.length === 0) {
        setOfferMessageCounts({});
        return;
      }
      const entries = await Promise.all(
        needHelpHistory.map(async post => {
          try {
            const messages = await getOfferHelpMessagesForPost(post.id);
            return [post.id, messages.length] as const;
          } catch {
            return [post.id, 0] as const;
          }
        })
      );
      if (!active) return;
      setOfferMessageCounts(Object.fromEntries(entries));
    }
    void loadCounts();
    return () => {
      active = false;
    };
  }, [needHelpHistory, offerHelpMode]);

  async function copyInviteLink() {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setInviteStatus("Enlace de invitacion copiado al portapapeles.");
    } catch {
      setInviteStatus(`Copia este enlace manualmente: ${inviteLink}`);
    }
  }

  async function handleInvite() {
    setInviteStatus(null);
    setInviteLink(null);
    setInviteLoading(true);
    try {
      const result = await api.createInvite();
      setInviteLink(result.inviteLink);
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

  function formatDate(date: string) {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleString();
  }

  function shortText(text: string, max = 140) {
    const clean = text.trim();
    if (clean.length <= max) return clean;
    return `${clean.slice(0, max)}...`;
  }

  async function openOfferMessages(post: NeedHelpPost) {
    setSelectedPostForMessages(post);
    setOfferMessages([]);
    setOfferMessagesError(null);
    setOfferMessagesLoading(true);

    try {
      const messages = await getOfferHelpMessagesForPost(post.id);
      setOfferMessages(messages);
    } catch (err) {
      const apiError = err as OfferHelpApiError;
      const body = apiError?.body as { error?: string } | undefined;
      setOfferMessagesError(body?.error ?? "No se pudieron cargar los mensajes de ayuda.");
    } finally {
      setOfferMessagesLoading(false);
    }
  }

  function closeOfferMessages() {
    setSelectedPostForMessages(null);
    setOfferMessages([]);
    setOfferMessagesError(null);
    setOfferMessagesLoading(false);
  }

  return (
    <div className="w-full">

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
              {inviteLink ? (
                <div className="mt-3 space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1b3f7a]/60">
                    Enlace para enviar
                  </label>
                  <input
                    value={inviteLink}
                    readOnly
                    className="w-full rounded-xl border border-[#f4d3b2] bg-white px-3 py-2 text-xs text-[#12376c]"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={copyInviteLink}
                      className="rounded-full border border-[#f4d3b2] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#1aa1d5]"
                    >
                      Copiar enlace
                    </button>
                    <a
                      href={inviteLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#1aa1d5] hover:text-[#1693c2]"
                    >
                      Abrir enlace
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#12376c]">Que te gustaria hacer hoy?</h2>
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

      <div className="mt-10 rounded-[28px] border border-[#f4d3b2] bg-white p-7 shadow-[0_25px_80px_-60px_rgba(15,42,78,0.12)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">Mi historial</div>
        <h2 className="mt-2 text-2xl font-semibold text-[#12376c]">Mis solicitudes de ayuda</h2>
        <p className="mt-2 text-sm text-[#1b3f7a]/70">
          Aqui aparecen las publicaciones enviadas desde Need Help.
        </p>

        <div className="mt-5 space-y-4">
          {historyLoading ? (
            <div className="rounded-2xl border border-[#f4d3b2] bg-[#fff6ec] p-4 text-sm text-[#1b3f7a]/70">
              Cargando historial...
            </div>
          ) : null}

          {!historyLoading && historyError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {historyError}
            </div>
          ) : null}

          {!historyLoading && !historyError && needHelpHistory.length === 0 ? (
            <div className="rounded-2xl border border-[#f4d3b2] bg-[#fff6ec] p-4 text-sm text-[#1b3f7a]/70">
              No tienes solicitudes guardadas todavia.
            </div>
          ) : null}

          {!historyLoading && !historyError
            ? needHelpHistory.map(post => (
                <article key={post.id} className="rounded-2xl border border-[#f4d3b2] bg-[#fffaf4] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1b3f7a]/60">
                      {post.categories.length > 0 ? post.categories.join(", ") : "Sin categoria"}
                    </div>
                    <div className="text-xs text-[#1b3f7a]/55">{formatDate(post.createdAt)}</div>
                  </div>
                  <p className="mt-2 text-sm text-[#12376c]">
                    {expandedPostId === post.id ? post.details : shortText(post.details)}
                  </p>
                  {post.city ? (
                    <p className="mt-2 text-xs text-[#1b3f7a]/70">Ciudad: {post.city}</p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setExpandedPostId(prev => (prev === post.id ? null : post.id))}
                    className="mt-3 rounded-full border border-[#f4d3b2] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#1aa1d5]"
                  >
                    {expandedPostId === post.id ? "Ocultar detalles" : "Ver detalles"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void openOfferMessages(post)}
                    className="ml-2 mt-3 rounded-full border border-[#f4d3b2] bg-[#fff6ec] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
                  >
                    {`Ver mensajes de ayuda (${offerMessageCounts[post.id] ?? 0})`}
                  </button>
                </article>
              ))
            : null}
        </div>
      </div>

      {selectedPostForMessages ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f244a]/40 p-4">
          <div className="w-full max-w-2xl rounded-[28px] border border-[#f4d3b2] bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,42,78,0.35)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
                  Mensajes de ayuda
                </div>
                <h2 className="mt-2 text-xl font-semibold text-[#12376c]">
                  Respuestas para esta solicitud
                </h2>
                <p className="mt-1 text-sm text-[#1b3f7a]/70">
                  {selectedPostForMessages.categories.length > 0
                    ? selectedPostForMessages.categories.join(", ")
                    : "Sin categoria"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeOfferMessages}
                className="rounded-full border border-[#f4d3b2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {offerMessagesLoading ? (
                <div className="rounded-2xl border border-[#f4d3b2] bg-[#fff6ec] p-4 text-sm text-[#1b3f7a]/70">
                  Cargando mensajes...
                </div>
              ) : null}

              {!offerMessagesLoading && offerMessagesError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {offerMessagesError}
                </div>
              ) : null}

              {!offerMessagesLoading && !offerMessagesError && offerMessages.length === 0 ? (
                <div className="rounded-2xl border border-[#f4d3b2] bg-[#fff6ec] p-4 text-sm text-[#1b3f7a]/70">
                  Aun no hay mensajes de ayuda para esta solicitud.
                </div>
              ) : null}

              {!offerMessagesLoading && !offerMessagesError
                ? offerMessages.map(msg => (
                    <article key={msg.id} className="rounded-2xl border border-[#f4d3b2] bg-[#fffaf4] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-[#12376c]">
                          {msg.helperName || "Ayudador"}
                        </div>
                        <div className="text-xs text-[#1b3f7a]/55">{formatDate(msg.createdAt)}</div>
                      </div>
                      {msg.helperContact ? (
                        <p className="mt-1 text-xs text-[#1b3f7a]/70">Contacto: {msg.helperContact}</p>
                      ) : null}
                      <p className="mt-2 text-sm text-[#12376c]">{msg.message}</p>
                    </article>
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
