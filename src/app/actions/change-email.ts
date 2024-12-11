"use server";

import prisma from "@/server/db";
import { getServerSession } from "next-auth";

export async function getFormDetailsByEmail(email: string) {
  const session = await getServerSession();
  if (!session || session.user.role !== "ADMIN") {
    return { message: "Unauthorized", isOk: false };
  }
  try {
    let forms = await prisma.form.findMany({
      where: {
        email: email,
      },
    });
    return forms;
  } catch (error) {
    console.error("Error updating user email:", error);
    return { message: "Error updating user email", isOk: false };
  }
}

export async function changeEmail(formId: string, email: string) {
  const session = await getServerSession();
  if (!session || session.user.role !== "ADMIN") {
    return { message: "Unauthorized", isOk: false };
  }
  try {
    const updatedForm = await prisma.form.update({
      where: { id: formId },
      data: { email },
    });
    return updatedForm;
  } catch (error) {
    console.error("Error updating user email:", error);
    return { message: "Error updating user email", isOk: false };
  }
}

