import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "../ErrorBoundary";
import ErrorScreen from "../ErrorScreen";

vi.mock("../ErrorScreen", () => ({
  default: vi.fn(({ error, resetErrorBoundary }) => (
    <div data-testid="error-screen">
      <span data-testid="error-message">{error && error.message}</span>
      {resetErrorBoundary && (
        <button onClick={resetErrorBoundary} data-testid="reset-button">
          Reset
        </button>
      )}
    </div>
  )),
}));

const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
  vi.resetAllMocks();
});

const Thrower = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Intentional test error");
  }
  return <div data-testid="normal-content">Everything is fine</div>;
};

describe("ErrorBoundary Component", () => {
  it("renders children when no errors are thrown", () => {
    const { queryByTestId } = render(
      <ErrorBoundary>
        <div data-testid="child-content">Content</div>
      </ErrorBoundary>,
    );

    expect(queryByTestId("child-content")).toBeInTheDocument();
    expect(queryByTestId("error-screen")).not.toBeInTheDocument();
  });

  it("renders ErrorScreen when a child component throws", () => {
    const { queryByTestId } = render(
      <ErrorBoundary>
        <Thrower shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(ErrorScreen).toHaveBeenCalled();
  });
});
