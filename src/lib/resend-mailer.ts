import { EmailTemplate } from "@/components/email-template";
import { ResendEmailOptions, sendEmail as SendEmailType } from "@/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function MailUsingResend({ email, name, OTP }: SendEmailType) {
  try {
    const mailOptions: ResendEmailOptions = {
      from: "Tedx SJEC <onboarding@resend.dev>",
      to: email,
      subject: "Email Verification",
      react: EmailTemplate({
        name: name,
        OTP: OTP,
        email: email,
      }),
    };

    const { data, error } = await resend.emails.send(mailOptions);
    console.log(data, error);
    if (error) {
      return { error, status: 500 };
    }

    return { data, status: 200 };
  } catch (error) {
    return { error, status: 500 };
  }
}
