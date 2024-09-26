import { MailUsingResend } from "@/lib/resend-mailer";
import prisma from "@/server/db";
import getErrorMessage from "@/utils/getErrorMessage";
import { emailSchema } from "@/utils/zod-schemas";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = emailSchema.parse(body);

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const expiresIn = 10; // OTP valid for 10 minutes
    const expiresAt = new Date(Date.now() + expiresIn * 60 * 1000);

    await prisma.verificationRequest.create({
      data: {
        identifier: parsedBody.email,
        otp,
        expires: expiresAt,
      },
    });

    const mailResponse = await MailUsingResend({
      email: parsedBody.email,
      name: parsedBody.name,
      OTP: otp,
    });

    // const mailResponse1 = await addToQueue({
    //   email: parsedBody.email,
    //   name: parsedBody.name,
    //   OTP: otp,
    // })

    return NextResponse.json({
      message: "Email sent successfully!",
      mailResponse,
    });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: errorMessage },
        { status: 400 },
      );
    }

    // Handle general server errors
    return NextResponse.json(
      { message: "Internal Server Error", errorMessage },
      { status: 500 },
    );
  }
}

// Test endpoint
export async function GET() {
  return NextResponse.json({ message: "Hello from the Send mail!" });
}
