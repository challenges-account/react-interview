import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import Routes from "./Routes.tsx";
import queryClient from "./api/queryClient";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
