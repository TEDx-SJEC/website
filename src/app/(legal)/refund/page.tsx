"use client";

import BackButton from "@/components/shared/back-button";
import Container from "@/components/shared/container";
import { Text } from "@/components/shared/text";
import { legalInfo } from "@/data/legal-info";
import { cn } from "@/lib/utils";

export default function Refund() {
    return (
        <Container className="mx-auto mt-24 md:mt-32 mb-1">
            <div className="py-10 px-6 sm:px-12 md:px-20 lg:px-32 space-y-8 text-red-600 rounded-lg shadow-lg backdrop-blur-md">
                <BackButton />

                {/* Title Section */}
                <div className="text-center">
                    <Text variant="h1" className={cn("text-4xl md:text-5xl font-bold text-center")}>
                        Refund Policy
                    </Text>
                </div>

                {/* Policy Sections */}
                <div className="space-y-6">
                    {legalInfo.Refund.map((refund, index) => (
                        <div
                            key={index}
                            className="border-gray-700 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
                        >
                            {/* Section Title */}
                            <Text
                                variant="h3"
                                className={cn("text-2xl md:text-3xl font-semibold mb-1 text-gray-200")}
                            >
                                {refund.title}
                            </Text>

                            {/* Section Description */}
                            <p
                                className="text-base md:text-lg text-gray-400 leading-7 md:leading-8 text-justify"
                                dangerouslySetInnerHTML={{ __html: refund.description }}
                            ></p>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
