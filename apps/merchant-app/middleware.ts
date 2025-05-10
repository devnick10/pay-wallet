import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const token = await getToken({ req: request, secret: process.env.JWT_SECRET })

    if (token && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    if (!token && request.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL("/", request.url))
    }

}

export const config = {
    matcher: ["/dashboard", '/']
}
