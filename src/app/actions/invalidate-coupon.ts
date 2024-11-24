"use server";

import prisma from "@/server/db";
import { type Session as NextAuthSession } from "next-auth";

export async function invalidateCouponCode(
  couponCode: string,
  session: NextAuthSession,
): Promise<{
  success: boolean;
  message?: string;
  updatedCoupon?: {
    code: string;
    discountPercentage: string;
    isUsed: boolean;
    usedById: string;
  };
}> {
  

  if (!couponCode) {
    return { success: false, message: "Coupon code is required" };
  }

  try {
    const updatedCoupon = await prisma.referral.update({
      where: {
        code: couponCode,
      },
      data: {
        isUsed: true,
        usedById: session.user.id,
      },
    });

    return {
      success: true,
      updatedCoupon: {
        code: updatedCoupon.code,
        discountPercentage: updatedCoupon.discountPercentage,
        isUsed: updatedCoupon.isUsed,
        usedById: updatedCoupon.usedById || "",
      },
    };
  } catch (error) {
    if ((error as { code: string }).code === "P2025") {
      return { success: false, message: "Invalid or non-existent coupon code" };
    }

    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
