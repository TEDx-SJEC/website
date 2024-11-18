"use server";

import prisma from "@/server/db";
import { basePrice, initialdiscount } from "@/constants";

export const getPrice = async (
  couponCode?: string,
): Promise<{
  success: boolean;
  message?: string;
  basePrice?: number;
  discountAmount?: number;
  finalPrice?: number;
}> => {
  let discountAmount = initialdiscount;
  let finalPrice = basePrice;
  if (couponCode) {
    const coupon = await prisma.referral.findUnique({
      where: { code: couponCode },
    });
    if (!coupon) {
      return { success: false, message: "Coupon code not found" };
    }

    if (coupon.isUsed) {
      return { success: false, message: "Coupon code is already used" };
    }
    const discountPercentage = parseFloat(coupon.discountPercentage ?? "0");

    if (isNaN(discountPercentage)) {
      return { success: false, message: "Invalid discount percentage format" };
    }
    discountAmount = basePrice * (discountPercentage / 100);
    finalPrice = Math.floor(basePrice - discountAmount);
  }
  return {
    success: true,
    basePrice,
    discountAmount,
    finalPrice,
  };
};
