import NextAuth from "next-auth"
import { type NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)