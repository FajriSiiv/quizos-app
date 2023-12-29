"use client";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
};

export default MainLayout;
