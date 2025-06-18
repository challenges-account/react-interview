import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

vi.mock("@/components/ui/button", () => ({
  Button: vi.fn(({ children, onClick, disabled, variant }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      role={variant === "destructive" ? "button" : "button"}
      aria-busy={disabled && children === "Processing..."}
    >
      {children}
    </button>
  )),
}));

describe("ConfirmationModal Component", () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Test Confirmation",
    confirmLabel: "Delete",
    cancelLabel: "Go Back",
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is not visible when isOpen is false", () => {
    render(<ConfirmationModal {...mockProps} isOpen={false} />);
    expect(screen.queryByText("Test Confirmation")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Go Back")).not.toBeInTheDocument();
  });

  it("displays the modal content when isOpen is true", () => {
    render(<ConfirmationModal {...mockProps} />);
    expect(screen.getByText("Test Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("performs the confirmation action when confirm button is clicked", () => {
    render(<ConfirmationModal {...mockProps} />);

    const confirmButton = screen.getByText("Delete");
    fireEvent.click(confirmButton);

    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it("closes the modal when cancel button is clicked", () => {
    render(<ConfirmationModal {...mockProps} />);

    const cancelButton = screen.getByText("Go Back");
    fireEvent.click(cancelButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    expect(mockProps.onConfirm).not.toHaveBeenCalled();
  });

  it("closes the modal when clicking outside the dialog (on the backdrop)", () => {
    const { container } = render(<ConfirmationModal {...mockProps} />);

    const backdrop = container.firstChild;
    fireEvent.click(backdrop!);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("prevents closing when clicking inside the modal content (event propagation)", () => {
    render(<ConfirmationModal {...mockProps} />);

    const modalContent = screen.getByText("Test Confirmation").closest("div");
    fireEvent.click(modalContent!);

    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it("displays custom content when children are provided", () => {
    render(
      <ConfirmationModal {...mockProps}>
        <p>Custom confirmation message</p>
      </ConfirmationModal>,
    );

    expect(screen.getByText("Custom confirmation message")).toBeInTheDocument();
  });

  it("prevents interactions during loading state", () => {
    render(<ConfirmationModal {...mockProps} isLoading={true} />);

    expect(screen.getByText("Processing...")).toBeInTheDocument();

    const confirmButton = screen.getByText("Processing...");
    const cancelButton = screen.getByText("Go Back");

    fireEvent.click(confirmButton);
    fireEvent.click(cancelButton);

    expect(mockProps.onConfirm).not.toHaveBeenCalled();
    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it("uses sensible default button labels when not explicitly provided", () => {
    const { confirmLabel, cancelLabel, ...restProps } = mockProps;
    render(<ConfirmationModal {...restProps} />);

    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Confirm"));
    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
  });
});
