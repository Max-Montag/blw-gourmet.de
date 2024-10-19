/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['blw-gourmet.de'],
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        port: "8000",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
