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

export interface FormDataInterface {
    designation: "student" | "faculty" | "employee";
    foodPreference: "veg" | "non-veg";
    name: string;
    email: string;
    phone: string;
    entityName?: string;
    photo: string;
    idCard?: string;
    usn?: string;
    amount: string;
    couponCode?: string;
}
