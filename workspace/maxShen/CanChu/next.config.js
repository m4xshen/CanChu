/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'max-shen-canchu-api.octave.vip',
      },
    ],
  },
  output: 'standalone',
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
