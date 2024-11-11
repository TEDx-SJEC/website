"use server";

import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { FormDataInterface } from "@/types";

export async function submitForm(data: FormDataInterface, amount: number) {
  const session = await getServerSideSession();
  if (!session) {
    return;
  }

  return await prisma.form.create({
    data: {
      name: data.name,
      usn: data.usn,
      email: data.email,
      foodPreference: data.foodPreference,
      contact: data.phone,
      designation: data.designation,
      paidAmount: amount,
      photo: data.photo,
      collegeIdCard: data.idCard,
      createdById: session.user.id,
      entityName: data.entityName,
    },
  });
}
