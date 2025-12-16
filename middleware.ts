import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value

  // Protected routes that require authentication
  const protectedRoutes = ["/course", "/get-started"]

  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Allow authenticated users to access protected routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/course/:path*", "/get-started/:path*"],
}
