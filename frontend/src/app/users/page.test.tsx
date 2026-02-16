import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UsersPage from "./page";
import api from "@/lib/api";

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    createInvite: jest.fn(),
    me: jest.fn(),
  },
}));

describe("UsersPage", () => {
  it("renders the welcome message with title-cased name", async () => {
    const meMock = jest.mocked(api.me);
    meMock.mockResolvedValue({
      id: "1",
      email: "rosa@example.com",
      firstName: "rosa",
      lastName: "lopez",
      createdAt: "today",
    });

    render(<UsersPage />);
    expect(await screen.findByText(/Bienvenido, Rosa Lopez\./)).toBeInTheDocument();
  });

  it("calls invite API and shows success message", async () => {
    const meMock = jest.mocked(api.me);
    meMock.mockResolvedValue({
      id: "1",
      email: "rosa@example.com",
      firstName: "rosa",
      lastName: "lopez",
      createdAt: "today",
    });
    const createInviteMock = jest.mocked(api.createInvite);
    createInviteMock.mockResolvedValue({
      inviteLink: "https://app/sign-up?invite=abc",
      expiresAt: "2099-01-01T00:00:00Z",
    });

    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    render(<UsersPage />);

    fireEvent.click(screen.getByRole("button", { name: /enviar invitacion/i }));

    expect(createInviteMock).toHaveBeenCalled();
    expect(await screen.findByText(/copiado al portapapeles/i)).toBeInTheDocument();
    expect(writeTextMock).toHaveBeenCalledWith("https://app/sign-up?invite=abc");
    expect(screen.getByDisplayValue("https://app/sign-up?invite=abc")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /copiar enlace/i }));
    await waitFor(() =>
      expect(writeTextMock).toHaveBeenLastCalledWith("https://app/sign-up?invite=abc")
    );
    expect(screen.getByRole("link", { name: /Abrir enlace/i })).toHaveAttribute(
      "href",
      "https://app/sign-up?invite=abc"
    );
  });
});
