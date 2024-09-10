import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from the API!" });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body;
    console.log(body);

    const {
      name,
      usn,
      email,
      contact,
      photo_url,
      referral_id,
      college_id_card,
      college,
    } = body;

    return NextResponse.json({ message: "Hello from the API!" });
  } catch (error) {
    console.error(error);
    res;
  }
}
