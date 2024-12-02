import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user?.role !== "ADMIN" && session.user?.role !== "COORDINATOR") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    try {
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const search = searchParams.get("search") || "";
        const limit = 10;

        const [users, totalCount] = await Promise.all([
            prisma.payment.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    OR: [
                        // Update to search in multiple fields
                        {
                            razorpayPaymentId: {
                                contains: search,
                            },
                        },
                        {
                            user: {
                                name: {
                                    contains: search,
                                },
                            },
                        },
                        {
                            user: {
                                email: {
                                    contains: search,
                                },
                            },
                        },
                    ],
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            forms: {
                                select: {
                                    photo: true,
                                },
                                take: 1,
                            },
                        },
                    },
                },
            }),
            prisma.payment.count({
                where: {
                    razorpayPaymentId: {
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
                totalCount,
                totalPages,
                limit,
            },
        });
    } catch (error) {
        console.error("Error fetching payment details:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
