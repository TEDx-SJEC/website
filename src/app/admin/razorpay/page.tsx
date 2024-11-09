"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  razorpayPaymentId: z.string().nonempty("Payment ID is required"),
});

const FetchRazorpayPaymentData = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    router.push(`/admin/razorpay/${data.razorpayPaymentId}`);
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col bg-gray-100 dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10">
        Search by Razorpay Payment ID
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="razorpayPaymentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Razorpay Payment ID:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="pay_O69OS3rml4xT8K"
                    {...field}
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                  Search for a payment by its Razorpay Payment ID
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};

export default FetchRazorpayPaymentData;
