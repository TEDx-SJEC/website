"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import axios from "axios";
import debounce from "lodash.debounce";
import getPaymentCount from "@/app/actions/get-payment-count";

interface PaymentData {
    user: {
        name: string;
        email: string;
        image: string;
        forms: [{ photo: string }];
    };
    usn?: string;
    razorpayPaymentId: string;
    contactNumber: string;
    amount: number;
}

export function PaymentCards() {
    const [data, setData] = useState<PaymentData[]>([]);
    const [filteredData, setFilteredData] = useState<PaymentData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalNumberOfPayments, setTotalNumberOfPayments] = useState(0);
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

    const loadMoreData = () => {
        if (searchTerm === "") {
            getPaymentDetails(page, "");
        }
    };

    const fetchSearchResults = useCallback(async (query: string) => {
        setPage(1);
        setHasMoreData(true);
        try {
            const response = await axios.get(`/api/users/payment?page=1&search=${encodeURIComponent(query)}`);
            const users = response.data.users;
            setData(users);
            setFilteredData(users);
        } catch (error) {
            console.error("Error fetching payment details:", error);
        }
    }, []);

    const debouncedFetch = useCallback(
        debounce((query: string) => {
            fetchSearchResults(query);
        }, 500),
        []
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedFetch(value);
    };

    useEffect(() => {
        loadMoreData();
        async function getNumberOfPayments() {
            const count = await getPaymentCount();
            setTotalNumberOfPayments(count ?? 0);
        }
        getNumberOfPayments();
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
                observer.unobserve(loaderRef.current);
            }
            observer.disconnect();
        };
    }, [isLoading]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-primary py-4">Payments ({totalNumberOfPayments})</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(searchTerm ? filteredData : data).map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="p-0">
                            <div className="relative pb-[100%]">
                                <Avatar className="absolute inset-0 w-full h-full rounded-none">
                                    <AvatarImage
                                        src={item.user.forms?.[0]?.photo || ""}
                                        alt={item.user.name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-xl mb-2">{item.user.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mb-1">{item.user.email}</p>
                            <p className="text-sm text-muted-foreground mb-1">ID: {item.razorpayPaymentId}</p>
                            <p className="text-sm font-semibold">Amount: ₹{item.amount.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {searchTerm === "" && hasMoreData && (
                <div ref={loaderRef} className="flex justify-center py-4">
                    {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}
                </div>
            )}
        </div>
    );
}
