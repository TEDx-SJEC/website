import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function MailUsingResend() {
    console.log("MailUsingResend");
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["21a20.joywin@sjec.ac.in"],
      subject: "Hello world",
      react: EmailTemplate({
        name: "John",
        OTP: "123",
        email: "21a20.joywin@sjec.ac.in",
      }),
    });
    console.log(data, error);
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
