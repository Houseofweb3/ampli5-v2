/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/ostium",
        destination: "https://app.ostium.com/trade?from=SPX&to=USD&ref=QPJDE",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
