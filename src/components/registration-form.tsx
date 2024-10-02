"use client";
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
import { useState, useMemo } from "react";
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

export default function RegistrationForm() {
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

  const handleRegister = async (values: TRegistrationForm) => {
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
  };

  const designationOptions = useMemo(
    () => [
      { value: "Student", label: "Student" },
      { value: "Employee", label: "Employee" },
      { value: "Faculty", label: "Faculty" },
    ],
    [],
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
                    disabled={designation !== "student"}
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
                    disabled={designation !== "student"}
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
            <Button className="text-lg p-4" disabled={uploading}>
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
