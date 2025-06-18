import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoListsHeader from "../components/TodoListsHeader";

const mockLinkButton = vi.fn();
vi.mock("@/components/ui/link-button", () => ({
  __esModule: true,
  default: vi.fn((props) => {
    mockLinkButton(props);
    return (
      <button data-testid="mock-link-button" data-to={props.to}>
        {props.label || "New List"}
      </button>
    );
  }),
}));

describe("TodoListsHeader Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title correctly", () => {
    render(<TodoListsHeader title="Test Title" />);
    expect(
      screen.getByRole("heading", { name: "Test Title" }),
    ).toBeInTheDocument();
  });

  it("renders different titles as provided", () => {
    const { rerender } = render(<TodoListsHeader title="First Title" />);
    expect(
      screen.getByRole("heading", { name: "First Title" }),
    ).toBeInTheDocument();

    rerender(<TodoListsHeader title="Second Title" />);
    expect(
      screen.getByRole("heading", { name: "Second Title" }),
    ).toBeInTheDocument();
  });

  it("creates a new list button with correct props", () => {
    render(<TodoListsHeader title="Todo Lists" />);

    expect(mockLinkButton).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "/todo-lists/new",
      }),
    );

    expect(mockLinkButton.mock.calls[0][0]).toHaveProperty("icon");

    const button = screen.getByTestId("mock-link-button");
    expect(button).toHaveAttribute("data-to", "/todo-lists/new");
  });

  it("has the correct header layout for accessibility and styling", () => {
    const { container } = render(<TodoListsHeader title="Test Title" />);
    const header = container.querySelector("header");

    expect(header).toHaveClass(
      "flex",
      "justify-between",
      "items-center",
      "mb-6",
    );

    expect(header?.querySelector("h2")).toBeInTheDocument();
    expect(screen.getByTestId("mock-link-button")).toBeInTheDocument();
  });
});
