import { Inter } from "next/font/google";
import type { Metadata } from "next";

import ClientWrapper from "@/components/features/client-wrapper";

import "overlayscrollbars/overlayscrollbars.css";
import "@styles/globals.css";
import { Suspense } from "react";

import "react-tooltip/dist/react-tooltip.css";
export const metadata: Metadata = {
	title: "GrabYourKit",
};

const inter = Inter({
	subsets: [
		"latin",
		"latin-ext",
		"cyrillic",
		"cyrillic-ext",
		"greek",
		"greek-ext",
	],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-overlayscrollbars-initialize>
			<body
				data-overlayscrollbars-initialize
				className={`antialiased min-h-screen h-full flex flex-col ${inter.className} bg-[#11151e]`}
			>
				<Suspense>
					<ClientWrapper>{children}</ClientWrapper>
				</Suspense>
			</body>
		</html>
	);
}
