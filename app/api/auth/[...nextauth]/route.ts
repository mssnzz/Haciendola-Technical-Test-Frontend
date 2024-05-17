import { loginUser } from "@/app/services/authentication";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        if (!credentials.username || !credentials.password) {
          return null;
        }

        const user = await loginUser(
          credentials.username,
          credentials.password
        );
        if (!user.error) {
          return { ...user.data, username: credentials.username };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/authentication/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
export { handler as GET, handler as POST };
