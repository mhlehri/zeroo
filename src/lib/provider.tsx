"use client";
import UserProvider from "@/context/user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
   <UserProvider > <QueryClientProvider client={queryClient}>{children}</QueryClientProvider></UserProvider>
  );
}
