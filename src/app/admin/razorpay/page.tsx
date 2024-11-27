"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  razorpayPaymentId: z.string().nonempty("Payment ID is required"),
})

const FetchRazorpayPaymentData = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    router.push(`/admin/razorpay/${data.razorpayPaymentId}`)
  }

  return (
    <div className="flex lg:w-full min-h-screen justify-center items-center bg-background p-4 pt-0 mt-0">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg lg:text-2xl font-semibold text-primary">
            Search by Razorpay Payment ID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="razorpayPaymentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razorpay Payment ID</FormLabel>
                    <FormControl>
                      <Input placeholder="pay_O69OS3rml4xT8K" {...field} />
                    </FormControl>
                    <FormDescription>
                      Search for a payment by its Razorpay Payment ID
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FetchRazorpayPaymentData

