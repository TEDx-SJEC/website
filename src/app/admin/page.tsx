"use client";
import { Coupon } from "@/components/admin/code-generation-card";
import { useSession } from "next-auth/react";
import Payments from "./payment/page";
export default function AdminPage() {
  const { data: session } = useSession();

  if (
    !session ||
    (session.user.role != "ADMIN" && session.user.role != "COORDINATOR")
  ) {
    return <div>Unauthorized </div>;
  }

  return (
    <>
      <div className="h-screen flex  items-center justify-center bg-gray-800">
        {session.user.role === "ADMIN" ? (
          <Coupon session={session} />
        ) : session.user.role === "COORDINATOR" ? (
          <div className="h-screen w-screen flex flex-col items-center justify-center bg-white text-2xl font-semibold">
            <h1 className="mb-2 text-red-600">Welcome, Coordinator!</h1>
            <p className="text-sm text-black">
              You have successfully logged in with the Coordinator role.
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
