"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const NEED_HELP_MODE = process.env.NEXT_PUBLIC_NEEDHELP_MODE ?? "mock";
const MOCK_POSTS_KEY = "bv_need_help_posts_v1";
const MOCK_SEED_POST_ID = "mock-needhelp-1";

export type NeedHelpApiMode = "mock" | "api";

export type NeedHelpPostDraft = {
  categories: string[];
  details: string;
  age?: string;
  familyMembers?: string;
  familyDetails?: Array<{ age: string; sex: string }>;
  sex?: string;
  nativeCountry?: string;
  speaksEnglish?: string;
  occupation?: string;
  city?: string;
  arrivalDate?: string;
};

export type NeedHelpPost = NeedHelpPostDraft & {
  id: string;
  createdAt: string;
};

export type NeedHelpApiError = {
  status: number;
  body: unknown;
};

function readMockPosts(): NeedHelpPost[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(MOCK_POSTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean) as NeedHelpPost[];
  } catch {
    return [];
  }
}

function writeMockPosts(posts: NeedHelpPost[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MOCK_POSTS_KEY, JSON.stringify(posts));
}

function seedMockPosts(): NeedHelpPost[] {
  return [
    {
      id: MOCK_SEED_POST_ID,
      categories: ["alimentos"],
      details: "Necesito apoyo con alimentos esta semana para mi familia.",
      city: "Salt Lake City",
      createdAt: "2026-02-14T09:00:00.000Z",
    },
  ];
}

export function getNeedHelpApiMode(): NeedHelpApiMode {
  return NEED_HELP_MODE === "api" ? "api" : "mock";
}

export function getMockNeedHelpPostsSnapshot(): NeedHelpPost[] {
  return [...seedMockPosts(), ...readMockPosts()];
}

export async function createNeedHelpPost(payload: NeedHelpPostDraft): Promise<NeedHelpPost> {
  if (getNeedHelpApiMode() === "mock") {
    const next = {
      ...payload,
      id: `mock-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const current = readMockPosts();
    writeMockPosts([next, ...current]);
    return next;
  }

  const res = await fetch(`${API_BASE}/api/need-help/posts`, {
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
    throw { status: res.status, body: json } as NeedHelpApiError;
  }

  return json as NeedHelpPost;
}

export async function getMyNeedHelpPosts(): Promise<NeedHelpPost[]> {
  if (getNeedHelpApiMode() === "mock") return getMockNeedHelpPostsSnapshot();

  const res = await fetch(`${API_BASE}/api/need-help/posts/mine`, {
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
    throw { status: res.status, body: json } as NeedHelpApiError;
  }

  return json as NeedHelpPost[];
}
