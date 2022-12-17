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
        headers: [
          {
            key: "referer",
            value: "http://osakablues.site",
          },
        ],
      },
      {
        source: ":origin/api/*",
        headers: [
          {
            key: "referer",
            value: ":origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
