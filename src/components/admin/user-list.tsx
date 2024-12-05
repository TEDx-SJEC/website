"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
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
}

const UsersList: React.FC<UsersListProps> = ({ initialUsers, initialPage }) => {
    const [userList, setUserList] = useState<User[]>(initialUsers);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const loader = useRef<HTMLDivElement | null>(null);

    const fetchUsers = useCallback(async (page: number, query: string, isNewSearch: boolean) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`/api/users?page=${page}&search=${encodeURIComponent(query)}`, {
                headers: { "Cache-Control": "no-cache" },
            });
            if (response.data.users.length > 0) {
                setUserList((prevUsers) =>
                    isNewSearch ? response.data.users : [...prevUsers, ...response.data.users]
                );
                setCurrentPage(page);
                setHasMore(response.data.users.length === 10); // Assuming 10 is the page size
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    }, []);

    const loadMoreUsers = useCallback(() => {
        if (hasMore && !loading) {
            fetchUsers(currentPage + 1, searchQuery, false);
        }
    }, [currentPage, hasMore, searchQuery, fetchUsers, loading]);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setCurrentPage(1);
            setHasMore(true);
            fetchUsers(1, query, true);
        }, 500),
        [fetchUsers]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
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
        <Card className="w-full">
            <div className="flex justify-end gap-2 mt-5 p-5">
                <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-8 sm:w-[200px] md:w-[300px]"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage user roles and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {userList.map((user) => (
                        <div key={user.id} className="grid grid-cols-[1fr_auto] items-center gap-4">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={user.image || "/placeholder-user.jpg"} />
                                    <AvatarFallback>{user.name ? user.name[0] : "N/A"}</AvatarFallback>
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
                                        <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
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
    );
};

export default UsersList;
