"use client";
import { StateProvider, userStore } from "@repo/store/utils";
import { SessionProvider } from "next-auth/react";
export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StateProvider store={userStore}>
      <SessionProvider>{children}</SessionProvider>
    </StateProvider>
  );
};
