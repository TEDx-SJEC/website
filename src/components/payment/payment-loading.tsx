'use client'

import { Loader2 } from "lucide-react"

export function PaymentLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4 bg-background rounded-lg shadow-md">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h2 className="text-2xl font-semibold text-foreground mb-2">Processing Payment</h2>
      <p className="text-muted-foreground text-center">
        Please wait while we process your payment. This may take a few moments.
      </p>
      <div className="mt-6 flex items-center space-x-2">
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  )
}