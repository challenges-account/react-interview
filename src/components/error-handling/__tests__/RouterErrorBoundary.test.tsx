import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterErrorBoundary } from "../RouterErrorBoundary";
import * as router from "react-router";

vi.mock("react-router", () => ({
  useRouteError: vi.fn(),
  isRouteErrorResponse: vi.fn(),
}));

vi.mock("../ErrorScreen", () => ({
  default: vi.fn(({ error }) => (
    <div data-testid="error-screen">
      <span data-testid="error-message">
        {error?.message || "No error message"}
      </span>
    </div>
  )),
}));

describe("RouterErrorBoundary Component", () => {
  const mockUseRouteError = vi.mocked(router.useRouteError);
  const mockIsRouteErrorResponse = vi.mocked(router.isRouteErrorResponse);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles route error responses correctly", () => {
    mockIsRouteErrorResponse.mockReturnValue(true);
    mockUseRouteError.mockReturnValue({
      status: 404,
      statusText: "Not Found",
      data: "Page not found",
    } as any);

    render(<RouterErrorBoundary />);

    expect(screen.getByTestId("error-message").textContent).toBe(
      "404 Not Found: Page not found",
    );
  });

  it("handles regular errors correctly", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    const testError = new Error("Regular test error");
    mockUseRouteError.mockReturnValue(testError);

    render(<RouterErrorBoundary />);

    expect(screen.getByTestId("error-message").textContent).toBe(
      "Regular test error",
    );
  });

  it("handles non-Error objects correctly", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    mockUseRouteError.mockReturnValue({
      message: "Custom error object",
    } as any);

    render(<RouterErrorBoundary />);

    expect(screen.getByTestId("error-message").textContent).toBe(
      "[object Object]",
    );
  });

  it("handles string errors correctly", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    mockUseRouteError.mockReturnValue("String error message");

    render(<RouterErrorBoundary />);

    expect(screen.getByTestId("error-message").textContent).toBe(
      "String error message",
    );
  });

  it("handles null or undefined errors", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    mockUseRouteError.mockReturnValue(null);

    render(<RouterErrorBoundary />);

    expect(screen.getByTestId("error-message").textContent).toBe("null");
  });
});
