"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import RegistrationForm from "@/components/common/registration-form";

export default function RegistrationPage() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn("google");
        },
    });

    useEffect(() => {
        if (status === "loading") {
            // You can add a loading state here if needed
        }
    }, [status]);

    if (status !== "authenticated") {
        return null; 
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="mb-8 text-4xl font-bold">TEDx 2024</h1>
            <RegistrationForm />
        </div>
    );
}
