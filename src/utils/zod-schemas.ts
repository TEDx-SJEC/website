import { z } from "zod";

export const RegistrationFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  usn: z.string().optional(),
  email: z.string().email("Invalid email format"),
  contact: z.string().length(10, "Contact must be exactly 10 digits"),
  designation: z
    .string()
    .refine((value) => ["Student", "Faculty", "Employee"].includes(value), {
      message: "Invalid designation",
    }),
  photo: z.string().optional(),
  collegeIdCard: z.string().optional(),
  entityName: z.string().min(1, "Entity name is required"),
  referralUsed: z.string().optional(),
  createdById: z.string(),
});

export type TRegistrationForm = z.infer<typeof RegistrationFormSchema>;

export const emailSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export const baseSchema = z.object({
  designation: z.enum(["student", "faculty", "external"]),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
  photo: z.string(),
  entityName: z.string().optional(),
  couponCode: z.string().optional(),
  foodPreference: z.enum(["veg", "non-veg"]),
});

export const studentSchema = baseSchema.extend({
  usn: z.string().min(1, { message: "USN is required for students." }),
  idCard: z.string().min(1, { message: "ID Card is required for students." }),
});

export const studentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
  usn: z.string().min(1, { message: "USN is required for students." }),
  idCard: z.string().min(1, { message: "ID Card is required for students." }),
  photo: z.string().min(1, { message: "Photo is required." }),
});
