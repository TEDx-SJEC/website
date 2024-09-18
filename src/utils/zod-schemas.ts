import { z } from "zod";

export const RegistrationFormSchema = z.object({
  name: z.string(),
  usn: z.string(),
  email: z.string().email(),
  contact: z.string().optional(),
  designation: z.string().optional(),
  photo: z
    .string()
    .refine(
      (value) => value.startsWith("http://") || value.startsWith("https://"),
      {
        message: "Invalid photo URL",
      }
    ),
  collegeIdCard: z.string().optional(),
  entityName: z.string(),
  referralId: z.string().optional(),
  createdById: z.string(),
});

export type TRegistrationForm = z.infer<typeof RegistrationFormSchema>;


export const emailSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});