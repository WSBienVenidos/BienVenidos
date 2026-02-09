import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuggestionsButton from "./SuggestionsButton";

describe("SuggestionsButton", () => {
  beforeEach(() => {
    (global as typeof globalThis).fetch = jest.fn() as unknown as typeof fetch;
  });

  it("opens the dialog when button is clicked", () => {
    render(<SuggestionsButton />);

    fireEvent.click(screen.getByRole("button", { name: "Sugerencias" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Sugiere un recurso")).toBeInTheDocument();
  });

  it("shows validation message for invalid email", async () => {
    const user = userEvent.setup();
    render(<SuggestionsButton />);

    fireEvent.click(screen.getByRole("button", { name: "Sugerencias" }));

    await user.type(screen.getByPlaceholderText("nombre@correo.com"), "bad-email");

    expect(
      screen.getByText("Ingresa un correo valido, por ejemplo nombre@correo.com.")
    ).toBeInTheDocument();
  });

  it("shows success message on successful submit", async () => {
    const user = userEvent.setup();
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValueOnce({ ok: true });

    render(<SuggestionsButton />);

    fireEvent.click(screen.getByRole("button", { name: "Sugerencias" }));

    const emailInput = screen.getByPlaceholderText("nombre@correo.com");
    const messageInput = screen.getByPlaceholderText(
      "Escribe el nombre del recurso, ubicacion y porque lo recomiendas."
    );

    await user.type(emailInput, "good@email.com");
    await user.click(messageInput);
    await user.type(messageInput, "Este es un recurso muy útil para la comunidad.");

    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => {
      expect(screen.getByText("Gracias. Recibimos tu sugerencia.")).toBeInTheDocument();
    });
  });
});
