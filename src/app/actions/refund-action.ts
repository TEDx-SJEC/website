"use server";

import { z } from "zod";
import { getServerSideSession } from "@/lib/get-server-session";

    // Define the shape of our refund data
    const refundSchema = z.object({
        name: z.string(),
        paymentId: z.string(),
        status: z.string(),
        method: z.string(),
        amountRefunded: z.number(),
        email: z.string().email(),
        contactNumber: z.string(),
        fee: z.number(),
        tax: z.number(),
    });

    type RefundData = z.infer<typeof refundSchema>;

    export async function processRefund(
        formData: FormData
    ): Promise<{ success: boolean; data?: RefundData; error?: string } | null> {
        
    const session = await getServerSideSession();
    if (!session) {
        return null;
    }
    const paymentId = formData.get("paymentId");

        if (!paymentId) {
            return {
                success: false,
                error: "Payment ID is required",
            };
        }
        
    }
    

