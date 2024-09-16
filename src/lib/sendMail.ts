import { EmailTemplate } from "@/components/email-template";
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
  
    const mailOptions: EmailOptions = {
      from: `"Tedx SJEC" <${process.env.GMAIL_USER}>`,
      to: options.email,
      subject: "Tedx SJEC - Your OTP for Email Verification",
      html: EmailTemplate({
        name: options.name,
        OTP: options.OTP,
        email: options.email,
      })?.toString() || '',
      text: ""
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return { mailResponse, status: 200 };
  }
  catch (error) {
    return { error, status: 500 };
  }
};

export default sendEmail;
