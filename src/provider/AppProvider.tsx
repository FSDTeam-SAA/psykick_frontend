"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";
interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster position="top-right" />
    </QueryClientProvider>
  );
};

export default AppProvider;
