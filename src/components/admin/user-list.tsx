"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import debounce from "lodash.debounce";
import ChangeRole from "./change-role";

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    image: string | null;
}

interface UsersListProps {
    initialUsers: User[];
    initialPage: number;
    totalNumberOfUsers: number;
}

export const dynamic = "force-dynamic";

const UsersList: React.FC<UsersListProps> = ({ initialUsers, initialPage, totalNumberOfUsers }) => {
    const [userList, setUserList] = useState<User[]>(initialUsers);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const loader = useRef<HTMLDivElement | null>(null);

    const fetchUsers = async (page: number, query: string) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`/api/users?page=${page}&search=${encodeURIComponent(query)}`);
            if (response.data.users.length > 0) {
                setUserList((prevUsers) =>
                    page === 1 ? response.data.users : [...prevUsers, ...response.data.users]
                );
                setCurrentPage(page);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    };

    const loadMoreUsers = useCallback(() => {
        if (hasMore) {
            fetchUsers(currentPage + 1, searchQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, hasMore, searchQuery]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchUsers = useCallback(
        debounce((query: string) => {
            setCurrentPage(1);
            setHasMore(true);
            fetchUsers(1, query);
        }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedFetchUsers(query);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreUsers();
                }
            },
            { threshold: 1.0 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loadMoreUsers]);

    return (
        <div className="flex flex-1 overflow-hidden">
            <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>Manage user roles and permissions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-6">
                            <Badge variant="secondary" className="text-sm">
                                Total Users: {totalNumberOfUsers}
                            </Badge>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search users..."
                                    className="pl-8 sm:w-[200px] md:w-[300px]"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    aria-label="Search users"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            {userList.map((user) => (
                                <div key={user.id} className="grid grid-cols-[1fr_auto] items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage
                                                src={user.image || "/placeholder-user.jpg"}
                                                alt={user.name || "User avatar"}
                                            />
                                            <AvatarFallback>{user.name ? user.name[0] : "U"}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{user.name || "Unknown"}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email || "No email"}
                                            </p>
                                        </div>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                {user.role}{" "}
                                                <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="center">
                                            <ChangeRole userId={user.id} userRole={user.role} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            ))}
                        </div>
                        {hasMore && (
                            <div ref={loader} className="text-center mt-4">
                                {loading ? "Loading..." : "Load more"}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default UsersList;
