import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorScreen from "../ErrorScreen";

vi.mock("@phosphor-icons/react", () => ({
  WarningCircleIcon: () => <div data-testid="warning-icon">Warning Icon</div>,
}));

describe("ErrorScreen Component", () => {
  it("renders default error message when no error is provided", () => {
    render(<ErrorScreen />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please try again later."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
  });

  it("renders the provided error message", () => {
    const testError = new Error("Test error message");
    render(<ErrorScreen error={testError} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders and calls resetErrorBoundary when button is clicked", () => {
    const resetMock = vi.fn();
    render(<ErrorScreen resetErrorBoundary={resetMock} />);

    const resetButton = screen.getByRole("button", { name: /try again/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(resetMock).toHaveBeenCalledTimes(1);
  });

  it("does not render try again button when resetErrorBoundary is not provided", () => {
    render(<ErrorScreen />);

    expect(
      screen.queryByRole("button", { name: /try again/i }),
    ).not.toBeInTheDocument();
  });

  it("handles null error properly", () => {
    render(<ErrorScreen error={null} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please try again later."),
    ).toBeInTheDocument();
  });

  it("renders with the correct container structure", () => {
    render(<ErrorScreen />);

    const container = screen.getByText("Something went wrong").closest("div");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex");
  });
});
