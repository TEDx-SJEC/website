"use client";

import Container from "@/components/shared/container";
import { Text } from "@/components/shared/text";
import { Button } from "@/components/ui/button";
import { legalInfo } from "@/data/legal-info";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const router = useRouter();
  return (
    <Container className="mx-auto mt-24 md:mt-32 mb-1">
      <div className="py-10 px-6 sm:px-12 md:px-20 lg:px-32 space-y-8 text-red-600 rounded-lg shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-start">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>
        <Text
          variant="h1"
          className={cn("text-4xl md:text-5xl font-bold text-center")}
        >
          Terms and Conditions
        </Text>
        <div className="space-y-6">
          {legalInfo.Terms.map((terms, index) => (
            <div
              key={index}
              className="border-gray-700 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
            >
              <Text
                variant="h3"
                className={cn(
                  "text-2xl md:text-3xl font-semibold mb-1 text-gray-200"
                )}
              >
                {terms.title}
              </Text>
              <p className="text-base md:text-lg text-gray-400 leading-7 md:leading-8 text-justify">
                {terms.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
