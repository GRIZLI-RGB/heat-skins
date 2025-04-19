import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "avatars.steamstatic.com",
			},
		],
	},
};

export default nextConfig;
