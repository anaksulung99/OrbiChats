import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const adminRoutes = [
  "/dashboard",
  "/campaigns",
  "/agents",
  "/profile",
  "/security",
  "/support",
];

const authRoutes = ["/login", "/forgot-password", "/reset-password"];

function isRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isRoute(pathname, adminRoutes) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.href);

    return NextResponse.redirect(loginUrl);
  }

  if (isRoute(pathname, authRoutes) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|monitoring|trpc|_next|_vercel|.*\\..*).*)"],
};
