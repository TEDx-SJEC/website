"use client";

import { getPrice } from "@/app/actions/get-price";
import { invalidateCouponCode } from "@/app/actions/invalidate-coupon";
import { submitForm } from "@/app/actions/submit-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  basePrice,
  initialdiscount,
  sjecFacultyPrice,
  sjecStudentPrice,
} from "@/constants";
import { getSjecMemberType } from "@/lib/helper";
import { FormDataInterface } from "@/types";
import getErrorMessage from "@/utils/getErrorMessage";
import { useUploadThing } from "@/utils/uploadthing";
import {
  baseSchema,
  studentFormSchema,
  studentSchema,
} from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { PaymentLoading } from "../payment/payment-loading";
import { PaymentSuccessfulComponent } from "../payment/payment-successful";
import { FileUpload } from "../ui/file-upload";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import InfoButton from "../ui/info-button";
import { redirect } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type FormSchema = z.infer<typeof studentSchema | typeof baseSchema>;

type UploadedFile = {
  id: string;
  files: File[];
};

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [memberType, setMemberType] = useState<
    "student" | "faculty" | "external"
  >("external");
  const [pricing, setPricing] = useState({
    basePrice: basePrice,
    discountAmount: initialdiscount,
    finalPrice: basePrice,
  });

  const { data: session } = useSession();

  if (!session) {
    redirect("/auth/signin/?callbackUrl=/register");
  }

  useEffect(() => {
    setMemberType(getSjecMemberType(session?.user.email!));
    setPricing((prevPricing) => ({
      ...prevPricing,
      finalPrice:
        memberType === "student"
          ? sjecStudentPrice
          : memberType === "faculty"
          ? sjecFacultyPrice
          : basePrice,
    }));
    console.log("Member Type: ", memberType); 
  }, [session?.user.email, memberType]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      designation: getSjecMemberType(session?.user.email!),
      name: session?.user.name!,
      email: session?.user.email!,
      phone: "",
      entityName: "",
      couponCode: "",
      foodPreference: "veg",
    },
  });

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res.length == 2) {
        form.setValue("idCard", res[0].url);
        form.setValue("photo", res[1].url);
      }
      if (res && res.length == 1) {
        form.setValue("photo", res[0].url);
      }
      console.log("Images uploaded successfully!");
    },
    onUploadError: () => {
      toast.error("error occurred while uploading");
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleFileUpload = (id: "idCard" | "photo", files: File[]) => {
    setUploadedFiles((prevFiles) => {
      const existing = prevFiles.find((file) => file.id === id);
      if (existing) {
        return prevFiles.map((file) =>
          file.id === id ? { ...file, files } : file
        );
      } else {
        return [...prevFiles, { id, files }];
      }
    });

    form.setValue(id, files.map((file) => file.name).join(", "));
  };

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
            try {
              if (uploadedFiles.length > 0) {
                const allFiles = uploadedFiles.flatMap((file) => file.files);
                if (allFiles.length > 0) {
                  await startUpload(allFiles);
                }
              }
              if (couponCode) {
                const result = await invalidateCouponCode(couponCode, session!);
                if (!result.success) {
                  toast.error(result.message || "An error occurred while invalidating the coupon");
                }
              }
              const formResponse = form.getValues();
              await submitForm(
                formResponse as FormDataInterface,
                pricing.finalPrice
              );
              setIsProcessing(false);
              setSuccess(true);
            } catch (error) {
              setIsProcessing(false);
              toast.error(`Payment failed: ${getErrorMessage(data.error)}`);
            }
          } else {
            setIsProcessing(false);
            toast.error(`Payment failed: ${getErrorMessage(data.error)}`);
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
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
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
      const result = await getPrice(couponCode);
      if (!result.success) {
        toast.error(result.message || "An error occurred while applying the coupon");
        return;
      }
      const { basePrice, discountAmount, finalPrice } = result;
      setPricing({
        basePrice: basePrice ?? pricing.basePrice,
        discountAmount: discountAmount ?? pricing.discountAmount,
        finalPrice: finalPrice ?? pricing.finalPrice,
      });
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
        form.clearErrors();
        const validationResult = await studentFormSchema.safeParseAsync(
          form.getValues()
        );
        isValid = validationResult.success;
        if (!isValid) {
          if (validationResult.error) {
            validationResult.error.issues.forEach((issue) => {
              form.setError(issue.path[0] as keyof FormSchema, {
                type: "manual",
                message: issue.message,
              });
            });
          }
        }
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
    <Card className="w-full lg:w-[550px] bg-[#1a0a0a] mt-24 md:mt-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <CardHeader>
        <CardTitle className="text-[#e62b1e] text-center text-3xl">
          Registration Form
        </CardTitle>
        <CardDescription>Step {step} of 3</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          value={session?.user.name!}
                          disabled
                        />
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
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            {...field}
                            disabled
                            value={session?.user.email!}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          onClick={async () => {
                            await signOut();
                            await signIn();
                            form.setValue("email", session?.user.email!);
                          }}
                          variant="outline"
                        >
                          Change
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center">
                          Designation
                          <InfoButton />
                        </span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your designation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            value="student"
                            disabled={memberType === "external"}
                          >
                            SJEC - Student
                          </SelectItem>
                          <SelectItem
                            value="faculty"
                            disabled={memberType === "external"}
                          >
                            SJEC - Faculty
                          </SelectItem>
                          <SelectItem value="external">
                            External Participant
                          </SelectItem>
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
                {memberType === "external" && (
                  <FormField
                    control={form.control}
                    name="entityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College/Organization</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="St Joseph Engineering College"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                            <FileUpload
                              onChange={(files) =>
                                handleFileUpload("idCard", files)
                              }
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
                        <FileUpload
                          onChange={(files) => handleFileUpload("photo", files)}
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
                            <Input
                              placeholder="Enter coupon code"
                              {...field}
                              disabled={memberType !== "external"}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={verifyCoupon}
                            disabled={memberType !== "external"}
                          >
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
