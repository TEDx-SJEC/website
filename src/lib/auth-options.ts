import { DefaultSession, Profile, type NextAuthOptions, type Session as NextAuthSession } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/server/db";
import { UserRoleType } from "@/types";
import { JWT } from "next-auth/jwt";
import { getUserById } from "@/app/actions/get-user-by-id";
import { isAllowedToAccess } from "@/app/actions/is-allowed-to-access";

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
        async signIn({ profile }: { profile?: Profile }) {
            if (!profile?.email) return false;

            // Check if the email ends with "@sjec.ac.in"
            if (!profile.email.endsWith("@sjec.ac.in")) {
                return true; // Allow non-sjec emails
            }

            // Extract the prefix of the email before '@'
            const emailPrefix = profile.email.split("@")[0];

            // Define BE and MBA patterns
            const isBEEmail = /^[2][1-4]\d{3}\..+$/; // Matches 21XXXX, 22XXXX, 23XXXX, 24XXXX for BE
            const isMBAEmail = /^[2][3-4]ba\d{3}\..+$/; // Matches 23baXXX, 24baXXX for MBA
            const isMCAEmail = /^[2][3-4]ca\d{3}\..+$/; // Matches 23maXXX, 24maXXX for MCA

            // Check BE email validity
            if (isBEEmail.test(emailPrefix)) {
                return true; // Allow all BE students with valid years
            }

            // Check MBA email validity
            if (isMBAEmail.test(emailPrefix)) {
                return true; // Allow MBA students with valid years
            }
            
            // Check MCA email validity
            if (isMCAEmail.test(emailPrefix)) {
                return true; // Allow MCA students with valid years
            }

            // If the email is sjec but does not fit the BE/MBA patterns, check the database
            const isAllowed = await isAllowedToAccess(profile.email);
            return isAllowed;
        },

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
        async session({ session, token }: { session: NextAuthSession; token: JWT }): Promise<any> {
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
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // debug: process.env.NODE_ENV === "development",
};

export const handlers = NextAuth(authOptions);
