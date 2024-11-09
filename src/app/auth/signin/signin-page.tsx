"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

import { useState, useEffect } from "react";

import { tailChase } from "ldrs";

export default function SignIn() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (typeof window !== "undefined") {
      tailChase.register();
    }
    if (status === "unauthenticated") {
      setLoading(true);
      signIn("google").catch((error) => {
        console.error("Sign in failed:", error);
        setLoading(false);
      });
    } else if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading ? (
        <div className="flex flex-col items-center">
          <l-tail-chase
            size={"88"}
            speed={"1.75"}
            color={"#FF0000"}
          ></l-tail-chase>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
