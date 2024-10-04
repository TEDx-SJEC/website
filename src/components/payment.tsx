"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPrice } from "@/app/actions/get-price";
import { useState } from "react";
import { Input } from "./ui/input";
import getErrorMessage from "@/utils/getErrorMessage";
import { basePrice, initialdiscount } from "@/constants";
import Script from "next/script";
import { ConfettiSideCannons } from "./confetti-display";
import { toast } from "sonner";
import { invalidateCouponCode } from "@/app/actions/invalidate-coupon";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface ResponseInterface {
    orderId?: string;
    status: number;
    error?: string;
}

interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}
export function Payment() {
    const [coupon, setCoupon] = useState("");
    const [pricing, setPricing] = useState({
        basePrice: basePrice,
        discountAmount: initialdiscount,
        finalPrice: basePrice,
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: pricing.finalPrice }),
            });
            const data: Promise<ResponseInterface> = response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: pricing.finalPrice * 100,
                currency: "INR",
                name: "Test Name",
                description: "Test Transaction",
                order_id: (await data).orderId,
                handler: async (response: RazorpayResponse) => {
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
                    console.log(data);
                    if (data.isOk) {
                        toast.success("Payment sucessfull");
                        
                        setTrigger(!trigger);
                        setIsSuccess(true);
                    } else {
                        alert("Payment failed");
                    }
                },
                // change to dynamic
                notes: {
                    customerName: "John Doe",
                    customerEmail: "jhondoe@something.com",
                    customerContact: "9999999999",
                },
                prefill: {
                    name: "John Doe",
                    email: "jhondoe@something.com",
                    constact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            toast.error(`Some error ${error}`);
        } finally {
            setIsProcessing(false);
        }
    };
    const verifyCoupon = async () => {
        try {
            const { basePrice, discountAmount, finalPrice } = await getPrice(coupon);
            setPricing({ basePrice, discountAmount, finalPrice });
            toast.success("Coupon applied successfully");
        } catch (e) {
            console.error(e);
            const message = getErrorMessage(e);
            toast.error(`${message}`);
        }
    };
    if (isSuccess) {
        return (
            <div>
                <ConfettiSideCannons trigger={true} />
            </div>
        );
    }
    return (
        <Card className="w-full h-screen max-w-md p-6 rounded-lg shadow-lg">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="space-y-4">
                <header className="bg-primary text-primary-foreground py-4 px-6 rounded-t-lg flex justify-center">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                </header>
                <div className="flex justify-center py-8">
                    <h1 className="text-6xl">₹{pricing.finalPrice}</h1>
                </div>
                <div className="flex justify-between gap-2 items-center">
                    <Input
                        id="coupon"
                        className="w-full p-4 h-12 text-lg rounded-lg"
                        placeholder="Enter your coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button className="text-lg py-5" onClick={verifyCoupon}>
                        Verify
                    </Button>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{pricing.basePrice}</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount</span>
                    <span>₹{pricing.discountAmount}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>₹{pricing.finalPrice}</span>
                </div>
                <div className="flex justify-between font-bold my-16">
                    <Button className="w-full p-4 h-12 text-lg rounded-lg" onClick={handlePayment}>
                        {isProcessing ? "Processing..." : "Pay Now"}
                    </Button>
                </div>

                {/* <div className="p-4 mt-4 bg-yellow-100 rounded-lg text-yellow-800">
          Your trial will end immediately and your card will be charged
        </div> */}
            </div>
        </Card>
    );
}
