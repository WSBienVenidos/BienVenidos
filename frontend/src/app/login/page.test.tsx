import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "./page";
import api from "@/lib/api";

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

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    me: jest.fn(),
  },
}));

describe("LoginPage", () => {
  const apiMock = api as unknown as { login: jest.Mock; me: jest.Mock };

  beforeEach(() => {
    apiMock.login.mockReset();
    apiMock.me.mockReset();
    pushMock.mockReset();
  });

  it("shows validation error when email or password is missing", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Email and password are required")).toBeInTheDocument();
  });

  it("logs in and redirects on success", async () => {
    apiMock.login.mockResolvedValueOnce({ token: "t" });
    apiMock.me.mockResolvedValueOnce({ email: "user@example.com" });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("tucorreo@bienvenidos.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(apiMock.login).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/users");
    });
  });

  it("shows API error message when login fails", async () => {
    apiMock.login.mockRejectedValueOnce({ status: 401, body: { error: "Credenciales inválidas" } });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("tucorreo@bienvenidos.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "bad" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Credenciales inválidas")).toBeInTheDocument();
  });
});
