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
          let user = {
            id: "1",
            username,
            role: "ADMIN",
            token,
          };
console.log("user", user)
          return user;
        } catch (error: any) {
          throw new Error(`${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.token = token.token as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.token = user.token;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
