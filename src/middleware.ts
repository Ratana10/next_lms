export { auth as middleware } from "@/auth";

// invoke Middleware every routes
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
