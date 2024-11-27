"use client";
import {
  makeAdmin,
  makeCoordinator,
  makeParticipant,
} from "@/app/actions/change-role";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export default function ChangeRole({
  userId,
  userRole,
}: {
  userId: string;
  userRole: string;
}) {
  const [currentRole, setCurrentRole] = useState(userRole);

  async function handleRoleChange(newRole: string) {
    switch (newRole) {
      case "ADMIN":
        await makeAdmin(userId);
        break;
      case "PARTICIPANT":
        await makeParticipant(userId);
        break;
      case "COORDINATOR":
        await makeCoordinator(userId);
        break;
      default:
        break;
    }
    setCurrentRole(newRole);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {currentRole}{" "}
          <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <div className="flex gap-2 bg-white p-2 flex-col">
          <Button
            className={`bg-foreground hover:bg-muted-foreground font-bold py-2 px-4 rounded  ${
              currentRole === "ADMIN" ? "hidden" : ""
            }`}
            onClick={() => handleRoleChange("ADMIN")}
          >
            Make Admin
          </Button>
          <Button
          type="submit"
            className={`bg-foreground hover:bg-muted-foreground font-bold py-2 px-4 rounded  ${
              currentRole === "PARTICIPANT" ? "hidden" : ""
            }`}
            onClick={() => handleRoleChange("PARTICIPANT")}
          >
            Make Participant
          </Button>
          <Button
            className={`bg-foreground hover:bg-muted-foreground font-bold py-2 px-4 rounded  ${
              currentRole === "COORDINATOR" ? "hidden" : ""
            }`}
            onClick={() => handleRoleChange("COORDINATOR")}
          >
            Make Coordinator
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
