import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
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
          razorpayPaymentId: {
            contains: search,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
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
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
