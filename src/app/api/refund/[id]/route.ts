import { authOptions } from "@/lib/auth-options";
import { getServerSideSession } from "@/lib/get-server-session";
import { razorpay } from "@/lib/razorpay";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const session = await getServerSideSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id } = context.params;
    const amount = request.nextUrl.searchParams.get("amount");

    if (!amount) {
        return NextResponse.json({ error: "Refund amount is required" }, { status: 400 });
    }

    const refundAmount = parseInt(amount);

    if (isNaN(refundAmount) || refundAmount <= 0) {
        return NextResponse.json({ error: "Invalid refund amount" }, { status: 400 });
    }

    try {
        const refundData = await razorpay.payments.refund(id, {
            amount: refundAmount * 100, // Convert to paise
        });
        if (refundData.amount) {
            return NextResponse.json(
                {
                    message: "Refund processed successfully",
                    refundId: refundData.id,
                    amount: refundData.amount / 100, // Convert back to rupees for the response
                    status: refundData.status,
                },
                { status: 200 }
            );
        }
        
    } catch (error) {
        console.error("Error processing refund:", error);

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { error: "An unexpected error occurred while processing the refund" },
            { status: 500 }
        );
    }
}
