"use server";

import prisma from "@/server/db";

class CouponError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CouponError";
    }
}

export const getPrice = async (couponCode?: string): Promise<number> => {
    const basePrice = 1000;
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
        const discountAmount = basePrice * (discountPercentage / 100);
        const finalPrice = Math.floor(basePrice - discountAmount);

        return finalPrice;
    }
    return basePrice;
};
