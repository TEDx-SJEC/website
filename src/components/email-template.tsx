import * as React from "react";
import { Html, Button } from "@react-email/components";
interface EmailTemplateProps {
  name: string;
  email: string;
  OTP: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  OTP,
}) => (
  <Html>
    <h1>Hello {name},</h1>
    <p>Thank you for registering for Tedx 2024.</p>
    <p>Your One-Time Password (OTP) for email verification is:</p>
    <h2 style={{ color: "#f44336" }}>{OTP}</h2>
    <p>
      Please enter this OTP to complete your registration. The OTP is valid for
      10 minutes.
    </p>
    <p>Thank you!</p>
    <p>
      <strong>Tedx SJEC Team</strong>
    </p>
  </Html>
);
