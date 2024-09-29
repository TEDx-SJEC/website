"use client";

import { saveCoupon } from "@/app/actions/create-coupon-code";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createCouponCode } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { type Session as NextAuthSession } from "next-auth";
import CouponGeneratorDialog from "../coupon-generator-dialog";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

export function Coupon({ session }: { session: NextAuthSession }) {
  const [discount, setDiscount] = useState("20");
  const [checked, setChecked] = useState(false);
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
            <div className="space-y-1">
              <Label htmlFor="username">Discount(%)</Label>
              <Input
                id="discount"
                value={discount}
                disabled={!checked}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
              />
              <Checkbox
                id="discount_terms"
                checked={checked}
                onClick={() => {
                  setChecked(!checked);
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Edit default discount
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <CouponGeneratorDialog onGenerateCoupon={refetch} />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Coupon code</CardTitle>
            <CardDescription>
              You can see the generated coupon code below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="new">Coupon code</Label>
              <Input id="new" type="text" disabled value={data} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={data === undefined ? true : false}
              onClick={async () => {
                await saveCoupon(data as string, session.user.id, discount);
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
