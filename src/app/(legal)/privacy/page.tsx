"use client";

import Container from "@/components/shared/container";
import { Text } from "@/components/shared/text";
import { legalInfo } from "@/data/legal-info";
import { cn } from "@/lib/utils";

export default function PrivacyPolicy() {
  return (
    <Container className="mx-auto mt-20 mb-12">
      <div className="py-10 px-6 sm:px-12 md:px-20 lg:px-32 space-y-8  text-white rounded-lg shadow-lg backdrop-blur-md">
        <Text variant="h1" className={cn("text-4xl md:text-5xl font-bold text-center")}>
          Privacy Policy
        </Text>

        {/* Policy Sections */}
        <div className="space-y-6">
          {legalInfo.Privacy.map((privacy, index) => (
            <div
              key={index}
              className="border-b border-gray-700 pb-6 mb-6 last:border-none last:pb-0 last:mb-0"
            >
              {/* Section Title */}
              <Text
                variant="h3"
                className={cn("text-2xl md:text-3xl font-semibold mb-4 text-gray-200")}
              >
                {privacy.title}
              </Text>

              {/* Section Description */}
              <p
                className="text-base md:text-lg text-gray-400 leading-7 md:leading-8"
                dangerouslySetInnerHTML={{ __html: privacy.description }}
              ></p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
