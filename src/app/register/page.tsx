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

{
  /* <div className="mx-auto max-w-md space-y-8 py-12">
<div className="text-center">
  <h1 className="text-4xl font-bold">TEDx 2024</h1>
  <p className="text-muted-foreground">Registration Form</p>
</div>
</div> */
}
