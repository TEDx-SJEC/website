import { SearchableInfiniteScrollTable } from "@/components/common/searchable-infinite-scroll-table";
import React from "react";

export default async function Payments() {
  return (
    <>
      <div className="p-8 flex min-h-screen w-full flex-col bg-background">
       
        <SearchableInfiniteScrollTable />
      </div>
    </>
  );
}
