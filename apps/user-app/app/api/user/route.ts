import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/authOptions"
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)
        if (session?.user) {
            return NextResponse.json({
                user: session.user
            })
        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 403
        })

    }
}