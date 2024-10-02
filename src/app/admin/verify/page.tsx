"use client";

import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/navigation";

export default function QRCodeScanner() {
    const [isMobile, setIsMobile] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check if the device is mobile
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
                userAgent.toLowerCase()
            );
        };

        setIsMobile(checkMobile());
    }, []);

    const handleScan = (result: string | null) => {
        if (result) {
            // Validate URL before redirecting
            try {
                new URL(result);
                router.push(result);
            } catch {
                setError("Invalid QR code. Please scan a valid URL.");
            }
        }
    };

    const handleError = (error: Error) => {
        setError("Error accessing camera: " + error.message);
    };

    if (!isMobile) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center text-red-600">Error</h1>
                    <p className="text-center text-gray-700">
                        This feature is only available on mobile devices. Please access this page from your
                        smartphone or tablet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">QR Code Scanner</h1>
                {error ? (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                ) : (
                    <QrReader
                        onResult={(result: any) => {
                            if (result) {
                                handleScan(result?.text);
                            }
                        }}
                        constraints={{ facingMode: "environment" }}
                    />
                )}
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Position the QR code within the frame to scan.
                </p>
            </div>
        </div>
    );
}
