import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = [
  "/notifications",
  "/challenges",
  "/profile",
  "/dashboard",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is a protected route or a child of a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute) {
    // Check for auth token
    const authToken = request.cookies.get("authToken")?.value || "";

    if (!authToken) {
      // Redirect to login page with a return URL
      const url = new URL("/login", request.url);
      url.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    "/notifications/:path*",
    "/challenges/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
  ],
};
