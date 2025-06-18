import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LinkButton from "@/components/ui/link-button";

vi.mock("react-router", () => ({
  Link: vi.fn(({ to, children, className, "aria-label": ariaLabel }) => (
    <a
      href={to}
      className={className}
      aria-label={ariaLabel}
      data-testid="mock-link"
    >
      {children}
    </a>
  )),
}));

const MockIcon = vi.fn(() => <span data-testid="mock-icon">Icon</span>);

describe("LinkButton Component", () => {
  beforeEach(() => {
    MockIcon.mockClear();
  });

  it("creates a navigational link with the correct destination", () => {
    render(<LinkButton to="/dashboard" icon={MockIcon} />);
    const link = screen.getByTestId("mock-link");
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("displays both icon and label when provided", () => {
    render(<LinkButton to="/profile" icon={MockIcon} label="User Profile" />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("User Profile")).toBeInTheDocument();
  });

  it("works with icon-only mode (no label)", () => {
    render(<LinkButton to="/settings" icon={MockIcon} />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
  });

  it("provides accessible labels for icon-only links", () => {
    render(<LinkButton to="/reports" icon={MockIcon} label="Reports" />);
    const link = screen.getByTestId("mock-link");
    expect(link).toHaveAttribute("aria-label", "Go to Reports");
  });

  it("allows customization with additional CSS classes", () => {
    render(
      <LinkButton
        to="/help"
        icon={MockIcon}
        label="Help Center"
        className="prominent"
      />,
    );

    const link = screen.getByTestId("mock-link");
    expect(link.className).toContain("prominent");
    expect(screen.getByText("Help Center")).toBeInTheDocument();
  });

  it("supports different navigation paths", () => {
    const urls = ["/simple-path", "/nested/path/here", "/items/123", "/"];

    urls.forEach((url) => {
      const { unmount } = render(<LinkButton to={url} icon={MockIcon} />);
      expect(screen.getByTestId("mock-link")).toHaveAttribute("href", url);
      unmount(); ¿
    });
  });
});
