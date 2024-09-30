import { SearchableInfiniteScrollTable } from "@/components/searchable-infinite-scroll-table";
import React from "react";

export default async function Payments() {
    return (
        <>
            <div className="pt-20 flex min-h-screen w-full flex-col bg-background">
                <SearchableInfiniteScrollTable />
            </div>
        </>
    );
}
