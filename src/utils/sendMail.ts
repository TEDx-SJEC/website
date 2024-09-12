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
  OTP: string;
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
    subject: "Tedx SJEC - Your OTP for Email Verification",
    html: `
      <h1>Hello ${options.name},</h1>
      <p>Thank you for registering for Tedx 2024.</p>
      <p>Your One-Time Password (OTP) for email verification is:</p>
      <h2 style="color: #f44336;">${options.OTP}</h2>
      <p>Please enter this OTP to complete your registration. The OTP is valid for 10 minutes.</p>
      <p>Thank you!</p>
      <p><strong>Tedx SJEC Team</strong></p>
    `,
    text: `
      Hello ${options.name},
      
      Thank you for registering for Tedx 2024.
      
      Your One-Time Password (OTP) for email verification is: ${options.OTP}
      
      Please enter this OTP to complete your registration. The OTP is valid for 10 minutes.
      
      Thank you!
      
      Tedx SJEC Team
    `,
  };

  const mailResponse = await transporter.sendMail(mailOptions);
  return mailResponse;
};

export default sendEmail;
