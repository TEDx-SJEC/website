import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user?.role !== "ADMIN" && session.user?.role !== "COORDINATOR") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    try {
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const search = searchParams.get("search") || "";
        const limit = 10;

        const [users, totalCount] = await Promise.all([
            prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    name: {
                        contains: search,
                    },
                },
            }),
            prisma.user.count({
                // Get the total number of users for pagination
                where: {
                    name: {
                        contains: search,
                    },
                },
            }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            users,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                limit,
            },
        });
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return NextResponse.json({ message: "Failed to fetch users", status: 500 }, { status: 500 });
    }
}
