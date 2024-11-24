"use client";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const ReactQuery = ({ children }: { children: ReactNode }) => {
  const queyClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queyClient}>{children}</QueryClientProvider>
      <Toaster />
    </>
  );
};

export default ReactQuery;
