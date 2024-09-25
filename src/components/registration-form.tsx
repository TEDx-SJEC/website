"use client";;
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
import { useState } from "react";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

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

  const [registration, setRegistration] = useState(initialRegistration);
  const updateRegistration = (key: string, value: string | File | null) => {
    setRegistration({ ...registration, [key]: value });
  };

  const verifyRegistration = () => {
    toast.success("Email verified successfully");
  };
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
            onChange={(e) =>
              updateRegistration(
                "collegeId",
                (e.target.files?.[0] as File) || null
              )
            }
            disabled={registration.designation !== "student"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`photo`}>Photo</Label>
          <Input
            id={`photo`}
            type="file"
            onChange={(e) =>
              updateRegistration("photo", e.target.files?.[0] || null)
            }
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
          <Button onClick={() => verifyRegistration()}>Added</Button>
        </div>
        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast.success("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`);
        }}
      />
      </div>
    </div>
  );
}
