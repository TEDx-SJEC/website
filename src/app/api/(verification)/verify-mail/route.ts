import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/utils/sendMail";
import prisma from "@/server/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { identifier, otp } = body;
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
        throw new Error("Invalid or expired OTP");
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
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 400 },
      { status: 200 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the Send mail!" });
}
