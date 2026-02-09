import { render, screen } from "@testing-library/react";
import CategoryTemplate from "./CategoryTemplate";
import type { Category, Resource } from "../category_data";

describe("CategoryTemplate", () => {
  it("renders category title and resource details", () => {
    const category: Category = {
      key: "test",
      title: "Categoria de Prueba",
      emoji: "✅",
      tone: "blue",
      href: "/test",
    };

    const resources: Resource[] = [
      {
        id: "r1",
        title: "Recurso Uno",
        description: "Descripcion",
        address: "123 Main St",
        phone: "(555) 555-5555",
        website: "https://example.test",
      },
    ];

    render(<CategoryTemplate category={category} resources={resources} />);

    expect(screen.getByText("Categoria de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Recurso Uno")).toBeInTheDocument();
    expect(screen.getByText("Descripcion")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
  });
});
