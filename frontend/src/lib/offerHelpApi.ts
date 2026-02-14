"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const OFFER_HELP_MODE = process.env.NEXT_PUBLIC_OFFERHELP_MODE ?? "mock";
const MOCK_MESSAGES_KEY = "bv_offer_help_messages_v1";
const MOCK_NEED_HELP_POST_ID = "mock-needhelp-1";

export type OfferHelpApiMode = "mock" | "api";

export type OfferHelpMessageDraft = {
  targetPostId: string;
  targetPostTitle?: string;
  targetCategory?: string;
  helperName: string;
  helperContact: string;
  message: string;
};

export type OfferHelpMessage = OfferHelpMessageDraft & {
  id: string;
  createdAt: string;
};

export type OfferHelpApiError = {
  status: number;
  body: unknown;
};

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `offer_msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function readMockMessages(): OfferHelpMessage[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(MOCK_MESSAGES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean) as OfferHelpMessage[];
  } catch {
    return [];
  }
}

function seedMockMessages(): OfferHelpMessage[] {
  return [
    {
      id: "seed-offer-1",
      targetPostId: MOCK_NEED_HELP_POST_ID,
      targetPostTitle: "Necesito apoyo con alimentos esta semana",
      targetCategory: "Alimentos",
      helperName: "Maria",
      helperContact: "801-555-0100",
      message: "Puedo llevar una despensa basica y apoyar con transporte.",
      createdAt: "2026-02-14T10:00:00.000Z",
    },
    {
      id: "seed-offer-2",
      targetPostId: MOCK_NEED_HELP_POST_ID,
      targetPostTitle: "Necesito apoyo con alimentos esta semana",
      targetCategory: "Alimentos",
      helperName: "Jose",
      helperContact: "385-555-0199",
      message: "Tengo informacion de dos food banks cercanos y puedo ayudarte a llegar.",
      createdAt: "2026-02-14T12:30:00.000Z",
    },
  ];
}

function writeMockMessages(messages: OfferHelpMessage[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MOCK_MESSAGES_KEY, JSON.stringify(messages));
}

export function getOfferHelpApiMode(): OfferHelpApiMode {
  return OFFER_HELP_MODE === "api" ? "api" : "mock";
}

export function getMockOfferHelpMessagesForPostSnapshot(postId: string): OfferHelpMessage[] {
  return [...seedMockMessages(), ...readMockMessages()].filter(m => m.targetPostId === postId);
}

export async function createOfferHelpMessage(payload: OfferHelpMessageDraft): Promise<OfferHelpMessage> {
  if (getOfferHelpApiMode() === "mock") {
    const next: OfferHelpMessage = {
      ...payload,
      id: createId(),
      createdAt: new Date().toISOString(),
    };
    const current = readMockMessages();
    writeMockMessages([next, ...current]);
    return next;
  }

  const res = await fetch(`${API_BASE}/api/offer-help/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    throw { status: res.status, body: json } as OfferHelpApiError;
  }

  return json as OfferHelpMessage;
}

export async function getMyOfferHelpMessages(): Promise<OfferHelpMessage[]> {
  if (getOfferHelpApiMode() === "mock") {
    return [...seedMockMessages(), ...readMockMessages()];
  }

  const res = await fetch(`${API_BASE}/api/offer-help/messages/mine`, {
    credentials: "include",
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok || !Array.isArray(json)) {
    throw { status: res.status, body: json } as OfferHelpApiError;
  }

  return json as OfferHelpMessage[];
}

export async function getOfferHelpMessagesForPost(postId: string): Promise<OfferHelpMessage[]> {
  if (getOfferHelpApiMode() === "mock") {
    return getMockOfferHelpMessagesForPostSnapshot(postId);
  }

  const res = await fetch(`${API_BASE}/api/offer-help/messages/by-post/${encodeURIComponent(postId)}`, {
    credentials: "include",
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok || !Array.isArray(json)) {
    throw { status: res.status, body: json } as OfferHelpApiError;
  }

  return json as OfferHelpMessage[];
}
