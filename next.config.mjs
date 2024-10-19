/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        port: "8000",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
