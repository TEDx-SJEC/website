"use server";

import prisma from "@/server/db";

export const isAllowedToAccess = async (email: string): Promise<boolean> => {
    if (!email) return false;
  try {
    const user = await prisma.sjecUser.findFirst({
      where: {
        email: email,
      },
    });
    return user !== null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return false;
  }
};
