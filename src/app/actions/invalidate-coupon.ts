"use server";

import prisma from "@/server/db";

export async function invalidateCouponCode(couponCode: string) {
    if (!couponCode) return;
    const resp = await prisma.referral.update({
        where: {
            code: couponCode,
        },
        data: {
            isUsed: true,
        },
    });
}
