"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import RegistrationForm from "@/components/common/registration-form";
import FABEmail from "@/components/common/fab-email";
import { tailChase } from "ldrs";
import { redirect } from "next/navigation";

export default function RegistrationPage() {
  const { data: session } = useSession();
  const { status } = useSession({
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

  if (!session) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black text-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-red-500">Unauthorized</h1>
          <p className="text-gray-400">
            You need to log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "COORDINATOR") {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black text-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-red-500">Forbidden</h1>
          <p className="text-gray-400">
            You do not have the required permissions to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <RegistrationForm />
      <FABEmail />
    </div>
  );
}
