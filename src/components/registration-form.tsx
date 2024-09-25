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
import { useState } from "react";
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

export default function RegistrationForm() {
  const form = useForm();

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedCollegeId, setSelectedCollegeId] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [designation, setDesignation] = useState<string | undefined>(undefined);

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
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

  const handleRegister = async () => {
    setUploading(true);
    if (selectedCollegeId) {
      await startUpload([selectedCollegeId]);
      toast.success("College ID uploaded");
    }
    if (selectedPhoto) {
      await startUpload([selectedPhoto]);
      toast.success("Photo uploaded");
    }
    toast.success("Registered successfully");
    setUploading(false);
  };

  return (
    <Form {...form}>
      <form className="w-full p-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  For an additional discount, please use your SJEC email ID.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="contact">Contact</FormLabel>
                <FormControl>
                  <Input
                    id="contact"
                    type="tel"
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
                <FormLabel htmlFor="designation">Designation</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    setDesignation(value);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="usn"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="usn">
                  USN (University Seat Number)
                </FormLabel>
                <FormControl>
                  <Input
                    id="usn"
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
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="organization">
                  Organization/College
                </FormLabel>
                <FormControl>
                  <Input
                    id="organization"
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
            name="collegeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="college-id">College ID Card</FormLabel>
                <FormControl>
                  <Input
                    id="college-id"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedCollegeId(file);
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
                <FormLabel htmlFor="photo">Photo</FormLabel>
                <FormControl>
                  <Input
                    id="photo"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedPhoto(file);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="coupon"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="coupon">Coupon</FormLabel>
                <FormControl>
                  <Input
                    id="coupon"
                    placeholder="Enter your coupon code"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Button onClick={handleRegister} disabled={uploading}>
              Register
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
