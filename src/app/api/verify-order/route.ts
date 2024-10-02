import { NextRequest, NextResponse } from "next/server";
import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { sendRegistrationEmail } from "@/lib/send-registration-email";
import { generatedSignature } from "@/lib/helper";



export async function POST(request: NextRequest) {
    const { orderId, razorpayPaymentId, razorpaySignature, amount } = await request.json();
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "No session", isOk: false }, { status: 400 });
    }
    const signature = generatedSignature(orderId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
        return NextResponse.json({ message: "payment verification failed", isOk: false }, { status: 400 });
    }
    if (signature === razorpaySignature) {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email!,
            },
        });

        try {
            await sendRegistrationEmail({
                email: session.user?.email!,
                name: session.user?.name!,
                registrationLink: `http://localhost:3000/admin/verify/${razorpayPaymentId}`,
            });
        } catch (error) {
            console.log(error);
        }
        await prisma.$transaction(async (prisma) => {
            await prisma.payment.create({
                data: {
                    amount: amount,
                    orderCreationId: orderId,
                    razorpayPaymentId: razorpayPaymentId,
                    signature: razorpaySignature,
                    user: { connect: { email: session.user?.email! } },
                },
            });
        });
        return NextResponse.json({ message: "payment verified successfully", isOk: true }, { status: 200 });
    }
}
