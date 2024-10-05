"use server";

import prisma from "@/server/db";
import { type Session as NextAuthSession } from "next-auth";
export async function invalidateCouponCode(couponCode: string, session: NextAuthSession) {
    if (!couponCode) return;
    const resp = await prisma.referral.update({
        where: {
            code: couponCode,
        },
        data: {
            isUsed: true,
            usedById: session.user.id,
        },
    });
}
