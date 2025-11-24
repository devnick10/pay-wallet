"use client";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./components/storeProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </StoreProvider>
  );
};
