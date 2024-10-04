/** @type {import('next').NextConfig} */
const nextConfig = {
    
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tedx-sjec.github.io',
              port: '',
              pathname: '/**',
            },
          ],
        },
      
};

export default nextConfig;
