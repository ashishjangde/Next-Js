import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";

  const publicPaths = ['/login', '/signup', '/verifyemail'];

  if (token && publicPaths.includes(pathName)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!publicPaths.includes(pathName) && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verifyemail",
    "/profile",
  ],
};
