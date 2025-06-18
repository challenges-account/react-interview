import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoLists from "../TodoLists";

vi.mock("../components/TodoListContent", () => ({
  TodoListContent: vi.fn(() => (
    <div data-testid="mock-todolist-content">TodoListContent Mock</div>
  )),
}));

vi.mock("../components/TodoListsHeader", () => ({
  __esModule: true,
  default: vi.fn(({ title }) => (
    <div data-testid="mock-todolist-header">Header: {title}</div>
  )),
}));

describe("TodoLists Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with header and content", () => {
    render(<TodoLists />);

    expect(screen.getByTestId("mock-todolist-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-todolist-content")).toBeInTheDocument();
  });

  it("passes the correct title to TodoListHeader", () => {
    render(<TodoLists />);

    expect(screen.getByText("Header: To-do Lists")).toBeInTheDocument();
  });

  it("renders with the correct layout structure", () => {
    const { container } = render(<TodoLists />);

    const mainElement = container.firstChild;
    expect(mainElement).toHaveClass("p-6");

    const header = screen.getByTestId("mock-todolist-header");
    const content = screen.getByTestId("mock-todolist-content");

    expect(header).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
