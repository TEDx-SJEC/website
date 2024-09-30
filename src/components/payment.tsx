"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPrice } from "@/app/actions/get-price";
import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import getErrorMessage from "@/utils/getErrorMessage";
import { basePrice, initialdiscount } from "@/constants";

export function Payment() {
  const [coupon, setCoupon] = useState("");
  const [pricing, setPricing] = useState({
    basePrice: basePrice,
    discountAmount: initialdiscount,
    finalPrice: basePrice,
  });
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
  return (
    <Card className="w-full h-screen max-w-md p-6 rounded-lg shadow-lg">
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
          <Button className="w-full p-4 h-12 text-lg rounded-lg">
            Confirm and update
          </Button>
        </div>

        {/* <div className="p-4 mt-4 bg-yellow-100 rounded-lg text-yellow-800">
          Your trial will end immediately and your card will be charged
        </div> */}
      </div>
    </Card>
  );
}