import { EmailTemplate } from "@/components/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function MailUsingResend({
  email,
  name,
  OTP,
}: {
  email: string;
  name: string;
  OTP: string;
}) {
  console.log("MailUsingResend");
  try {
    const { data, error } = await resend.emails.send({
      from: "Tedx SJEC <onboarding@resend.dev>",
      to: [email],
      subject: "Email Verification",
      react: EmailTemplate({
        name: name,
        OTP: OTP,
        email: email,
      }),
    });
    console.log(data, error);
    if (error) {
      return { error, status: 500 };
    }

    return { data, status: 200 };
  } catch (error) {
    return { error, status: 500 };
  }
}
