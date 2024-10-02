import { TedxRegistrationEmail } from "../../emails/user-registration-email-template";
import { Resend } from "resend";
import { ResendEmailOptions } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRegistrationEmail({
    email,
    name,
    registrationLink,
}: {
    email: string;
    name: string;
    registrationLink: string;
}) {
    try {
        await resend.emails.send({
            from: '"Tedx SJEC" <conceevo@joywincodes.tech>',
            to: email,
            subject: "Tedx SJEC - Email Verification",
            react: TedxRegistrationEmail({ name, registrationLink }),
            text: `Hello ${name},\n\nThank you for registering for Tedx 2024.\n\nPlease click on the link below to complete your registration.\n\n${registrationLink}\n\nThank you!\n\nTedx SJEC Team`,
        });
    } catch (error) {
        console.log(error);
    }
}
