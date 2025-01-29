"use client";
import { CartProvider } from "@/context/cart-provider";
import UserProvider from "@/context/user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <UserProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CartProvider>
    </UserProvider>
  );
}
