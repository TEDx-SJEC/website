import { EmailTemplate } from "../../emails/email-template";
import { ResendEmailOptions, sendEmail as SendEmailType } from "@/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function MailUsingResend({ email, name, OTP }: SendEmailType) {
  console.log(process.env.RESEND_API_KEY);
  try {
    const mailOptions: ResendEmailOptions = {
      from: '"Tedx SJEC" <conceevo@joywincodes.tech>',
      to: email,
      subject: "Tedx SJEC - Your OTP for Email Verification",
      react: EmailTemplate({
        name: name,
        OTP: OTP,
        email: email,
      }),
      text: `Hello ${name},\n\nThank you for registering for Tedx 2024.\n\nYour One-Time Password (OTP) for email verification is:\n\n${OTP}\n\nPlease enter this OTP to complete your registration. The OTP is valid for 10 minutes.\n\nThank you!\n\nTedx SJEC Team`,
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
