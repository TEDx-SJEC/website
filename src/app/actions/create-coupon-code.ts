"use server";
import prisma from "@/server/db";
import { couponSchema } from "@/utils/zod-schemas";

export const saveCoupon = async (
  coupon: string,
  createdById: string,
  discount: number = 20
) => {
  try {
    const validatCoupon = couponSchema.parse({ coupon, createdById, discount });
    const couponExists = await prisma.referral.findFirst({
      where: {
        code: validatCoupon.coupon,
      },
    });
    if (couponExists) {
      throw new Error("Coupon code already exists");
    }
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
