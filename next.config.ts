import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "avatars.steamstatic.com",
			},
			{
				hostname: "api.topskinsmarket.com",
			},
		],
	},
	reactStrictMode: false,
};

export default nextConfig;
