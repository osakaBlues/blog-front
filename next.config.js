/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://osakablues.site/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "referer",
            value: "http://osakablues.site",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
