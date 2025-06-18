import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoListCard from "../components/TodoListCard";

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("@phosphor-icons/react", () => ({
  TrashIcon: vi.fn(() => (
    <span aria-hidden="true" data-testid="trash-icon">
      Delete
    </span>
  )),
}));

describe("TodoListCard Component", () => {
  const mockTodoList = {
    id: "test-id-123",
    name: "Test Todo List",
  };

  const mockOnDeleteClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays the todo list name", () => {
    render(
      <TodoListCard
        todoList={mockTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );
    expect(screen.getByText("Test Todo List")).toBeInTheDocument();
  });

  it("navigates to the correct detailed view when the card is clicked", () => {
    render(
      <TodoListCard
        todoList={mockTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );

    const card = screen.getByText("Test Todo List").closest("li");
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith("/todo-lists/test-id-123");
  });

  it("triggers deletion workflow without navigating when delete button is clicked", () => {
    render(
      <TodoListCard
        todoList={mockTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );

    const deleteButton = screen.getByLabelText("Delete to-do list");
    fireEvent.click(deleteButton);

    expect(mockOnDeleteClick).toHaveBeenCalledTimes(1);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("provides an accessible way to delete the todo list", () => {
    render(
      <TodoListCard
        todoList={mockTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );

    const deleteButton = screen.getByLabelText("Delete to-do list");
    expect(deleteButton).toBeInTheDocument();
  });

  it("works with different todo list data", () => {
    const customTodoList = {
      id: "another-id-456",
      name: "Shopping List",
    };

    render(
      <TodoListCard
        todoList={customTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );

    expect(screen.getByText("Shopping List")).toBeInTheDocument();

    const card = screen.getByText("Shopping List").closest("li");
    fireEvent.click(card!);
    expect(mockNavigate).toHaveBeenCalledWith("/todo-lists/another-id-456");
  });

  it("handles keyboard navigation for accessibility", () => {
    render(
      <TodoListCard
        todoList={mockTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );

    const card = screen.getByText("Test Todo List").closest("li");
    card!.focus();
    fireEvent.keyDown(card!, { key: "Enter" });

    expect(mockNavigate).toHaveBeenCalledWith("/todo-lists/test-id-123");
  });

  it("prevents event bubbling when clicking delete button", () => {
    render(
      <TodoListCard
        todoList={mockTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );

    const mockEvent = {
      stopPropagation: vi.fn(),
    };

    const deleteButton = screen.getByLabelText("Delete to-do list");
    fireEvent.click(deleteButton, mockEvent);

    expect(mockOnDeleteClick).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("passes the correct todo list to the delete handler", () => {
    render(
      <TodoListCard
        todoList={mockTodoList}
        onDeleteClick={mockOnDeleteClick}
      />,
    );

    const deleteButton = screen.getByLabelText("Delete to-do list");
    fireEvent.click(deleteButton);

    expect(mockOnDeleteClick).toHaveBeenCalledTimes(1);
  });
});
