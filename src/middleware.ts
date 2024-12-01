import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Public routes where authentication is checked
  const publicRoutes = ["/login", "/register"];

  // If no access token, redirect to login
  if (accessToken) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // If access token exists and user tries to access login/register, redirect to dashboard
  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to all routes except those listed
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
