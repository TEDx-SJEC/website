import { authOptions } from "@/lib/auth-options";
import { getServerSideSession } from "@/lib/get-server-session";
import { razorpay } from "@/lib/razorpay";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = context.params;

    try {
        const paymentData = await razorpay.payments.fetch(id);
        return NextResponse.json(paymentData);
    } catch (error) {
        console.error("Error fetching payment data:", error);

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
