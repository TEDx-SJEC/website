"use client"

import { useState, useEffect } from "react"
import { Loader2, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function PaymentLoading() {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? '.' : prevDots + '.'))
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <Card className="w-full max-w-sm bg-black border-gray-800">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <CreditCard className="h-6 w-6 text-[#e62b1e]" />
            <CardTitle className="text-xl font-semibold text-center text-white">Processing Payment</CardTitle>
          </div>
          <CardDescription className="text-center text-gray-400">Please wait while we secure your transaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#e62b1e]" />
          </div>
          <p className="text-sm text-center font-medium text-[#e62b1e]">
            Verifying payment details{dots}
          </p>
          <div className="space-y-2">
            <p className="text-xs text-center text-gray-400">
              This usually takes less than a minute. Please don&apos;t refresh the page.
            </p>
            {/* <p className="text-xs text-center text-gray-400">
              We appreciate your patience as we ensure the security of your transaction.
            </p> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}