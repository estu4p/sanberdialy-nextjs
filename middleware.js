import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExists = !!request.cookies.get("user_token");
  const isLoginPage = pathname.startsWith("/login");

  if (isCookiesExists === true && isLoginPage === true) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isCookiesExists === false && isLoginPage === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
