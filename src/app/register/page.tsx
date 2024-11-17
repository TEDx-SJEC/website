"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import RegistrationForm from "@/components/common/registration-form";
import FABEmail from "@/components/common/fab-email";
import { tailChase } from "ldrs";
import { redirect } from "next/navigation";

export default function RegistrationPage() {
const {status} = useSession({
    required: true,
    onUnauthenticated: async () => {
        await signIn("google");
    },
  });


  
  if (typeof window !== "undefined") {
    tailChase.register();
  }

  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading || status !== "authenticated") {
    // Show the loading spinner if session is loading or not authenticated
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <l-tail-chase
          size={"88"}
          speed={"1.75"}
          color={"#FF0000"}
        ></l-tail-chase>
      </div>
    );
  }





  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <RegistrationForm />
      <FABEmail/>
    </div>
  );
}
