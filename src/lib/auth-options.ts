import {
  DefaultSession,
  type NextAuthOptions,
  type Session as NextAuthSession,
} from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/server/db";
import { UserRoleType } from "@/types";
import { JWT } from "next-auth/jwt";
import { getUserById } from "@/app/actions/get-user-by-id";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRoleType;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRoleType;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }): Promise<any> {
      //add user role to token
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      if (token.id) {
        const updatedUser = await getUserById(token.id);
        return {
          ...token,
          role: updatedUser?.role,
        };
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: NextAuthSession;
      token: JWT;
    }): Promise<any> {
      //add role to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role as UserRoleType,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
};

export const handlers = NextAuth(authOptions);
