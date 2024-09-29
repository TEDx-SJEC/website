"use server";

import prisma from "@/server/db";
import { basePrice, initialdiscount } from "@/constants";

class CouponError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CouponError";
  }
}

export const getPrice = async (
  couponCode?: string,
): Promise<{
  basePrice: number;
  discountAmount: number;
  finalPrice: number;
}> => {
  let discountAmount = initialdiscount;
  let finalPrice = basePrice;
  if (couponCode) {
    const coupon = await prisma.referral.findUnique({
      where: { code: couponCode },
    });
    if (!coupon) {
      throw new CouponError("Coupon code not found");
    }

    if (coupon.isUsed) {
      throw new CouponError("Coupon code is already used");
    }
    const discountPercentage = parseFloat(coupon.discountPercentage ?? "0");

    if (isNaN(discountPercentage)) {
      throw new CouponError("Invalid discount percentage format");
    }
    discountAmount = basePrice * (discountPercentage / 100);
    finalPrice = Math.floor(basePrice - discountAmount);
  }
  return { basePrice, discountAmount, finalPrice };
};
