import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./schema/definition"
import { loginService } from "./services/auth.service"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { username, password } = await loginSchema.parseAsync(credentials)

        const data = await loginService({username, password})
        let user = {
          id: 1,
          username,
          role: "ADMIN",
          token: data.token
        }
          
        return user
      },
    }),

  ],
  callbacks:{
    session({ session, token }) {
        if(token?.sub){
            session.user.id=token.sub;
            session.user.username=token.username;
            session.user.token=token.token;
            session.user.role=token.role;
        }
        return session
      },
    jwt({ token, user }) {
        if(user){
          token.id=user.id;
          token.username=user.username;
          token.token=user.token;
          token.role=user.role;
        }
        return token
      },
     
  }
})