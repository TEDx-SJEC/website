import { EmailTemplate } from "./email-template";
import { renderAsync } from "@react-email/render";
import { EmailOptions, sendEmail as SendEmailType } from "@/types";
import nodemailer from "nodemailer";

export const sendEmail = async (options: SendEmailType) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const emailHtml = await renderAsync(
      <EmailTemplate
        name={options.name}
        email={options.email}
        OTP={options
          .OTP}
      />
    )

    const mailOptions: EmailOptions = {
      from: `"Tedx SJEC" <${process.env.GMAIL_USER}>`,
      to: options.email,
      subject: "Tedx SJEC - Your OTP for Email Verification",
      html: emailHtml,
      text: `Hello ${options.name},\n\nThank you for registering for Tedx 2024.\n\nYour One-Time Password (OTP) for email verification is:\n\n${options.OTP}\n\nPlease enter this OTP to complete your registration. The OTP is valid for 10 minutes.\n\nThank you!\n\nTedx SJEC Team`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return { mailResponse, status: 200 };
  } catch (error) {
    return { error, status: 500 };
  }
};

export default sendEmail;
