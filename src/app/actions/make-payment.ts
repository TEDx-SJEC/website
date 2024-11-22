import getErrorMessage from "@/utils/getErrorMessage";
import { getServerSession } from "next-auth";
import { toast } from "sonner";

export async function makePayment({
  phone,
  amount,
  coupanCode,
  pricing,
}: {
  phone: string;
  amount: number;
  coupanCode: string;
  pricing: any;
}) {
  try {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: pricing.finalPrice }),
    });
    const data = await response.json();
    const session = await getServerSession();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: pricing.finalPrice * 100,
      currency: "INR",
      name: "TEDxSJEC",
      description: "Registration Fee",
      order_id: data.orderId,
      handler: async (response: any) => {
        const resp = await fetch("/api/verify-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            amount: pricing.finalPrice,
          }),
        });
        const data = await resp.json();
        if (data.isOk) {
          toast.success("✅ Payment successful", {
            description: "Your payment was successful",
          });
          window.location.href = "/";
        } else {
          toast.error("❌ Payment failed", {
            description:
              "Please try again. Contact support for help. " + data.error,
          });
        }
      },
      notes: {
        customerName: session?.user?.name,
        customerEmail: session?.user?.email,
        customerContact: phone,
      },
      prefill: {
        name: session?.user?.name,
        email: session?.user?.email,
        contact: phone,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: () => {
          //   setIsProcessing(false);
        },
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response: any) {
      toast.error("Payment failed", {
        description:
          "Please try again. Contact support for help. " +
          response.error.description,
      });
    });
    paymentObject.open();
  } catch (error) {
    return getErrorMessage(error);
  }
}
