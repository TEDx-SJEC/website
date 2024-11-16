"use client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="mailto:contact@example.com"
      className="fixed bottom-6 right-6 flex items-center justify-center bg-[#e62b1e] text-white rounded-full shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: isHovered ? "160px" : "56px",
        height: "56px",
        paddingLeft: isHovered ? "20px" : "0",
        paddingRight: isHovered ? "20px" : "0",
        transition: "width 0.6s ease, padding 0.6s ease",
      }}
    >
      <Mail
        className={`h-6 w-6 m-2 transition-transform duration-300 ease-in-out ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      />
      <span
        className={`hidden whitespace-nowrap font-medium transition-opacity duration-300 ease-in-out ${
          isHovered ? "opacity-100 delay-200" : "opacity-0"
        }`}
        style={{
          maxWidth: isHovered ? "100px" : "0",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "max-width 0.6s ease",
        }}
      >
        Contact Us
      </span>
    </Link>
  );
}
