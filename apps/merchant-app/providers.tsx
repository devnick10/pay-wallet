"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import StoreProvider from "./components/storeProvider";
import { Toaster } from "./components/ui/toaster";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </StoreProvider>
  );
};
