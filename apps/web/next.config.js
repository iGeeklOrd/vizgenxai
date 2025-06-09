import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "r2-us-west.photoai.com"
        }
    ]
    }
};

export default nextConfig;
