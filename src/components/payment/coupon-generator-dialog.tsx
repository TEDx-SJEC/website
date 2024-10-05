import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import clsx from "clsx";

interface CouponGeneratorDialogProps {
  className?: string;
  onGenerateCoupon: () => void;
}

export default function CouponGeneratorDialog({
  className,
  onGenerateCoupon,
}: CouponGeneratorDialogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateCoupon = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      onGenerateCoupon();
      setIsOpen(false);
      setPassword("");
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={className}>Create Code</Button>
      </DialogTrigger>
      <DialogContent className={clsx("sm:max-w-[425px]", className)}>
        <DialogHeader>
          <DialogTitle>Generate Coupon</DialogTitle>
          <DialogDescription>
            Enter the admin password to generate a new coupon code.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="submit" onClick={handleGenerateCoupon}>
            Generate Coupon
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
