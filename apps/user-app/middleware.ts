import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const privateRoutes = [
    "/dashboard",
    "/add-money",
    "/send-p2p",
    "/settings",
    "/wallet-history",
    "/p2p-history",
  ];

  const isProtected = privateRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (token && request.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/add-money",
    "/send-p2p",
    "/settings",
    "/wallet-histroy",
    "/p2p-histroy",
    "/signin",
    "/",
  ],
};
