import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export async function getServerSideSession() {
    return await getServerSession(authOptions);
}
