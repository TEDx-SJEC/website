"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
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

export function SearchableInfiniteScrollTable() {
    const [data, setData] = useState<TableData[]>([]);
    const [filteredData, setFilteredData] = useState<TableData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMoreData, setHasMoreData] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const getPaymentDetails = async (page: number, query: string) => {
        if (isLoading || !hasMoreData) return;

        setIsLoading(true);
        try {
            const response = await axios.get(
                `/api/users/payment?page=${page}&search=${encodeURIComponent(query)}`
            );
            const users = response.data.users;

            if (users.length === 0) {
                setHasMoreData(false); // No more data to load
            }

            setData((prevData) => {
                const newData = [...prevData, ...users];
                // Remove duplicates
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

    const loadMoreData = () => {
        if (searchTerm === "") {
            getPaymentDetails(page, "");
        }
    };

    const fetchSearchResults = useCallback(async (query: string) => {
        setPage(1); // Reset page number
        setHasMoreData(true); // Reset hasMoreData
        try {
            const response = await axios.get(`/api/users/payment?page=1&search=${encodeURIComponent(query)}`);
            const users = response.data.users;
            setData(users); // Set new data from search
            setFilteredData(users); // Set filtered data to the same as new data
        } catch (error) {
            console.error("Error fetching payment details:", error);
        }
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetch = useCallback(
        debounce((query: string) => {
            fetchSearchResults(query);
        }, 500),
        []
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedFetch(value); // Use debounced fetch function
    };

    useEffect(() => {
        loadMoreData(); // Initial load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

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
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(searchTerm ? filteredData : data).map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.user.name}</TableCell>
                            <TableCell>{item.user.email}</TableCell>
                            <TableCell>{item.razorpayPaymentId}</TableCell>
                            <TableCell>₹{item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {searchTerm === "" && hasMoreData && (
                <div ref={loaderRef} className="flex justify-center py-4">
                    {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}
                </div>
            )}
        </div>
    );
}
