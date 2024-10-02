import { getServerSideSession } from "@/lib/get-server-session";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } }) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
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
