import { NextRequest, NextResponse } from "next/server";
import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { sendRegistrationEmail } from "@/lib/send-registration-email";
import { generatedSignature } from "@/lib/helper";

export async function POST(request: NextRequest) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "No session", isOk: false }, { status: 400 });
    }
    const { email, orderId, razorpayPaymentId, razorpaySignature, amount, name } = await request.json();
    if (!email || !orderId || !razorpayPaymentId || !razorpaySignature || !amount) {
        return NextResponse.json({ message: "Invalid data", isOk: false }, { status: 400 });
    }
    const userEmail =
        session.user?.role === "ADMIN" || session.user?.email !== email ? email : session.user?.email!;

    const signature = generatedSignature(orderId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
        return NextResponse.json({ message: "payment verification failed", isOk: false }, { status: 400 });
    }
    if (signature === razorpaySignature) {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });

        try {
            await sendRegistrationEmail({
                email: userEmail,
                name: name,
                registrationLink: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/verify/${razorpayPaymentId}`,
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
