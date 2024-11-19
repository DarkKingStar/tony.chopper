/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gogocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.noitatnemucod.net',
      }
    ], // Add the external domain here
    },
    reactStrictMode: false,
};

export default nextConfig;