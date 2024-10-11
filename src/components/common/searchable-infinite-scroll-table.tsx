"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import debounce from "lodash.debounce";

interface TableData {
    user: {
        name: string;
        email: string;
    };
    usn: string;
    razorpayPaymentId: string;
    contactNumber: string;
    amount: number;
}

export function SearchableInfiniteScrollTable({totalPayments}: {totalPayments: number}) {
    const [data, setData] = useState<TableData[]>([]);
    const [filteredData, setFilteredData] = useState<TableData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMoreData, setHasMoreData] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);

    const getPaymentDetails = async (page: number, query: string) => {
        if (isLoading || !hasMoreData) return;

        setIsLoading(true);
        try {
            const response = await axios.get(
                `/api/users/payment?page=${page}&search=${encodeURIComponent(query)}`
            );
            const users = response.data.users;
            if (users.length === 0) {
                setHasMoreData(false);
            }

            setData((prevData) => {
                const newData = [...prevData, ...users];
                const uniqueData = Array.from(
                    new Map(newData.map((item) => [item.razorpayPaymentId, item])).values()
                );
                return uniqueData;
            });
            
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching payment details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreData = useCallback(() => {
        if (searchTerm === "") {
            getPaymentDetails(page, "");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchTerm]);

    const fetchSearchResults = useCallback(async (query: string) => {
        setPage(1);
        setHasMoreData(true);
        try {
            const response = await axios.get(`/api/users/payment?page=1&search=${encodeURIComponent(query)}`);
            const users = response.data.users;
            const total = response.data.total;
            setData(users);
            setFilteredData(users);
        } catch (error) {
            console.error("Error fetching payment details:", error);
        }
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetch = useCallback(
        debounce((query: string) => {
            fetchSearchResults(query);
        }, 300),
        [fetchSearchResults]
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedFetch(value);
    };

    useEffect(() => {
        loadMoreData();
    }, [loadMoreData]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
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
        };
    }, [isLoading, loadMoreData]);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-4">
                <Badge variant="secondary" className="text-lg">
                    Total Payments: {totalPayments}
                </Badge>
                <div className="relative w-64">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="pl-10"
                        aria-label="Search payments"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
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
                        {(searchTerm ? filteredData : data).map((item, index) => (
                            <TableRow key={item.razorpayPaymentId}>
                                <TableCell>{item.user.name}</TableCell>
                                <TableCell>{item.user.email}</TableCell>
                                <TableCell>{item.usn}</TableCell>
                                <TableCell>{item.razorpayPaymentId}</TableCell>
                                <TableCell>{item.contactNumber}</TableCell>
                                <TableCell>₹{item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {searchTerm === "" && hasMoreData && (
                <div ref={loaderRef} className="flex justify-center py-4">
                    {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}
                </div>
            )}
        </div>
    );
}