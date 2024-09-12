"use client";

import getErrorMessage from "@/utils/getErrorMessage";
import axios from "axios";
import { get } from "http";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify-email", { token });
      setVerified(true);
    } catch (error: unknown) {
      setError(true);
      console.log(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="m-20 border-2 border-neutral-300 dark:border-neutral-700 max-w-md w-full mx-auto rounded-none md:rounded-2xl md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="text-4xl text-center mb-8">Email Verification</h1>
      {verified ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">
            Your email has been successfully verified!
          </h2>
          <p className="text-lg mb-8">You can now proceed to login.</p>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          <Link href="/login">Login</Link>
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl bg-red-500 text-white rounded-lg py-4">
            Error
          </h2>
          <p className="text-lg mt-4">
            There was an error verifying your email. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}