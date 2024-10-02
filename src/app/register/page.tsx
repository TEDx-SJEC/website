/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Payment } from "@/components/payment";
import RegistrationForm from "@/components/registration-form";
import React, { useState } from "react";

export default function page() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="flex">
      {step === 1 && <RegistrationForm />}
      {step === 2 && <Payment />}
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
