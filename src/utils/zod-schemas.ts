import { z } from "zod";

export const RegistrationFormSchema = z
  .object({
    name: z.string().min(1),
    usn: z
      .string()
      .regex(/^4SO\d{2}[A-Za-z]{2}\d{3}$/, {
        message:
          "USN must follow the format 4SO followed by two digits, two letters, and three digits (e.g., 4SO21CS071)",
      })
      .optional(),
    email: z.string().email(),
    contact: z.string().min(10).max(10),
    designation: z.string().refine(
      (value) => ["Student", "Faculty", "Alumni"].includes(value),
      {
        message: "Invalid designation",
      }
    ),
    photo: z
      .string()
      .refine(
        (value) => value.startsWith("http://") || value.startsWith("https://"),
        {
          message: "Invalid photo URL",
        }
      ),
    collegeIdCard: z.string().optional(),
    entityName: z.string().min(1),
    referralUsed: z.string().optional(),
    createdById: z.string(),
  })
  .refine(
    (data) => {
      if (data.designation === "Student") {
        return data.usn && data.collegeIdCard;
      }
      return true;
    },
    {
      message: "College ID Card and USN are required for students",
      path: ["usn", "collegeIdCard"],
    }
  );

export type TRegistrationForm = z.infer<typeof RegistrationFormSchema>;

export const emailSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});
