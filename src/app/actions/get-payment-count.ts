"use server";

import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";

export default async function getPaymentCount() {
    const session = await getServerSideSession();
    if (!session) {
        return null;
    }

    const paymentCount = await prisma.payment.count();

    return paymentCount;
}
