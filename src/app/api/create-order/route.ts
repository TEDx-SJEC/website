import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
    const { amount } = await request.json();
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
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
        console.log(error);
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
