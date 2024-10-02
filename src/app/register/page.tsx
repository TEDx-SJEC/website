/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Payment } from "@/components/payment";
import RegistrationForm from "@/components/registration-form";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUploadThing } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegistrationFormSchema, TRegistrationForm } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function page() {
  const [step, setStep] = useState(1);

  const form = useForm<TRegistrationForm>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      name: "",
      usn: "",
      email: "",
      contact: "",
      designation: "",
      photo: "",
      collegeIdCard: "",
      entityName: "",
      referralUsed: "",
    },
  });
  const [files, setFiles] = useState<{
    photo: File | null;
    collegeId: File | null;
  }>({ photo: null, collegeId: null });
  const [uploading, setUploading] = useState(false);
  const [designation, setDesignation] = useState<string | undefined>(undefined);

  //uploadthing code -- custom one
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Client upload complete, response:", res[0].url);
    },
    onUploadError: () => {
      toast.error("Upload failed");
    },
    onUploadBegin: (file: string) => {
      console.log("upload has begun for", file);
    },
  });

  const handleRegister: (values: TRegistrationForm) => Promise<void> = async (
    values: TRegistrationForm
  ) => {
    setUploading(true);
    const { photo, collegeId } = files;

    if (collegeId) {
      await startUpload([collegeId]);
      toast.success("College ID uploaded");
    }
    if (photo) {
      await startUpload([photo]);
      toast.success("Photo uploaded");
    }
    toast.success("Registered successfully");
    setUploading(false);
    nextStep();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  return (
        <div>
          {step === 1 && (
            <RegistrationForm
              handleRegister={handleRegister}
              form={form}
              nextStep={nextStep}
              setFiles={setFiles}
            />
          )}
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
