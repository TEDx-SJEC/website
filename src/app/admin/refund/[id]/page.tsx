"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

function FetchRazorpayPaymentDataForRefund({ params }: { params: { id: string } }) {
    const { id } = params;
    const [paymentData, setPaymentData] = useState<Root | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingForButton, setLoadingForButton] = useState(false);
    const [refundAmount, setRefundAmount] = useState<number | null>(null);

    const handleRefund = async () => {
        if (!paymentData || !refundAmount) {
            return;
        }
        setLoadingForButton(true);
        const paymentDetails = await fetch(`/api/refund/${paymentData.id}?amount=${refundAmount}`, {
            method: "GET",
        });
        if (paymentDetails.status === 200) {
            toast.success("Payment refunded successfully", {
                description: "Your payment has been refunded successfully",
            });
        } else {
            toast.error("Error", {
                description: "An error occurred while refunding the payment",
            });
        }
        if (!paymentDetails.ok) {
            throw new Error("Failed to refund payment");
        }

        const data = await paymentDetails.json();
        console.log(data);

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/verify-order/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch payment data");
                }
                const data = await res.json();
                setPaymentData(data);
            } catch (error) {
                toast.error("Error fetching payment data");
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
        <div className="flex w-full min-h-screen justify-center items-center bg-background p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Payment Data of {paymentData.notes.customerName || "Unknown"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="payment-id">Payment ID</Label>
                        <Input id="payment-id" value={paymentData.id || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Input id="status" value={paymentData.status || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="method">Method</Label>
                        <Input id="method" value={paymentData.method || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount-refunded">Amount Refunded</Label>
                        <Input
                            id="amount-refunded"
                            value={new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                            }).format((paymentData.amount_refunded ?? 0) / 100)}
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="refund-status">Refund Status</Label>
                        <Input id="refund-status" value={paymentData.refund_status || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="captured">Captured</Label>
                        <Input id="captured" value={paymentData.captured ? "Yes" : "No"} readOnly />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            value={new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                            }).format((paymentData.amount ?? 0) / 100)}
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={paymentData.email || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={paymentData.contact || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="created-at">Created At</Label>
                        <Input
                            id="created-at"
                            value={new Date(paymentData.created_at * 1000).toLocaleString(undefined, {
                                dateStyle: "full",
                                timeStyle: "long",
                            })}
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            placeholder="Enter refund amount"
                            id="refund-amount"
                            type="number"
                            onChange={(e) => setRefundAmount(parseInt(e.target.value))}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button disabled={loadingForButton} onClick={handleRefund}>
                        {loadingForButton ? "Loading..." : "Refund"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default FetchRazorpayPaymentDataForRefund;
