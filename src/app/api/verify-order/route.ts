import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";

const generatedSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;

    const sig = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
    return sig;
};

export async function POST(request: NextRequest) {
    const { orderId, razorpayPaymentId, razorpaySignature, amount } = await request.json();
    const session = await getServerSideSession();
    if(!session){
        return NextResponse.json({ message: "No session", isOk: false }, { status: 400 });
    }
    const signature = generatedSignature(orderId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
        return NextResponse.json({ message: "payment verification failed", isOk: false }, { status: 400 });
    }
    await prisma.payment.create({
        data: {
            signature: razorpaySignature as string,
            userId: session?.user.id!,
            amount,
            orderCreationId: orderId,
            razorpayPaymentId: razorpayPaymentId,
        },
    });
    return NextResponse.json({ message: "payment verified successfully", isOk: true }, { status: 200 });
}
