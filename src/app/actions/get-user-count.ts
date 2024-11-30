"use server";
import prisma from "@/server/db";
import { getServerSideSession } from "@/lib/get-server-session";

export default async function getUserCount() {
    const session = await getServerSideSession();
    if (!session) {
        return null;
    }

    const userCount = await prisma.user.count();

    return userCount;
}