/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wqxkG2U61F0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { JSX, SetStateAction, SVGProps, useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { AlertDialog, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogContent, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

export default function RegistrationForm() {
  const [registrations, setRegistrations] = useState([
    {
      name: "",
      usn: "",
      email: "",
      contact: "",
      designation: "",
      photo: null,
      collegeId: null,
    },
  ])
  const addRegistration = () => {
    setRegistrations([
      ...registrations,
      {
        name: "",
        usn: "",
        email: "",
        contact: "",
        designation: "",
        photo: null,
        collegeId: null,
      },
    ])
  }
  const updateRegistration = (index: number, field: string, value: string | File | null) => {
    const updatedRegistrations = [...registrations]
    // updatedRegistrations[index][field] = value
    setRegistrations(updatedRegistrations)
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const removeRegistration = (index: number | SetStateAction<null>) => {
    // setDeleteIndex(index)
    // setShowDeleteModal(true)
  }
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedRegistrations = [...registrations]
      updatedRegistrations.splice(deleteIndex, 1)
      setRegistrations(updatedRegistrations)
      setShowDeleteModal(false)
    }
  }
  const cancelDelete = () => {
    setShowDeleteModal(false)
  }
  return (
    <div className="w-full">
      {registrations.map((registration, index) => (
        <Collapsible
          key={index}
          className="border-b border-muted/50 last:border-b-0 transition-all duration-300 ease-in-out"
        >
          <CollapsibleTrigger className="flex justify-between items-center p-4 bg-muted cursor-pointer w-full text-center border border-muted/50">
            <div>Registration {index + 1}</div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeRegistration(index)}
                className="hover:bg-muted-foreground/10 text-muted-foreground hover:text-muted-foreground"
              >
                <TrashIcon className="w-5 h-5" />
                <span className="sr-only">Remove Registration</span>
              </Button>
              <div className="transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Name</Label>
                <Input
                  id={`name-${index}`}
                  placeholder="Enter your name"
                  value={registration.name}
                  onChange={(e) => updateRegistration(index, "name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`usn-${index}`}>USN (University Seat Number)</Label>
                <Input
                  id={`usn-${index}`}
                  placeholder="Enter your USN"
                  value={registration.usn}
                  onChange={(e) => updateRegistration(index, "usn", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  placeholder="Enter your email"
                  value={registration.email}
                  onChange={(e) => updateRegistration(index, "email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`contact-${index}`}>Contact</Label>
                <Input
                  id={`contact-${index}`}
                  type="tel"
                  placeholder="Enter your phone number"
                  value={registration.contact}
                  onChange={(e) => updateRegistration(index, "contact", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`designation-${index}`}>Designation</Label>
                <Select
                  value={registration.designation}
                  onValueChange={(value) => updateRegistration(index, "designation", value)}
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
              <div className="space-y-2">
                <Label htmlFor={`photo-${index}`}>Photo</Label>
                <Input
                  id={`photo-${index}`}
                  type="file"
                  onChange={(e) => updateRegistration(index, "photo", e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`college-id-${index}`}>College ID Card</Label>
                <Input
                  id={`college-id-${index}`}
                  type="file"
                  onChange={(e) => updateRegistration(index, "collegeId", e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <div className="mt-4 flex justify-center">
        <Button onClick={addRegistration}>Add Another Registration</Button>
      </div>
      {showDeleteModal && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the registration.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogContent>
                    <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                  </AlertDialogContent>
                </AlertDialogFooter>
              </div>
            </div>
          </AlertDialogTrigger>
        </AlertDialog>
      )}
    </div>
  )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}