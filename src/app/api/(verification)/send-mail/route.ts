import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/utils/sendMail";
import otpGenerator from "otp-generator";
import prisma from "@/server/db";
import { addToQueue } from "@/jobs";
import { MailUsingResend } from "@/lib/resend-mailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const expiresIn = 10; // 10 minutes
  const expiresAt = new Date(Date.now() + expiresIn * 60 * 1000);

  await prisma.verificationRequest.create({
    data: {
      identifier: body.email,
      otp,
      expires: expiresAt,
    },
  });
  if (!body.email) {
    return NextResponse.json(
      { message: "No recipients defined", status: 400 },
      { status: 400 }
    );
  }
  console.log(body);
  // const mailResponse = await addToQueue({
  //   email: body.email,
  //   name: body.name,
  //   OTP: otp,
  // });
  const mailResponse = await MailUsingResend();

  return NextResponse.json({
    message: "Email sent successfully!",
    mailResponse,
  });
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the Send mail!" });
}
