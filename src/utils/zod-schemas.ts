import { z } from "zod";

export const RegistrationFormSchema = z
  .object({
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
  })

export type TRegistrationForm = z.infer<typeof RegistrationFormSchema>;

export const emailSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});
