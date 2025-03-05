import React from 'react'
import { Button } from './button';

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: ()=>void,
    onSignout: ()=>void
}

export function Appbar({onSignin,onSignout,user}:AppbarProps) {
    return (
        <div>
            <nav className="bg-white border-gray-200 border-b">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto ">

                    <span className="self-center text-xl  font-semibold whitespace-nowrap ">PayTM</span>

                    <div className="">
                    <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
                    </div>

                </div>
            </nav>

        </div>
    )
}
