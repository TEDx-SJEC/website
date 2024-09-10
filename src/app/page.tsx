import { getServerSideSession } from "@/app/lib/get-server-session";
export default async function Home() {
    const session = await getServerSideSession();
    if (!session) {
        return <div>Please login</div>;
    }
    return <div>Hello {session?.user.role}</div>;
}
