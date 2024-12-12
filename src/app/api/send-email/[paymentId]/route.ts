import { getServerSideSession } from "@/lib/get-server-session";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { sendRegistrationEmail } from "@/lib/send-registration-email";
import { generatedSignature } from "@/lib/helper";

export async function POST(request: NextRequest, context: { params: { paymentId: string } }) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden", isOk: false }, { status: 403 });
    }

    const { paymentId } = context.params;
    const payment = await razorpay.payments.fetch(paymentId);
    const signature = generatedSignature(payment.order_id, payment.id);

    try {
        if (payment.status !== "captured") {
            return NextResponse.json({ message: "Payment not captured", isOk: false }, { status: 400 });
        }
        // Check if payment exists in the database
        const existingPayment = await prisma.payment.findUnique({
            where: { razorpayPaymentId: payment.id },
        });

        if (!existingPayment) {
            // Add payment details to the database
            let totalAmount = Math.round(
                parseFloat(payment.notes.amount) + parseFloat(payment.notes.amount) * 0.02
            );
            await prisma.payment.create({
                data: {
                    signature: signature,
                    userId: payment.notes.createdBy,
                    amount: totalAmount,
                    orderCreationId: payment.order_id,
                    razorpayPaymentId: payment.id,
                    created_at: payment.notes.createdAt,
                    updated_at: new Date(),
                },
            });
            console.log("Payment added to the database");
        } else {
            console.log("Payment already exists in the database");
        }

        // Check if form exists in the database
        const existingForm = await prisma.form.findFirst({
            where: { createdById: payment.notes.createdBy },
        });

        if (!existingForm) {
            // Add form details to the database
            let totalAmount = Math.round(
                parseFloat(payment.notes.amount) + parseFloat(payment.notes.amount) * 0.02
            );
            await prisma.form.create({
                data: {
                    name: payment.notes.name,
                    email: payment.notes.email,
                    contact: payment.notes.contact,
                    designation: payment.notes.memberType,
                    foodPreference: payment.notes.foodPreference,
                    photo: payment.notes.photo,
                    collegeIdCard: payment.notes.idCard,
                    createdById: payment.notes.createdBy,
                    entityName: payment.notes.entityName,
                    paidAmount: totalAmount,
                    created_at: payment.notes.createdAt,
                },
            });
            console.log("Form added to the database");
        } else {
            console.log("Form already exists in the database");
        }

        // Send the email
        const user = await prisma.user.findUnique({
            where: { email: payment.notes.email },
        });

        if (user) {
            await sendRegistrationEmail({
                email: payment.notes.email,
                name: user.name || "User",
                registrationLink: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/verify/${payment.id}`,
            });
            console.log("Registration email sent");
        } else {
            console.log("User not found for sending email");
        }

        return NextResponse.json({ message: "Payment verified successfully", isOk: true }, { status: 200 });
    } catch (error) {
        console.error("Error handling payment:", error);
        return NextResponse.json({ message: "Internal Server Error", isOk: false }, { status: 500 });
    }
}
