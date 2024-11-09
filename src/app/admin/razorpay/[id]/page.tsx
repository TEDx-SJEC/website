"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Root {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id: any;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: any;
  captured: boolean;
  description: string;
  card_id: any;
  bank: any;
  wallet: any;
  vpa: string;
  email: string;
  contact: string;
  notes: Notes;
  fee: number;
  tax: number;
  error_code: any;
  error_description: any;
  error_source: any;
  error_step: any;
  error_reason: any;
  acquirer_data: AcquirerData;
  created_at: number;
  upi: Upi;
}

export interface AcquirerData {
  rrn: string;
  upi_transaction_id: string;
}

export interface Upi {
  vpa: string;
}
export interface Notes {
  customerName: string;
  customerEmail: string;
  customerContact: string;
}

function FetchRazorpayPaymentData({ params }: { params: { id: string } }) {
  const { id } = params;
  const [paymentData, setPaymentData] = useState<Root | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingForButton, setLoadingForButton] = useState(false);

  async function sendEmail(paymentId: string) {
    setLoadingForButton(true);
    try {
      const response = await fetch(`/api/send-email/${paymentId}`, {
        method: "POST",
      });

      if (response.status === 200) {
        toast.success("Email sent successfully", {
          description: "An email has been sent to the customer",
        });
      } else {
        toast.error("Error", {
          description: "An error occurred while sending the email",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An error occurred while sending the email",
      });
    } finally {
      // Ensure the button is enabled again after the operation
      setLoadingForButton(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/verify-order/${id}`);
        const data = await res.json();
        setPaymentData(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-lg">No payment data found.</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Payment Data of {paymentData.notes.customerName || "Unknown"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Payment ID
            <Input value={paymentData.id || ""} disabled className="mt-1" />
          </Label>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount
            <Input
              value={new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format((paymentData.amount ?? 0) / 100)}
              disabled
              className="mt-1"
            />
          </Label>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
            <Input value={paymentData.email || ""} disabled className="mt-1" />
          </Label>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
            <Input
              value={paymentData.contact || ""}
              disabled
              className="mt-1"
            />
          </Label>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Created At
            <Input
              value={new Date(paymentData.created_at * 1000).toLocaleString(
                undefined,
                {
                  dateStyle: "full",
                  timeStyle: "long",
                },
              )}
              disabled
              className="mt-1"
            />
          </Label>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            disabled={loadingForButton}
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={async () => await sendEmail(paymentData.id!)}
          >
            {loadingForButton ? "Loading..." : "Send Email"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FetchRazorpayPaymentData;
