import { authOptions } from "@/lib/auth-options";
import { razorpay } from "@/lib/razorpay";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }
    if (session.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden", isOk: false }, { status: 403 });
    }

    const { id } = context.params;
    try {
        const paymentData = await razorpay.payments.fetch(id);
        return NextResponse.json(paymentData, { status: 200 });
    } catch (error) {
        console.error("Error fetching payment data:", error);
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }
}
