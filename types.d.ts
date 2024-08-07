import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      token: string;
      role: string;
    };
  }

  interface User {
    id: string;
    username: string;
    token: string;
    role: string;
  }
}
