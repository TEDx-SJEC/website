"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const RegisterButton = () => {
  return (
    <Link href="/register">
      <Button
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-xl text-white py-6 px-4 transition-all duration-300 transform hover:scale-105"
      >
        Register Now
      </Button>
    </Link>
  );
};

export default RegisterButton;
