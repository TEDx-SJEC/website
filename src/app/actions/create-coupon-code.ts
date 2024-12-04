"use server";
import prisma from "@/server/db";

export const saveCoupon = async (
  coupon: string,
  id: string,
  discount: string = "20",
) => {
  const resp = await prisma.referral.create({
    data: {
      code: coupon,
      isUsed: false,
      createdById: id,
      discountPercentage: discount,
    },
  });
};
