"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@uploadthing/react/styles.css";
import { useState, useMemo } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TRegistrationForm } from "@/utils/zod-schemas";

import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Button } from "@react-email/components";

interface RegistrationFormProps {
  form: {
    control: Control<TRegistrationForm>;
    handleSubmit: UseFormHandleSubmit<TRegistrationForm>;
  };
  nextStep: () => void;
  handleRegister: (data: TRegistrationForm) => void;
  setFiles: React.Dispatch<
    React.SetStateAction<{ collegeId: File | null; photo: File | null }>
  >;
}

export default function RegistrationForm({
  form,
  nextStep,
  handleRegister,
  setFiles,
}: RegistrationFormProps) {
  const [designation, setDesignation] = useState<string | undefined>(undefined);

  const designationOptions = useMemo(
    () => [
      { value: "Student", label: "Student" },
      { value: "Employee", label: "Employee" },
      { value: "Faculty", label: "Faculty" },
    ],
    []
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="w-full p-16 text-lg"
      >
        <div className="mx-auto max-w-md space-y-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Registration Form</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-4 h-12 text-lg rounded-lg"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-base">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-4 h-12 text-lg rounded-lg"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-base">
                  For an additional discount, please use your SJEC email ID.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 my-8">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="contact" className="text-xl">
                  Contact
                </FormLabel>
                <FormControl>
                  <Input
                    id="contact"
                    type="tel"
                    className="w-full p-4 h-12 text-lg rounded-lg"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="designation" className="text-xl">
                  Designation
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    setDesignation(value);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-full p-4 h-12 text-lg rounded-lg">
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {designationOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="w-full p-4 h-12 text-lg rounded-lg"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 my-8">
          <FormField
            control={form.control}
            name="usn"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="usn" className="text-xl">
                  USN (University Seat Number)
                </FormLabel>
                <FormControl>
                  <Input
                    id="usn"
                    className="w-full p-4 h-12 text-lg rounded-lg"
                    placeholder="Enter your USN"
                    {...field}
                    disabled={designation !== "Student"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="organization" className="text-xl">
                  Organization/College
                </FormLabel>
                <FormControl>
                  <Input
                    id="organization"
                    className="w-full p-4 h-12 text-lg rounded-lg"
                    placeholder="Enter your organization or college"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="collegeIdCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="college-id" className="text-xl">
                  College ID Card
                </FormLabel>
                <FormControl>
                  <Input
                    id="college-id"
                    type="file"
                    className="w-full p-2 h-12 text-lg rounded-lg"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFiles((prev) => ({ ...prev, collegeId: file }));
                    }}
                    disabled={designation !== "Student"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="photo" className="text-xl">
                  Photo
                </FormLabel>
                <FormControl>
                  <Input
                    id="photo"
                    type="file"
                    className="w-full p-2 h-12 text-lg rounded-lg"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFiles((prev) => ({ ...prev, photo: file }));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Button className="text-lg p-4">
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
