import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
    const { amount } = await request.json();
    if (!amount || typeof amount !== "number" || amount <= 0) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    try {
        const shortUUID = randomUUID().split("-")[0]; // Shorten the UUID
        const receipt = `rcpt_${Date.now()}_${shortUUID}`.slice(0, 40); // Ensure it doesn't exceed 40 chars
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt, // Use the shortened receipt
        });

        return NextResponse.json(
            {
                orderId: order.id,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Razorpay order creation error:", error);
        return NextResponse.json(
            {
                error: "Error creating order ",
            },
            {
                status: 500,
            }
        );
    }
}
