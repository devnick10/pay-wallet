/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', 
    env: {
        PORT: "3001",
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
