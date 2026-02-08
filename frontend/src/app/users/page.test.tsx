import { fireEvent, render, screen } from "@testing-library/react";
import UsersPage from "./page";

describe("UsersPage", () => {
  it("renders the welcome message with title-cased name", () => {
    render(<UsersPage />);

    expect(screen.getByText(/Bienvenido, Rosa\./)).toBeInTheDocument();
  });

  it("builds a mailto invite when user provides an email", () => {
    const promptMock = jest.spyOn(window, "prompt").mockReturnValue("friend@example.com");

    const originalLocation = window.location;
    // @ts-expect-error - allow reassignment for test
    delete window.location;
    // @ts-expect-error - test override
    window.location = { href: "" };

    render(<UsersPage />);

    fireEvent.click(screen.getByRole("button", { name: /Enviar invitación/i }));

    expect(window.location.href).toContain("mailto:friend@example.com");
    expect(window.location.href).toContain("subject=");
    expect(window.location.href).toContain("body=");

    promptMock.mockRestore();
    // @ts-expect-error - restore
    window.location = originalLocation;
  });
});
