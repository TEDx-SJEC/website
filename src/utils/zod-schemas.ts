import { z } from "zod";

export const RegistrationFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  usn: z.string(),
  email: z.string().email(),
  contact: z.string().optional(),
  designation: z.string().optional(),
  photo_url: z
    .string()
    .refine(
      (value) => value.startsWith("http://") || value.startsWith("https://"),
      {
        message: "Invalid photo URL",
      }
    ),
  college_id_card: z.string().optional(),
  entity_name: z.string(),
  referral_id: z.string().optional(),
  created_by_id: z.string(),
});

export type TRegistrationForm = z.infer<typeof RegistrationFormSchema>;
