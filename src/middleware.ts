import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register"];

  if (!accessToken) {
    // If user is unauthenticated and not on a public route, redirect to /login
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Allow access to public routes
    return NextResponse.next();
  }

  // If user is authenticated and tries to access public routes, redirect to dashboard
  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to dashboard/home
  }

  // Allow authenticated users to proceed
  return NextResponse.next();
}

// Apply middleware to all routes except those listed
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
