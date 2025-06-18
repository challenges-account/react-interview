import { WarningCircleIcon } from "@phosphor-icons/react";

interface ErrorScreenProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
}

const ErrorScreen = ({ error, resetErrorBoundary }: ErrorScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <WarningCircleIcon size={64} className="text-red-300 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-600 mb-6">
        {error?.message ||
          "An unexpected error occurred. Please try again later."}
      </p>
      {resetErrorBoundary && (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={resetErrorBoundary}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorScreen;
