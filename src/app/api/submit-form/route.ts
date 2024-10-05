import { NextRequest, NextResponse } from "next/server";
import { RegistrationFormSchema, TRegistrationForm } from "@/utils/zod-schemas";
import prisma from "@/server/db";
import { getPrice } from "@/app/actions/get-price";
import getErrorMessage from "@/utils/getErrorMessage";

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
          validationResult.error.errors.map((e) => e.message).join(", "),
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
      referralUsed,
      createdById,
    } = body;

    let { finalPrice } = await getPrice(referralUsed);

    await prisma.$transaction(async (tx) => {
      prisma.referral.update({
        where: {
          code: referralUsed,
        },
        data: {
          usedById: email,
          isUsed: true,
        },
      });

      const newFormEntry = await prisma.form.create({
        data: {
          name,
          usn: usn || "",
          email,
          contact,
          designation,
          photo: photo || "",
          collegeIdCard,
          entityName,
          referralUsed,
          paidAmount: finalPrice,
          createdById,
        },
      });
      return NextResponse.json({ newFormEntry }, { status: 201 });
    });
  } catch (error: any) {
    console.error(error);
    const message = getErrorMessage(error);
    return NextResponse.json(
      { error: message || "An error occurred" },
      { status: 400 }, // Error response
    );
  }
}
