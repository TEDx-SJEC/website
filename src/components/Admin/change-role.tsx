"use client";
import { makeAdmin, makeParticipant } from "@/app/_actions/change-role";
import { Button } from "@/components/ui/button";

export default function ChangeRole({
  userId,
  userRole,
}: {
  userId: string;
  userRole: string;
}) {
  async function handleMakeAdmin() {
    await makeAdmin(userId);
  }

  async function handleMakeParticipant() {
    await makeParticipant(userId);
  }

  return (
    <div className="">
      <Button
        className={`bg-foreground hover:bg-muted-foreground font-bold py-2 px-4 rounded dark:bg-black ${
          userRole === "ADMIN" ? "hidden" : ""
        }`}
        onClick={handleMakeAdmin}
      >
        Make Admin
      </Button>
      <Button
        className={`bg-foreground hover:bg-muted-foreground font-bold py-2 px-4 rounded dark:bg-black ${
          userRole === "PARTICIPANT" ? "hidden" : ""
        }`}
        onClick={handleMakeParticipant}
      >
        Make Participant
      </Button>
    </div>
  );
}
