import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublic =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verifyemail";

  const isToken = request.cookies.get("token")?.value || "";

  if (isPublic && isToken) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  if (!isPublic && !isToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail","/password/[type]"],
};
