"use server";
import { generateCouponCode } from "@/lib/helper";
import prisma from "@/server/db";
import { couponSchema } from "@/utils/zod-schemas";

export const saveCoupon = async (
    coupon: string,
    createdById: string,
    discount: number = 20,
    numberOfCoupons: number = 1
) => {
    try {
        const validatCoupon = couponSchema.parse({ coupon, createdById, discount });

        // Check if the coupon already exists
        const couponExists = await prisma.referral.findFirst({
            where: { code: validatCoupon.coupon },
        });
        if (couponExists) {
            throw new Error("Coupon code already exists");
        }

        // Create coupons
        const createCoupon = async (code: string) => {
            return prisma.referral.create({
                data: {
                    code,
                    isUsed: false,
                    createdById: validatCoupon.createdById,
                    discountPercentage: validatCoupon.discount.toString(),
                },
            });
        };

        const couponCodes =
            numberOfCoupons === 1
                ? [validatCoupon.coupon]
                : Array.from({ length: numberOfCoupons }, () => generateCouponCode(10));

        const responses = await Promise.all(couponCodes.map(createCoupon));
        return responses;
    } catch (error) {
        console.error("Error creating coupon:", error);
        throw new Error("Failed to create coupon. Please try again later.");
    }
};
