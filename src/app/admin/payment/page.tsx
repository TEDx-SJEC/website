import { SearchableInfiniteScrollTable } from "@/components/common/searchable-infinite-scroll-table";
import prisma from "@/server/db";
import React from "react";

export default async function Payments() {
    const totalPayments = await prisma.payment.count();
    return (
        <>
            <div className="pt-20 flex min-h-screen w-full flex-col bg-background">
                <SearchableInfiniteScrollTable totalPayments={totalPayments} />
            </div>
        </>
    );
}
