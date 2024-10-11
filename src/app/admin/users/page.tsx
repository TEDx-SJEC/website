import UsersList from "@/components/admin/user-list";
import prisma from "@/server/db";
import React from "react";

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
    const totalNumberOfUsers = await prisma.user.count();
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
                <UsersList
                    initialUsers={initialUserData}
                    initialPage={1}
                    totalNumberOfUsers={totalNumberOfUsers}
                />
            </div>
        </>
    );
}
