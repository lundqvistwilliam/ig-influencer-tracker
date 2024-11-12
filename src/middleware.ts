import { decrypt } from "@/lib/sessions/sessions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ['/home', '/dashboard', '/settings', '/campaigns/:path*'],
};

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/home', '/dashboard', '/settings', '/campaigns'];
  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedRoute) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (sessionCookie) {
      const session = await decrypt(sessionCookie.value);

      if (session?.userId) {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }
  return NextResponse.next();
}