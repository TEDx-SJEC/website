import NextAuth from "next-auth"
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/server/db";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

export const authOptions:NextAuthOptions = {
    session:{
        strategy: "jwt",
    },
  providers: [
    // ...add more providers here
    GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
      })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if(!profile?.email){
        throw new Error("No email returned from Google")
      }
      const user = await prisma.user.findUnique({
        where: {
          email: profile.email
        }
      })
      if(!user){
        await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name,
          }
        })
      }
      console.log("signIn", profile)
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
}

export default NextAuth(authOptions)