/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	// output: "standalone",
};

module.exports = nextConfig;

module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://osakablues.site/api/:path*",
			},
		];
	},
};
