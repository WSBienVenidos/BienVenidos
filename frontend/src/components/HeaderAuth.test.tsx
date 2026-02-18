import { render, screen, waitFor } from "@testing-library/react";
import HeaderAuth from "./HeaderAuth";
import api from "@/lib/api";

jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    me: jest.fn(),
    logout: jest.fn(),
  },
}));

describe("HeaderAuth", () => {
  const apiMock = api as unknown as { me: jest.Mock; logout: jest.Mock };

  beforeEach(() => {
    apiMock.me.mockReset();
    apiMock.logout.mockReset();
  });

  it("shows login link when user is not authenticated", async () => {
    apiMock.me.mockRejectedValueOnce(new Error("no session"));

    render(<HeaderAuth />);

    await waitFor(() => {
      expect(screen.getByText("Conectar-se")).toBeInTheDocument();
    });
  });

  it("shows user email when authenticated", async () => {
    apiMock.me.mockResolvedValueOnce({ email: "user@example.com" });

    render(<HeaderAuth />);

    await waitFor(() => {
      expect(screen.getByText("user@example.com")).toBeInTheDocument();
    });
  });
});
