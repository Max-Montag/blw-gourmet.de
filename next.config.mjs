/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.151',
        port: '8000',
        pathname: '/api/media/**',
      },
    ],
  },
};

export default nextConfig;
