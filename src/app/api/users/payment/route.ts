import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const search = searchParams.get("search") || "";
    const limit = 10;
    const paymentDetails = await prisma.payment.findMany({});
}
