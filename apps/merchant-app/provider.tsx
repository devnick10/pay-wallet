"use client"
import { StateProvider, store } from "@repo/store/baclance";
import { SessionProvider } from "next-auth/react";
export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <StateProvider store={store}>
        <SessionProvider>
            {children}
        </SessionProvider>
    </StateProvider>
}

