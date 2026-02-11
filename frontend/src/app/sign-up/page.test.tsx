import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpPage from "./page";
import api from "@/lib/api";

const pushMock = jest.fn();
const getSearchParamMock = jest.fn();

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
  useSearchParams: () => ({
    get: getSearchParamMock,
  }),
}));

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    validateInvite: jest.fn(),
    signup: jest.fn(),
  },
}));

describe("SignUpPage", () => {
  beforeEach(() => {
    pushMock.mockReset();
    getSearchParamMock.mockReset();
    jest.mocked(api.validateInvite).mockReset();
    jest.mocked(api.signup).mockReset();
  });

  it("shows invalid invite view when token is missing", async () => {
    getSearchParamMock.mockReturnValue(null);

    render(<SignUpPage />);

    expect(await screen.findByText(/Invitacion invalida/i)).toBeInTheDocument();
  });

  it("redirects to login on successful signup", async () => {
    getSearchParamMock.mockReturnValue("abc123");
    jest.mocked(api.validateInvite).mockResolvedValue({ valid: true, reason: "ok" });
    jest.mocked(api.signup).mockResolvedValue({
      token: "t",
      tokenType: "Bearer",
      expiresInSeconds: 3600,
    });

    render(<SignUpPage />);

    await screen.findByRole("heading", { name: /Crear cuenta/i });

    fireEvent.change(screen.getByPlaceholderText("ana@bienvenidos.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("18015551234"), {
      target: { value: "18015550000" },
    });
    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "passpass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(api.signup).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "user@example.com",
          phone: "18015550000",
          password: "passpass123",
          inviteToken: "abc123",
        })
      );
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });
});
