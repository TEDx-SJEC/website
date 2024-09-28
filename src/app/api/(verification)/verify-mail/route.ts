import prisma from "@/server/db";
import getErrorMessage from "@/utils/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { identifier, otp } = body;
  if (!identifier || !otp) {
    return NextResponse.json(
      { message: "Identifier and OTP are required", status: 400 },
      { status: 400 }
    );
  }
  try {
    await prisma.$transaction(async (tx) => {
      const request = await tx.verificationRequest.findFirst({
        where: {
          identifier,
          otp,
          expires: {
            gte: new Date(),
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      if (!request) {
        throw new Error("Verification failed: Invalid or expired OTP");
      }

      await tx.form.updateMany({
        where: {
          email: identifier,
        },
        data: {
          emailVerified: true,
        },
      });

      await tx.verificationRequest.deleteMany({
        where: {
          identifier,
        },
      });
    });

    return NextResponse.json(
      {
        message: "OTP verified successfully back!",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("OTP verification failed:", errorMessage);
    return NextResponse.json(
      { message: errorMessage, status: 400 },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the Send mail!" });
}
