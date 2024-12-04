"use server";

import prisma from "@/server/db";

export const isAllowedToAccess = async (email: string): Promise<boolean> => {
    const user = await prisma.sjecUser.findFirst({
        where: {
            email: email,
        },
    });
    return user !== null;
};
