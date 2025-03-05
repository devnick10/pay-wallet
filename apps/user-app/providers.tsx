"use client"
import { Provider, store } from "@repo/store/baclance";
import { SessionProvider } from "next-auth/react";
export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>
        <SessionProvider>
            {children}
        </SessionProvider>
    </Provider>
}

