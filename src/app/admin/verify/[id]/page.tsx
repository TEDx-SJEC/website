/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import React from "react"
async function getPaymentData(id: string) {
  // Simulate API call
  const response = await fetch(`http://localhost:3000/api/verify-order/${id}`)
  const data = await response.json()
  if (response.status === 200) {
    return data
  }
  return null
}

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const paymentData = await getPaymentData(params.id)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {paymentData ? "Payment Found" : "Payment Not Found"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Payment details for ID: <span className="font-semibold">{params.id}</span>
            </p>
            {paymentData ? (
              <>
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-start"
                  role="alert"
                >
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Payment Successful</p>
                    <p>Your payment has been processed successfully.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Amount Paid:</p>
                  <p className="text-2xl font-bold">₹{(paymentData.amount / 100).toFixed(2)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Paid By:</p>
                  <p className="text-xl font-semibold">{paymentData.email}</p>
                </div>
              </>
            ) : (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-start"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-bold">Payment Not Found</p>
                  <p>We couldn't find any payment with the provided ID.</p>
                </div>
              </div>
            )}
            <div className="text-center mt-6">
              <Link href="/">
                <Button>
                  {paymentData ? "Back to Dashboard" : "Try Another Payment"}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}