import UsersList from "@/components/admin/user-list";
import prisma from "@/server/db";
import React from "react";

export default async function Users() {
    const initialUserData = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
        },
        take: 10,
    });

    return (
        <div className="pt-20 flex min-h-screen w-full flex-col bg-background">
            <UsersList initialUsers={initialUserData} initialPage={1} />
        </div>
    );
}
