import { fireEvent, render, screen } from "@testing-library/react";
import AyudaPage from "./page";

describe("NeedHelp page", () => {
  it("toggles category selection and updates summary", () => {
    render(<AyudaPage />);

    const alimentosButton = screen.getByRole("button", { name: /Alimentos/i });
    fireEvent.click(alimentosButton);

    expect(screen.getByText(/Categoría seleccionada/i)).toBeInTheDocument();
    expect(screen.getAllByText("Alimentos").length).toBeGreaterThan(0);
  });

  it("creates family detail inputs based on count", () => {
    render(<AyudaPage />);

    fireEvent.change(screen.getByPlaceholderText("Ej: 4"), { target: { value: "2" } });

    expect(screen.getByText("Persona 1")).toBeInTheDocument();
    expect(screen.getByText("Persona 2")).toBeInTheDocument();
  });

  it("uses suggested message and shows submitted confirmation", () => {
    render(<AyudaPage />);

    fireEvent.click(screen.getByRole("button", { name: "Usar mensaje sugerido" }));

    expect(screen.getByText("Puedes editarlo antes de enviar.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));

    expect(
      screen.getByText(/Solicitud guardada \(design-only\)/i)
    ).toBeInTheDocument();
  });
});
