"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function BackButton({ className }: { className?: string }) {
    const router = useRouter();
    return (
        <div className = {cn("flex items-center justify-start", className)}>
            <button
                className="text-red-600 hover:text-red-800 flex items-center space-x-2"
                onClick={() => router.back()}
            >
                <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
            </button>
        </div>
    );

}