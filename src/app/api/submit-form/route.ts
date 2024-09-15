import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { RegistrationFormSchema, TRegistrationForm } from "@/utils/zod-schemas";
import prisma from "@/server/db";
import determinePrice from "@/utils/determinePrice";

export async function GET() {
  return NextResponse.json({ message: "Hello from the API!" });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const response = await req.json();
    const body: TRegistrationForm = response;
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

    let price = await determinePrice(email, referralId);

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

    return NextResponse.json({ newFormEntry }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 400 } // Error response
    );
  }
}



