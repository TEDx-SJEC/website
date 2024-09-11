import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function getServerSideSession() {
    return await getServerSession(authOptions);
}
