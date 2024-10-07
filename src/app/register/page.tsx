"use client";
import RegistrationForm from "@/components/common/registration-form";
import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function Page() {
  useSession({
    required: true,
    onUnauthenticated: async () => {
      await signIn("google");
    },
  });
  return (
    <div className="flex h-screen justify-center items-center mt-8">
      <RegistrationForm />
      {/* <Payment /> */}
    </div>
  );
}


