import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { RegistrationFormSchema, TRegistrationForm } from "@/utils/zod-schemas";
import prisma from "@/server/db";

export async function GET() {
  return NextResponse.json({ message: "Hello from the API!" });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: TRegistrationForm = req.body;
    console.log(body);
    const validationResult = RegistrationFormSchema.safeParse(body);

    if (!validationResult.success) {
      throw new Error(
        "Validation error: " +
          validationResult.error.errors.map((e) => e.message).join(", ")
      );
    }

    const {
      name,
      usn,
      email,
      contact,
      designation,
      photo,
      collegeIdCard,
      entityName,
      referralId,
      createdById,
    } = body;

    const newFormEntry = await prisma.form.create({
      data: {
        name,
        usn,
        email,
        contact,
        designation,
        photo,
        collegeIdCard,
        entityName,
        referralId,
        createdById,
      },
    });

    return NextResponse.json({ message: newFormEntry });
  } catch (error) {
    console.error(error);
    res;
  }
}
