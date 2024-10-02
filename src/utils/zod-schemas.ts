import { z } from "zod";

export const RegistrationFormSchema = z
  .object({
    name: z.string().min(1),
    usn: z.string().optional(),
    email: z.string().email(),
    contact: z.string().min(10).max(10),
    designation: z
      .string()
      .refine((value) => ["Student", "Faculty", "Employee"].includes(value), {
        message: "Invalid designation",
      }),
    photo: z.instanceof(File),
    collegeIdCard: z.instanceof(File).optional(),
    entityName: z.string().min(1),
    referralUsed: z.string().optional(),
    createdById: z.string(),
  })
  .refine(
    (data) => {
      if (data.designation === "Student") {
        return data.collegeIdCard;
      }
      return true;
    },
    {
      message: "College ID Card are required for students",
      path: ["collegeIdCard"],
    }
  );

export type TRegistrationForm = z.infer<typeof RegistrationFormSchema>;

export const emailSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});
