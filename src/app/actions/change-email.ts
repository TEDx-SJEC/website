"use server";

import prisma from "@/server/db";
import { getServerSession } from "next-auth";

async function changeEmail(email: string) {
  const session = await getServerSession();
  if (!session || session.user.role !== "ADMIN") {
    return { message: "Unauthorized", isOk: false };
  }
  try {
    await prisma.user.update({
      where: { email },
      data: { email },
    });
    return { message: "Email updated successfully", isOk: true };
  } catch (error) {
    console.error("Error updating user email:", error);
    return { message: "Error updating user email", isOk: false };
  }
}

export default changeEmail;
