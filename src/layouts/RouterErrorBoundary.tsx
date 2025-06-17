import ErrorScreen from "../components/ui/ErrorScreen";
import { isRouteErrorResponse, useRouteError } from "react-router";

export function RouterErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorScreen
        error={new Error(`${error.status} ${error.statusText}: ${error.data}`)}
      />
    );
  }

  return (
    <ErrorScreen
      error={error instanceof Error ? error : new Error(String(error))}
    />
  );
}
