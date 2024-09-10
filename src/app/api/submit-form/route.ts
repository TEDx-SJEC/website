import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { RegistrationFormSchema, TRegistrationForm } from "@/utils/zod-schemas";

export async function GET() {
  return NextResponse.json({ message: "Hello from the API!" });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: TRegistrationForm = req.body;
    console.log(body);
    const validationResult = RegistrationFormSchema.safeParse(body);

    if (!validationResult.success) {
      throw new Error(
        "Validation error: " +
          validationResult.error.errors.map((e) => e.message).join(", ")
      );
    }

    const {
      name,
      usn,
      email,
      contact,
      designation,
      photo_url,
      referral_id,
      college_id_card,
      entity_name,
      created_by_id,
    } = body;

    return NextResponse.json({ message: body });
  } catch (error) {
    console.error(error);
    res;
  }
}
