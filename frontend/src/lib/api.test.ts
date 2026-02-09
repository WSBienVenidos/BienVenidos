const originalEnv = process.env;

async function loadApi() {
  const mod = await import("./api");
  return mod;
}

describe("api", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, NEXT_PUBLIC_API_URL: "https://example.test" };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it("signup posts JSON and returns token response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ token: "t", tokenType: "bearer", expiresInSeconds: 3600 }),
    });
    // @ts-expect-error - test override
    global.fetch = fetchMock;

    const { signup } = await loadApi();
    const result = await signup("test@example.com", "pass");

    expect(fetchMock).toHaveBeenCalledWith("https://example.test/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "pass" }),
      credentials: "include",
    });
    expect(result).toEqual({ token: "t", tokenType: "bearer", expiresInSeconds: 3600 });
  });

  it("login throws ApiError on non-OK response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => JSON.stringify({ error: "no" }),
    });
    // @ts-expect-error - test override
    global.fetch = fetchMock;

    const { login } = await loadApi();
    await expect(login("a@b.com", "bad")).rejects.toMatchObject({
      status: 401,
      body: { error: "no" },
    });
  });

  it("me includes credentials and returns user", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ id: "1", email: "a@b.com", createdAt: "today" }),
    });
    // @ts-expect-error - test override
    global.fetch = fetchMock;

    const { me } = await loadApi();
    const result = await me();

    expect(fetchMock).toHaveBeenCalledWith("https://example.test/api/auth/me", {
      credentials: "include",
    });
    expect(result.email).toBe("a@b.com");
  });

  it("logout returns null when response is not JSON", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => "not-json",
    });
    // @ts-expect-error - test override
    global.fetch = fetchMock;

    const { logout } = await loadApi();
    const result = await logout();

    expect(fetchMock).toHaveBeenCalledWith("https://example.test/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    expect(result).toBeNull();
  });
});
