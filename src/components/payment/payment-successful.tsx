"use client";

import { useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function PaymentSuccessfulComponent() {
  const confettiRef = useRef(null);

  const fireConfetti = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      colors: ["#ff00ff", "#00ff00", "#0000ff", "#ffff00", "#00ffff"],
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left side confetti
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0, 0.3), y: Math.random() - 0.2 },
        }),
      );

      // Right side confetti
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 1), y: Math.random() - 0.2 },
        }),
      );
    }, 250);
  }, []);

  useEffect(() => {
    fireConfetti();
  }, [fireConfetti]);

  return (
    <div className="min-h-screen px-2 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
       <Card className="w-full max-w-md text-center bg-[#1a0a0a] border-[#140808]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            </motion.div>
            <p className="text-gray-300">
              Thank you for your payment. Your transaction was successful.
              Please check your email for further details regarding TEDxSJEC.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={"/"}>
            <Button className="bg-[#EB0028] hover:bg-[#C60022] text-white">
                Go to home page
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
      <canvas ref={confettiRef} className="fixed inset-0 pointer-events-none" />
    </div>
  );
}
