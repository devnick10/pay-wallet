import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET})
    const privateRoutes = [
        '/dashboard',
        '/transfer',
        '/p2p',
        '/transactions'
    ]

    const isProtected = privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
      
    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/transfer", "/p2p", "/transactions"],
}