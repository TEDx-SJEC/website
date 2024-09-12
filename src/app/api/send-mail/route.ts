import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/utils/sendMail";
import otpGenerator from "otp-generator";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  console.log(body);
  const mailResponse = await sendEmail({
    email: body.email,
    name: body.name,
    OTP: otp,
  });

  return NextResponse.json({
    message: "Email sent successfully!",
    mailResponse,
  });
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the Send mail!" });
}
