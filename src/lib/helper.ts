import crypto from "crypto";
export const generateCouponCode = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};
export const createCouponCode = () => {
  return generateCouponCode(10);
};

export const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};


export const getSjecMemberType = (email: string): "student" | "faculty" | "external" => {
    if (email.endsWith("@sjec.ac.in")) {
        // Check if the email starts with a number
        return /^\d/.test(email) ? "student" : "faculty";
    }
    return "external";
};