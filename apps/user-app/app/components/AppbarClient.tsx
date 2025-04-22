"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/Appbar";

export function AppbarClient() {
    const session = useSession();

    return (
        <div>
            <Appbar onSignin={signIn} onSignout={async () => {
                await signOut()
            }} user={session.data?.user} />
        </div>
    );
}
