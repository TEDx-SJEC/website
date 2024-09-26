import prisma from "@/server/db";

async function determinePrice(email: string, referralId: any) {
  const sjecDiscountPrice = parseFloat(
    process.env.SJEC_DISCOUNT_PRICE ?? "800",
  );
  const referralDiscountPrice = parseFloat(
    process.env.REFERAL_DISCOUNT_PRICE ?? "900",
  );
  const regularPrice = 1000; // Default regular price

  let price;

  if (email.endsWith("@sjec.ac.in")) {
    price = sjecDiscountPrice;
  } else if (referralId) {
    try {
      const referral = await prisma.referral.findUnique({
        where: { id: referralId },
      });

      if (referral) {
        if (!referral.isUsed) {
          price = referralDiscountPrice;
        } else {
          throw new Error("Referral code already used");
        }
      } else {
        throw new Error("Invalid referral code");
      }
    } catch (error: any) {
      console.error("Error determining price:", error.message);
      price = regularPrice;
    }
  } else {
    price = regularPrice;
  }

  return price;
}

export default determinePrice;
