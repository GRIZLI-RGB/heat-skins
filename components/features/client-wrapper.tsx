"use client";

import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect } from "react";
import { useAtomValue } from "jotai";

import Header from "../ui/header";
import Footer from "../ui/footer";

import { _disableBodyScroll_ } from "@/lib/store";

export default function ClientWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const disableBodyScroll = useAtomValue(_disableBodyScroll_);

	useEffect(() => {
		const osInstance = OverlayScrollbars(document.body, {
			overflow: { x: "hidden", y: "scroll" },
			scrollbars: { theme: "os-theme-light", autoHide: "scroll" },
		});

		return () => {
			osInstance?.destroy();
		};
	}, []);

	useEffect(() => {
		const osInstance = OverlayScrollbars(document.body);
		if (!osInstance) return;

		osInstance.options({
			overflow: { y: disableBodyScroll ? "hidden" : "scroll" },
		});
	}, [disableBodyScroll]);

	return (
		<>
			<Header />

			<main className="flex-1">{children}</main>

			<Footer />
		</>
	);
}
