import UsersList from "@/components/Admin/user-list";
import prisma from "@/server/db";

export default async function Users() {
  let initialUserData = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
    take: 10,
  });
  if (initialUserData === null) {
    initialUserData = [
      {
        id: "1",
        name: "Test name",
        email: "testEmail@gmail.com",
        role: "PARTICIPANT",
        image: "https://i.pravatar.cc/300?img=1",
      },
    ];
  }
  return (
    <>
      <div className="pt-20 flex min-h-screen w-full flex-col bg-background">
        <UsersList initialUsers={initialUserData} initialPage={1} />
      </div>
    </>
  );
}
