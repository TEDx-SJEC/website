"use client";
import React from "react";
import Link from "next/link";

const RegisterButton = () => {
  return (
    <Link href="/register">
      <button className="px-8 shadow-sm py-5 rounded-md bg-[#EB0028]">
        REGISTER
      </button>
    </Link>
  );
};

export default RegisterButton;
