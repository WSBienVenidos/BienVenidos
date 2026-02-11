import { fireEvent, render, screen } from "@testing-library/react";
import UsersPage from "./page";
import api from "@/lib/api";

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    createInvite: jest.fn(),
  },
}));

describe("UsersPage", () => {
  it("renders the welcome message with title-cased name", () => {
    render(<UsersPage />);
    expect(screen.getByText(/Bienvenido, Rosa\./)).toBeInTheDocument();
  });

  it("calls invite API and shows success message", async () => {
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
  });
});
