// Lightweight API helper for auth
// Declare `process` so TypeScript in the frontend bundle does not complain.
declare const process: any;
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

async function postJson(path: string, body: unknown, useCredentials = true) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: useCredentials ? 'include' : 'same-origin',
  });
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // ignore parse error
  }
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

async function getJson(path: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { headers });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

export async function signup(email: string, password: string): Promise<TokenResponse> {
  return postJson('/api/auth/signup', { email, password });
}

export async function login(email: string, password: string): Promise<TokenResponse> {
  return postJson('/api/auth/login', { email, password });
}

export async function me(): Promise<UserResponse> {
  // Cookie-based auth: rely on credentials to include the HttpOnly cookie
  const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: 'include' });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

export async function logout(): Promise<any> {
  const res = await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' });
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

export default { signup, login, me, logout };
