"use server";

import prisma from "@/server/db";
import { type Session as NextAuthSession } from "next-auth";
export async function invalidateCouponCode(couponCode: string, session: NextAuthSession) {
    console.log("coupon code = "+couponCode , "session = " + session.user.id)
    if (!couponCode) return;
    return await prisma.referral.update({
        where:{
            code:couponCode,
        },
        data:{
            isUsed:true,
            usedById:session.user.id
        }

    })


}
