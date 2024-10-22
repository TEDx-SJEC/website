"use client";
import { Coupon } from "@/components/admin/code-generation-card";
import { useSession } from "next-auth/react";
export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.role != "ADMIN") {
    return <div>Unauthorized </div>;
  }

  return (
    <>
      <div className=" h-screen flex justify-center items-center">
        <Coupon session={session} />
      </div>
    </>
  );
}
