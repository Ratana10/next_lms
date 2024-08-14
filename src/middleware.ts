import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, apiAuthPrefix } from "./routes";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isLoggedIn) {
    const token = req.auth?.user.token;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      // Check if token is expired
      if (Date.now() >= decodedToken.exp * 1000) {
        // Redirect to login if token is expired
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
      }
    }
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

// invoke Middleware every routes
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
