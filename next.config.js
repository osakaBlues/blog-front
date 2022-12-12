/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	output: "standalone",
	env: {
		PORT: process.env.PORT,
		BACKEND_URL: process.env.BACKEND_URL,
	},
};

module.exports = nextConfig;
