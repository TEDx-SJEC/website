"use client";

import { saveCoupon } from "@/app/actions/create-coupon-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createCouponCode } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { type Session as NextAuthSession } from "next-auth";

export function Coupon({ session }: { session: NextAuthSession }) {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ["coupon"],
        queryFn: createCouponCode,
        enabled: false,
    });

    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Create</TabsTrigger>
                <TabsTrigger value="password">Store</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Coupon code</CardTitle>
                        <CardDescription>
                            Here you can create the coupon code and add it to the database
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Code</Label>
                            <Input id="username" disabled value={isPending ? "" : data} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => refetch()}>Create code</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Coupon code</CardTitle>
                        <CardDescription>You can see the generated coupon code below</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="text" disabled value={data} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={async () => {
                                await saveCoupon(data as string, session.user.id);
                            }}
                        >
                            Save coupon
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
