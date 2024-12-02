"use server";

import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { FormDataInterface } from "@/types";
import { z } from "zod";

const amountSchema = z.number().positive("Amount must be a positive number.");

export async function submitForm(data: FormDataInterface, amount: number) {
  const session = await getServerSideSession();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  const validatedAmount = amountSchema.parse(amount);

  const totalAmount = Math.round(validatedAmount + validatedAmount * 0.02);

  try {
    return await prisma.form.create({
      data: {
        name: data.name,
        usn: data.usn,
        email: data.email,
        foodPreference: data.foodPreference,
        contact: data.phone,
        designation: data.designation,
        paidAmount: totalAmount,
        photo: data.photo,
        collegeIdCard: data.idCard,
        createdById: session.user.id,
        entityName: data.entityName,
      },
    });
  } catch (error) {
    console.error("Error creating form:", error);
    throw new Error("Failed to submit the form. Please try again later.");
  }
}
