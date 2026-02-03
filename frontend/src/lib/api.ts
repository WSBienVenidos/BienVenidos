// Lightweight API helper for auth
// Declare `process` so TypeScript in the frontend bundle does not complain.
declare const process: { env?: { NEXT_PUBLIC_API_URL?: string } };
const API_BASE = process?.env?.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type TokenResponse = {
  token: string;
  tokenType: string;
  expiresInSeconds: number;
};

type UserResponse = {
  id: string;
  email: string;
  createdAt: string;
};

export type ApiError = {
  status: number;
  body: unknown;
};

type LogoutResponse = {
  ok: boolean;
};

async function postJson<T>(path: string, body: unknown, useCredentials = true): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: useCredentials ? "include" : "same-origin",
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // ignore parse error
  }
  if (!res.ok) throw { status: res.status, body: json } as ApiError;
  return json as T;
}

export async function signup(email: string, password: string): Promise<TokenResponse> {
  return postJson<TokenResponse>("/api/auth/signup", { email, password });
}

export async function login(email: string, password: string): Promise<TokenResponse> {
  return postJson<TokenResponse>("/api/auth/login", { email, password });
}

export async function me(): Promise<UserResponse> {
  // Cookie-based auth: rely on credentials to include the HttpOnly cookie
  const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: "include" });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // ignore parse error
  }
  if (!res.ok) throw { status: res.status, body: json } as ApiError;
  return json as UserResponse;
}

export async function logout(): Promise<LogoutResponse | null> {
  const res = await fetch(`${API_BASE}/api/auth/logout`, { method: "POST", credentials: "include" });
  const text = await res.text();
  try {
    return text ? (JSON.parse(text) as LogoutResponse) : null;
  } catch {
    return null;
  }
}

const api = { signup, login, me, logout };
export default api;
