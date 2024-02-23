// Import necessary dependencies
"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Define a wrapper component to provide React Query functionality to the app
const QueryWrapper = ({ children }) => {
  // Create a new instance of QueryClient
  const queryClient = new QueryClient();

  // Wrap the application with QueryClientProvider and pass the created QueryClient
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// Export the QueryWrapper component for use in other parts of the application
export default QueryWrapper;
