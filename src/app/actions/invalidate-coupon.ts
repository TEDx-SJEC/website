"use server"

import prisma from "@/server/db"

export async function invalidateCouponCode(couponCode:string){
    const resp = await prisma.referral.update({
        where:{
            code:couponCode
        },
        data:{
            isUsed:true
        }
    })
}