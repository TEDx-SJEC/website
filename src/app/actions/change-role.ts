"use server";

import prisma from "@/server/db";
import { revalidatePath } from "next/cache";

async function updateUserRole(id: string, role: string) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role },
        });
        revalidatePath("/admin/users");
        return updatedUser;
    } catch (error) {
        console.error("Error updating user role:", error);
        return null;
    }
}
export const makeAdmin = async (userId: string) => {
    return await updateUserRole(userId, "ADMIN");
};

export const makeParticipant = async (userId: string) => {
    return await updateUserRole(userId, "PARTICIPANT");
};
