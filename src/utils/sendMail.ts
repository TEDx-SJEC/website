import nodemailer from "nodemailer";

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

interface sendEmail {
  email: string;
  name: string;
  emailVeificationLink: string;
}

export const sendEmail = async (options: sendEmail) => {
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
    subject: "Tedx SJEC Email verification",
    html: `<p> Click on the link below to register for Tiara 2024 </p> <a href=${options.emailVeificationLink}>Register</a>`,
    text: `Click on the link below to register for Tiara 2024 ${options.emailVeificationLink}`,
  };

  const mailResponse = await transporter.sendMail(mailOptions);
  return mailResponse;
};
