"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

import SearchBar from "@components/features/search-bar";
import Logo from "@components/ui/logo";
import { useEffect, useState } from "react";
import { _disableBodyScroll_ } from "@/lib/store";
import { useSetAtom } from "jotai";

const Navigation = ({ className }: { className?: string }) => {
	const pathname = usePathname();

	return (
		<nav className={className}>
			{[
				{ text: "Guarantees", link: "/guarantees" },
				{ text: "Blog", link: "/blog" },
				{
					text: "FAQ",
					link: "/faq",
				},
				{
					text: "Rules",
					link: "/rules",
				},
			].map(({ text, link }) => (
				<a
					className={clsx(
						"text-[14px] font-bold uppercase px-[25px] h-full inline-flex items-center relative hover:text-white max-lg:px-4",
						pathname === link ? "text-white" : "text-[#c6cddb]"
					)}
					href={link}
					key={text}
				>
					<div
						className={clsx(
							"absolute left-0 right-0 top-0 bg-accent-purple h-px max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:left-px max-lg:right-auto max-lg:w-px max-lg:h-full",
							pathname === link ? "opacity-100" : "opacity-0"
						)}
					/>
					{text}
				</a>
			))}
		</nav>
	);
};

const SteamAuthButton = ({ className }: { className?: string }) => {
	return (
		<button
			className={clsx(
				"flex gap-4 items-center relative h-[54px] px-[18px] rounded-md group overflow-hidden",
				className
			)}
		>
			<img className="raise-up" src="/icons/steam.png" alt="" />

			<div className="raise-up flex flex-col items-start">
				<span className="font-black text-[15px] text-white">STEAM</span>
				<span className="font-medium text-[11px] text-[#b8bcc8] -mt-0.5">
					Authorization
				</span>
			</div>

			<img
				className="absolute left-0 top-0 bottom-0 group-hover:brightness-125"
				src="/images/decorations/steam-button.png"
				alt=""
			/>
		</button>
	);
};

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const setDisableBodyScroll = useSetAtom(_disableBodyScroll_);

	useEffect(() => {
		setDisableBodyScroll(isMobileMenuOpen);

		const handleResize = () => {
			if (window.innerWidth > 1320) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
			setDisableBodyScroll(false);
		};
	}, [isMobileMenuOpen, setDisableBodyScroll]);

	return (
		<div className="relative">
			<header className="z-[100] relative pl-7 pr-2.5 bg-primary-background border-b border-primary-border flex items-center h-[74px] max-sm:h-16 max-lg:justify-between max-lg:px-5">
				<Logo />

				<SearchBar className="ml-[84px] max-lg:hidden" />

				<Navigation className="h-full mx-7 max-lg:hidden" />

				<SteamAuthButton className="max-lg:hidden ml-auto" />

				<div
					className="hidden max-lg:flex flex-col gap-1 cursor-pointer transition-all duration-300"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<div
						className={`w-6 h-0.5 rounded-full bg-white ${
							isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
						}`}
					/>
					<div
						className={`w-6 h-0.5 rounded-full bg-white ${
							isMobileMenuOpen ? "opacity-0" : "opacity-100"
						}`}
					/>
					<div
						className={`w-6 h-0.5 rounded-full bg-white ${
							isMobileMenuOpen
								? "-rotate-45 -translate-y-1.5"
								: ""
						}`}
					/>
				</div>
			</header>

			<div
				className={clsx(
					"z-[100] border-b border-primary-border absolute top-[74px] max-sm:top-16 left-0 w-full bg-primary-background transition-all duration-300 transform origin-top",
					isMobileMenuOpen
						? "scale-y-100 opacity-100"
						: "scale-y-0 opacity-0"
				)}
			>
				<div className="p-5">
					<SearchBar className="!max-w-full" />

					<Navigation className="my-5 flex flex-col gap-5" />

					<SteamAuthButton />
				</div>
			</div>

			<div
				className={clsx(
					"backdrop-blur-sm fixed top-0 left-0 w-screen h-screen",
					isMobileMenuOpen
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				)}
			/>
		</div>
	);
}
