"use client";

import { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

interface TableData {
    name: string;
    email: string;
    usn: string;
    paymentId: string;
    contactNumber: string;
    amount: number;
}

function generateMockData(count: number): TableData[] {
    return Array.from({ length: count }, (_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        usn: `USN${(1000 + i).toString().padStart(4, "0")}`,
        paymentId: `PAY${(10000 + i).toString().padStart(5, "0")}`,
        contactNumber: `+1 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        amount: Math.floor(10 + Math.random() * 990),
    }));
}

export function SearchableInfiniteScrollTable() {
    const [data, setData] = useState<TableData[]>([]);
    const [filteredData, setFilteredData] = useState<TableData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const loaderRef = useRef(null);

    const loadMoreData = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newData = generateMockData(20);
            setData((prevData) => [...prevData, ...newData]);
            setPage((prevPage) => prevPage + 1);
            setIsLoading(false);
        }, 1000); // Simulating API delay
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [data, searchTerm]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && searchTerm === "") {
                    loadMoreData();
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(loaderRef.current);
            }
            observer.disconnect();
        };
    }, [isLoading, searchTerm]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="mb-4 relative">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                />
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>USN</TableHead>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.usn}</TableCell>
                            <TableCell>{item.paymentId}</TableCell>
                            <TableCell>{item.contactNumber}</TableCell>
                            <TableCell>${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {searchTerm === "" && (
                <div ref={loaderRef} className="flex justify-center py-4">
                    {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}
                </div>
            )}
        </div>
    );
}
