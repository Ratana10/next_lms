import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema/definition";
import { loginService } from "./services/auth.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { username, password } = await loginSchema.parseAsync(
          credentials
        );

        try {
          const { token } = await loginService({ username, password });

          if (!token) {
            console.error("Login failed");
            return null;
          }

          // Extract user information from the JWT
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const { sub: username2, exp: expireTime } = decodedToken;

          let user = {
            id: "1",
            name: username2,
            token,
            expireTime,
          };

          return user;
        } catch (error: any) {
          throw new Error(`${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.token = user.token;
        token.expireTime = user.expireTime;
      }

      // Check if the token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (
        typeof token.expireTime === "number" &&
        token.expireTime < currentTime
      ) {
        console.log("token expired");
        return null;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.token = token.token as string;
        session.user.expireTime = token.expireTime as number;
      }
      return session;
    },
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Allow access to /auth/login and /auth/register without being logged in
      if (
        !isLoggedIn &&
        (pathname === "/auth/login" || pathname === "/auth/register")
      ) {
        return true;
      }

      // If the user is already logged in, redirect them to the dashboard
      if (isLoggedIn && pathname.startsWith("/auth")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
