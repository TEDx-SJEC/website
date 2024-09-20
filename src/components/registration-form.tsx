"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { ConfirmationDialog } from "./confirmation-dialog";

export default function RegistrationForm() {
  const [registrations, setRegistrations] = useState([
    {
      name: "",
      usn: "",
      email: "",
      contact: "",
      designation: "",
      organization: "",
      coupon: "",
      photo: null,
      collegeId: null,
    },
  ]);
  const addRegistration = () => {
    setRegistrations([
      ...registrations,
      {
        name: "",
        usn: "",
        email: "",
        contact: "",
        designation: "",
        organization: "",
        coupon: "",
        photo: null,
        collegeId: null,
      },
    ]);
  };
  const updateRegistration = (
    index: number,
    field: string,
    value: string | File | null
  ) => {
    const updatedRegistrations = [...registrations];
    // updatedRegistrations[index][field] = value
    setRegistrations(updatedRegistrations);
  };
  const removeRegistration = (index: number) => {
    if (registrations.length === 1) return;
    const updatedRegistrations = [...registrations];
    updatedRegistrations.splice(index, 1);
    setRegistrations(updatedRegistrations);
  };

  return (
    <div className="w-full p-16">
      {registrations.map((registration, index) => (
        <div
          key={index}
          className=" relative flex justify-between items-center gap-4 w-full"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value={`${index}`}
              className="border-2 border-gray-300 px-2 mb-2 rounded-lg bg-white"
            >
              <AccordionTrigger className="flex justify-between items-center p-8 my-2 rounded-lg  bg-muted cursor-pointer w-full">
                <div>Registration {index + 1}</div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-4 ">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="Enter your name"
                      value={registration.name}
                      onChange={(e) =>
                        updateRegistration(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`contact-${index}`}>Contact</Label>
                    <Input
                      id={`contact-${index}`}
                      type="tel"
                      placeholder="Enter your phone number"
                      value={registration.contact}
                      onChange={(e) =>
                        updateRegistration(index, "contact", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`usn-${index}`}>
                      USN (University Seat Number)
                    </Label>
                    <Input
                      id={`usn-${index}`}
                      placeholder="Enter your USN"
                      value={registration.usn}
                      onChange={(e) =>
                        updateRegistration(index, "usn", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`designation-${index}`}>Designation</Label>
                    <Select
                      value={registration.designation}
                      onValueChange={(value) =>
                        updateRegistration(index, "designation", value)
                      }
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
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      placeholder="Enter your email"
                      value={registration.email}
                      onChange={(e) =>
                        updateRegistration(index, "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`organization-${index}`}>
                      Organization/College
                    </Label>
                    <Input
                      id={`organization-${index}`}
                      placeholder="Enter your organization or college"
                      value={registration.organization}
                      onChange={(e) =>
                        updateRegistration(
                          index,
                          "organization",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`coupon-${index}`}>Coupon</Label>
                    <Input
                      id={`coupon-${index}`}
                      placeholder="Enter your coupon code"
                      value={registration.coupon}
                      onChange={(e) =>
                        updateRegistration(index, "coupon", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`photo-${index}`}>Photo</Label>
                    <Input
                      id={`photo-${index}`}
                      type="file"
                      onChange={(e) =>
                        updateRegistration(
                          index,
                          "photo",
                          e.target.files?.[0] || null
                        )
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`college-id-${index}`}>
                      College ID Card
                    </Label>
                    <Input
                      id={`college-id-${index}`}
                      type="file"
                      onChange={(e) =>
                        updateRegistration(
                          index,
                          "collegeId",
                          e.target.files?.[0] || null
                        )
                      }
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="absolute top-8 right-8">
            <ConfirmationDialog
              onConfirm={() => removeRegistration(index)}
              title="Delete"
              description=""
            />
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-center">
        <Button onClick={addRegistration}>Add Another Registration</Button>
      </div>
    </div>
  );
}
