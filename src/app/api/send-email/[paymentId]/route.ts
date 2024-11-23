import { getServerSideSession } from "@/lib/get-server-session";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { sendRegistrationEmail } from "@/lib/send-registration-email";
import { generatedSignature } from "@/lib/helper";

export async function POST(
  request: NextRequest,
  context: { params: { paymentId: string } },
) {
  const session = await getServerSideSession();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized", isOk: false },
      { status: 401 },
    );
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Forbidden", isOk: false },
      { status: 403 },
    );
  }

  const { paymentId } = context.params;
  const payment = await razorpay.payments.fetch(paymentId);
  const signature = generatedSignature(payment.order_id, payment.id);

  const user = await prisma.user.findUnique({
    where: {
      email: payment.email,
    },
  });

  const prismaPayment = prisma.payment.findUnique({
    where: {
      razorpayPaymentId: payment.id,
    },
  });
  try {
    await sendRegistrationEmail({
        email: payment.email,
        name: user?.name!,
        registrationLink: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/verify/${payment.id}`,
    });
  } catch (error) {
    console.log(error);
  }

  if (!prismaPayment) {
    await prisma.$transaction(async (prisma) => {
      await prisma.payment.create({
        data: {
          amount: parseFloat(payment.amount.toString()),
          signature: signature,
          razorpayPaymentId: payment.id,
          orderCreationId: payment.order_id,
          user: {
            connect: {
              email: session?.user.email!,
            },
          },
        },
      });
    });
  }
  return NextResponse.json(
    { message: "Payment verified successfully", isOk: true },
    { status: 200 },
  );
}
