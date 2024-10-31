"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getPrice } from "@/app/actions/get-price";
import { toast } from "sonner";
import getErrorMessage from "@/utils/getErrorMessage";
import { basePrice, initialdiscount } from "@/constants";
import { invalidateCouponCode } from "@/app/actions/invalidate-coupon";
import { useSession } from "next-auth/react";
import Script from "next/script";
import { UploadDropzone } from "@/utils/uploadthing";
import { submitForm } from "@/app/actions/submit-form";
import { PaymentLoading } from "../payment/payment-loading";
import { PaymentSuccessfulComponent } from "../payment/payment-successful";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const baseSchema = z.object({
    designation: z.enum(["student", "faculty", "employee"]),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
    photo: z.string(),
    couponCode: z.string().optional(),
    foodPreference: z.enum(["veg", "non-veg"]),
});

const studentSchema = baseSchema.extend({
    usn: z.string().min(1, { message: "USN is required for students." }),
    idCard: z.string(),
});

type FormSchema = z.infer<typeof studentSchema | typeof baseSchema>;

export default function RegistrationForm() {
    const [step, setStep] = useState(1);
    const [pricing, setPricing] = useState({
        basePrice: basePrice,
        discountAmount: initialdiscount,
        finalPrice: basePrice,
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const { data: session } = useSession();

    const form = useForm<FormSchema>({
        resolver: zodResolver(baseSchema),
        defaultValues: {
            designation: "student",
            name: "",
            email: "",
            phone: "",
            couponCode: "",
            foodPreference: "veg",
        },
    });

    const handlePayment = async () => {
        setIsProcessing(true);
        const couponCode = form.getValues("couponCode");
        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: pricing.finalPrice }),
            });
            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: pricing.finalPrice * 100,
                currency: "INR",
                name: "Test Name",
                description: "Test Transaction",
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
                        await invalidateCouponCode(couponCode ?? "", session!);
                        const formResponse = form.getValues();
                        await submitForm(formResponse, pricing.finalPrice);
                        setIsProcessing(false);
                        setSuccess(true);
                    } else {
                        setIsProcessing(false);
                        toast.error("Payment failed");
                    }
                },
                notes: {
                    customerName: form.getValues("name"),
                    customerEmail: session?.user?.email,
                    customerContact: form.getValues("phone"),
                },
                prefill: {
                    name: form.getValues("name"),
                    email: session?.user?.email,
                    contact: form.getValues("phone"),
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            toast.error(`Payment error: ${getErrorMessage(error)}`);
            setIsProcessing(false);
        }
    };

    const onSubmit = async (values: FormSchema) => {
        await handlePayment();
    };

    const verifyCoupon = async () => {
        const couponCode = form.getValues("couponCode");
        try {
            const { basePrice, discountAmount, finalPrice } = await getPrice(couponCode);
            setPricing({ basePrice, discountAmount, finalPrice });
            toast.success("Coupon applied successfully");
        } catch (e) {
            console.error(e);
            toast.error(getErrorMessage(e));
        }
    };

    const handleNext = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await form.trigger(["designation", "foodPreference"]);
        } else if (step === 2) {
            const designation = form.getValues("designation");
            if (designation === "student") {
                isValid = await form.trigger(["name", "email", "phone", "usn", "idCard", "photo"]);
            } else {
                isValid = await form.trigger(["name", "email", "phone", "photo"]);
            }
        }

        if (isValid) {
            setStep(step + 1);
        }
    };

    if (isProcessing) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <PaymentLoading />
            </div>
        );
    }

    if (success) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <PaymentSuccessfulComponent />
            </div>
        );
    }

    return (
        <Card className="w-[550px]">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>Step {step} of 3</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {step === 1 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="designation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Designation</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your designation" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="student">Student</SelectItem>
                                                    <SelectItem value="faculty">Faculty</SelectItem>
                                                    <SelectItem value="employee">Employee</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="foodPreference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Food Preference</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="veg" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Vegetarian
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="non-veg" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Non-Vegetarian
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1234567890" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch("designation") === "student" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="usn"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>USN</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your USN" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="idCard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ID Card</FormLabel>
                                                    <FormControl>
                                                        <UploadDropzone
                                                            endpoint="imageUploader"
                                                            onClientUploadComplete={(res) => {
                                                                if (res && res.length > 0) {
                                                                    form.setValue("idCard", res[0].url);
                                                                    toast.success(
                                                                        "ID Card uploaded successfully"
                                                                    );
                                                                }
                                                            }}
                                                            onUploadError={(error: Error) => {
                                                                toast.error(
                                                                    `ID Card upload failed: ${error.message}`
                                                                );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Upload your ID card image
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                                <FormField
                                    control={form.control}
                                    name="photo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Photo</FormLabel>
                                            <FormControl>
                                                <UploadDropzone
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        if (res && res.length > 0) {
                                                            form.setValue("photo", res[0].url);
                                                            toast.success("Photo uploaded successfully");
                                                        }
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error(`Photo upload failed: ${error.message}`);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>Upload your photo</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Total Amount</Label>
                                        <p className="text-2xl font-bold">₹{pricing.finalPrice}</p>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="couponCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Coupon Code</FormLabel>
                                                <div className="flex space-x-2">
                                                    <FormControl>
                                                        <Input placeholder="Enter coupon code" {...field} />
                                                    </FormControl>
                                                    <Button type="button" onClick={verifyCoupon}>
                                                        Verify
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
                {step > 1 && (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                        Previous
                    </Button>
                )}
                {step < 3 ? (
                    <Button onClick={handleNext}>Next</Button>
                ) : (
                    <Button onClick={form.handleSubmit(onSubmit)}>
                        {isProcessing ? "Processing..." : "Pay Now"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
