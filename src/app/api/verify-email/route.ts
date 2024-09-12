import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/utils/sendMail";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const mailResponse = await sendEmail({
    email: body.email,
    name: body.name,
    emailVeificationLink: `http://localhost:3000/verify-email?token=${body.token}`,
  });

  return NextResponse.json({ message: "Email sent successfully!", mailResponse });
  
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the Send mail!" });
}