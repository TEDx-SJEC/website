"use server";
import prisma from "@/server/db";
import { couponSchema } from "@/utils/zod-schemas";

export const saveCoupon = async (
  coupon: string,
  createdById: string,
  discount: string = "20"
) => {
  try {
    const validatCoupon = couponSchema.parse({ coupon, createdById, discount });
    const resp = await prisma.referral.create({
      data: {
        code: validatCoupon.coupon,
        isUsed: false,
        createdById: validatCoupon.createdById,
        discountPercentage: validatCoupon.discount.toString(),
      },
    });
    return resp;
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw new Error("Failed to create coupon. Please try again later.");
  }
};
