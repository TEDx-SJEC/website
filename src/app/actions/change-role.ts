"use server";

import prisma from "@/server/db";
import { getServerSideSession } from "@/lib/get-server-session";
import { revalidatePath } from "next/cache";
import getErrorMessage from "@/utils/getErrorMessage";

export enum UserRole {
  ADMIN = "ADMIN",
  PARTICIPANT = "PARTICIPANT",
  COORDINATOR = "COORDINATOR",
}

const ADMIN_USERS_PATH = "/admin/users";

async function updateUserRole(id: string, role: UserRole) {
  const VALID_ROLES = Object.values(UserRole);
  if (!VALID_ROLES.includes(role)) {
    throw new Error(`Invalid role: ${role}`);
  }
  const session = await getServerSideSession();
  if (!session || session.user.role !== UserRole.ADMIN) {
    throw new Error("Unauthorized Access...");
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });
    revalidatePath(ADMIN_USERS_PATH);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user role:", getErrorMessage(error));
    throw new Error("Failed to update user role. Please try again later.");
  }
}

export const makeAdmin = async (userId: string) => {
  try {
    return await updateUserRole(userId, UserRole.ADMIN);
  } catch (error) {
    console.error("Failed to make user admin:", getErrorMessage(error));
    return null;
  }
};

export const makeParticipant = async (userId: string) => {
  try {
    return await updateUserRole(userId, UserRole.PARTICIPANT);
  } catch (error) {
    console.error("Failed to make user participant:", getErrorMessage(error));
    return null;
  }
};

export const makeOrganizer = async (userId: string) => {
  try {
    return await updateUserRole(userId, UserRole.COORDINATOR);
  } catch (error) {
    console.error("Failed to make user coordinator:", getErrorMessage(error));
    return null;
  }
};
