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
            subject: "Event Registration Successful - TEDx SJEC",
            react: TedxRegistrationEmail({ name, registrationLink }),
        });
    } catch (error) {
        console.log(error);
    }
}
