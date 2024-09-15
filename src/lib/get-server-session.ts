import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getServerSideSession() {
  return await getServerSession(authOptions);
}
