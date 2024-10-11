/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tedx-sjec.github.io",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "startup-template-sage.vercel.app",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
