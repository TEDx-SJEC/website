"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [otp, setOtp] = useState("");

  const sendVerificationEmail = async () => {
    try {
      await axios.post("/api/send-mail", {
        email: "joywinbennis0987@gmail.com",
        name: "Joywin",
      });
      alert("Verification email sent!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome to the OTP Verification Page
      </h1>
      <button
        onClick={sendVerificationEmail}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        Send Verification Mail
      </button>
      <div className="flex flex-col items-center mt-6">
        <label htmlFor="otp" className="text-lg mb-2 text-gray-700">
          Enter OTP:
        </label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={async () => {
            try {
              const response = await axios.post("/api/verify-mail", {
                identifier: "joywinbennis0987@gmail.com",
                otp,
              });
              console.log("1",response.data);
              if (response.data.status === 200) alert(response.data.message);
              else if (response.data.status === 400) alert(response.data.message);
            } catch (error) {
              console.error("Error verifying OTP:", error);
            }
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors mt-4"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
