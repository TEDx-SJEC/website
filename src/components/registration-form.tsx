"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";

export default function RegistrationForm() {
  const initialRegistration = {
    name: "",
    usn: "",
    email: "",
    contact: "",
    designation: "student",
    organization: "",
    coupon: "",
    photo: null,
    collegeId: null,
    verified: false,
  };
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedCollegeId, setSelectedCollegeId] = useState<File | null>(null);

  const [registration, setRegistration] = useState(initialRegistration);
  const updateRegistration = (key: string, value: string | File | null) => {
    setRegistration({ ...registration, [key]: value });
  };

  const handleRegister = async () => {
    if (selectedCollegeId) {
      await startUpload([selectedCollegeId]);
      toast.success("college id uploaded");
    }
    if (selectedPhoto) {
      await startUpload([selectedPhoto]);
      toast.success("photo uploaded");
    }
    toast.success("Registered successfully");
  };

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

  return (
    <div className="w-full p-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`name`}>Name</Label>
          <Input
            id={`name`}
            placeholder="Enter your name"
            value={registration.name}
            onChange={(e) => updateRegistration("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`email`}>Email</Label>
          <Input
            id={`email`}
            type="email"
            placeholder="Enter your email"
            value={registration.email}
            onChange={(e) => updateRegistration("email", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`contact`}>Contact</Label>
          <Input
            id={`contact`}
            type="tel"
            placeholder="Enter your phone number"
            value={registration.contact}
            onChange={(e) => updateRegistration("contact", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`designation`}>Designation</Label>
          <Select
            value={registration.designation}
            onValueChange={(value) => {
              console.log(value);
              updateRegistration("designation", value);
              console.log(registration.designation);
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`usn`}>USN (University Seat Number)</Label>
          <Input
            id={`usn`}
            placeholder="Enter your USN"
            value={registration.usn}
            onChange={(e) => updateRegistration("usn", e.target.value)}
            disabled={registration.designation !== "student"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`organization`}>Organization/College</Label>
          <Input
            id={`organization`}
            placeholder="Enter your organization or college"
            value={registration.organization}
            onChange={(e) => updateRegistration("organization", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`college-id`}>College ID Card</Label>
          <Input
            id={`college-id`}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setSelectedCollegeId(file);
            }}
            disabled={registration.designation !== "student"}
          />
        </div>
        <div className="flex items-center space-y-2">
          <Input
            id={`photo`}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setSelectedPhoto(file);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`coupon`}>Coupon</Label>
          <Input
            id={`coupon`}
            placeholder="Enter your coupon code"
            value={registration.coupon}
            onChange={(e) => updateRegistration("coupon", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Button onClick={handleRegister}>Register</Button>
        </div>
      </div>
    </div>
  );
}
