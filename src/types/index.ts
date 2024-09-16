import { ReactNode } from "react";


export type UserRoleType = "ADMIN" | "PARTICIPANT";

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface sendEmail {
  email: string;
  name: string;
  OTP: string;
}

export interface ResendEmailOptions {
    from: string;
    to: string;
    subject: string;
    react: ReactNode;
    text: string;
  }