import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const adminPaths = [/^\/admin/];
  const authPaths = ["/login", "/signup"];
  const protectedPaths = ["/profile", "/orders", "/checkout"];
  const user = (await getCurrentUser()) as TUser | null;
  const pathname = request.nextUrl.pathname;
  console.log(pathname, "middleware");

  if (!user) {
    if (authPaths.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
  }

  if (pathname === "/login" && user?.role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (adminPaths.some((path) => path.test(pathname))) {
    if (user?.role && user?.role === "admin") {
      return NextResponse.next();
    }
  }

  if (protectedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/admin/:path*",
    "/profile",
    "/orders",
    // "/checkout",
  ],
};
