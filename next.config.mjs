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
