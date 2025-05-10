"use client"
import { StateProvider, store } from "@repo/store/baclance";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/toaster";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StateProvider store={store}>
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <Toaster/>
        {children}
      </ThemeProvider>
    </SessionProvider>
  </StateProvider>
}

