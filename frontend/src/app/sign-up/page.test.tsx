import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpPage from "./page";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: pushMock,
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

describe("SignUpPage", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    pushMock.mockReset();
    process.env.NEXT_PUBLIC_API_URL = "https://example.test";
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("shows validation error when email or password missing", async () => {
    render(<SignUpPage />);

    fireEvent.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    expect(await screen.findByText("Por favor completa correo y contraseña.")).toBeInTheDocument();
  });

  it("redirects to login on success", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    (global as typeof globalThis).fetch = fetchMock as unknown as typeof fetch;

    render(<SignUpPage />);

    fireEvent.change(screen.getByPlaceholderText("ana@bienvenidos.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("https://example.test/api/auth/signup", expect.any(Object));
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  it("shows server error message when response is not ok", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Ya existe" }),
    });
    (global as typeof globalThis).fetch = fetchMock as unknown as typeof fetch;

    render(<SignUpPage />);

    fireEvent.change(screen.getByPlaceholderText("ana@bienvenidos.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    expect(await screen.findByText("Ya existe")).toBeInTheDocument();
  });

  it("shows network error when fetch throws", async () => {
    const fetchMock = jest.fn().mockRejectedValue(new Error("network"));
    (global as typeof globalThis).fetch = fetchMock as unknown as typeof fetch;

    render(<SignUpPage />);

    fireEvent.change(screen.getByPlaceholderText("ana@bienvenidos.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    expect(await screen.findByText("Error de red al conectar con el servidor")).toBeInTheDocument();
  });
});
