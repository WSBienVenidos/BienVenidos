// Lightweight API helper for auth
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type TokenResponse = {
  token: string;
  tokenType: string;
  expiresInSeconds: number;
};

type SignupPayload = {
  email: string;
  phone: string;
  password: string;
  firstName?: string;
  lastName?: string;
  inviteToken?: string;
};

export type UserResponse = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: string;
};

export type ApiError = {
  status: number;
  body: unknown;
};

type LogoutResponse = {
  ok: boolean;
};

type InviteCreateResponse = {
  inviteLink: string;
  expiresAt: string;
};

type InviteValidationResponse = {
  valid: boolean;
  reason: string;
};

const DEFAULT_TIMEOUT_MS = 45000;

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function postJson<T>(path: string, body: unknown, useCredentials = true): Promise<T> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: useCredentials ? "include" : "same-origin",
    });
  } catch (err) {
    const message = err instanceof DOMException && err.name === "AbortError"
      ? "Request timed out. The backend may be waking up, please try again."
      : "Network error";
    throw { status: 0, body: { error: message } } as ApiError;
  }
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

export async function signup(payload: SignupPayload): Promise<TokenResponse> {
  return postJson<TokenResponse>("/api/auth/signup", payload);
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

export async function createInvite(): Promise<InviteCreateResponse> {
  return postJson<InviteCreateResponse>("/api/invites", {});
}

export async function validateInvite(token: string): Promise<InviteValidationResponse> {
  const params = new URLSearchParams({ token });
  const res = await fetch(`${API_BASE}/api/invites/validate?${params.toString()}`);
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  if (!res.ok || !json) {
    return { valid: false, reason: "invalid_or_expired" };
  }
  return json as InviteValidationResponse;
}

const api = { signup, login, me, logout, createInvite, validateInvite };
export default api;
