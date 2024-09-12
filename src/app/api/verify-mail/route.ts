import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/utils/sendMail";
import prisma from "@/server/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { identifier, otp } = body;

  const request = await prisma.verificationRequest.findFirst({
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
    return NextResponse.json(
      { message: "Invalid or expired OTP", status: 400 },
      { status: 200 }
    );
  }

  await prisma.verificationRequest.deleteMany({
    where: {
      identifier,
    },
  });

  return NextResponse.json(
    {
      message: "OTP verified successfully back!",
      status: 200,
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the Send mail!" });
}
