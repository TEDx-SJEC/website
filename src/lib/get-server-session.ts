import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export async function getServerSideSession() {
    return await getServerSession(authOptions);
}
