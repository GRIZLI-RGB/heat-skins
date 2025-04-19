"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import SearchBar from "@components/features/search-bar";
import Logo from "@components/ui/logo";
import { RefObject, useEffect, useRef, useState } from "react";
import {
	_disableBodyScroll_,
	_globalLoading_,
	_isMobileMenuOpen_,
	_isOpenReplenishmentModal_,
	_user_,
} from "@/lib/store";
import { getOauthSteamLink } from "@/lib/api";
import { UserType } from "@/lib/types";

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
						"font-bold uppercase px-[25px] h-full inline-flex items-center relative hover:text-white max-lg:px-4",
						pathname === link ? "text-white" : "text-secondary-text"
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
	const setGlobalLoading = useSetAtom(_globalLoading_);

	return (
		<button
			onClick={() => {
				setGlobalLoading(true);

				window.location.href = getOauthSteamLink();
			}}
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

const UserBadge = ({
	className,
	user,
}: {
	className?: string;
	user: UserType;
}) => {
	const router = useRouter();

	const setIsOpenReplenishmentModal = useSetAtom(_isOpenReplenishmentModal_);
	const setIsMobileMenuOpen = useSetAtom(_isMobileMenuOpen_);

	return (
		<div className={clsx("flex items-center gap-4", className)}>
			<Image
				onClick={() => {
					setIsMobileMenuOpen(false);
					router.push("/personal-account/inventory");
				}}
				quality={100}
				width={44}
				height={44}
				className="cursor-pointer rounded-md overflow-hidden object-cover aspect-square"
				src={user?.avatar_url || "/images/user-avatar.png"}
				alt=""
			/>

			<div className="leading-[16px] flex flex-col">
				<span className="font-bold">{user.username}</span>
				<span className="font-bold text-secondary-text text-[11px]">
					Balance:{" "}
					<span className="text-accent-purple">
						{user.currency_symbol}
						{user.balance}
					</span>
				</span>
			</div>

			<button
				onClick={() => setIsOpenReplenishmentModal(true)}
				className="flex-middle w-7 h-7 rounded-md border-accent-purple border bg-accent-purple/20 hover:bg-accent-purple"
			>
				<img className="w-2.5" src="/icons/faq-plus.png" alt="" />
			</button>
		</div>
	);
};

const CartButton = ({ className }: { className?: string }) => {
	const [isOpenCart, setIsOpenCart] = useState(false);

	const setIsMobileMenuOpen = useSetAtom(_isMobileMenuOpen_);

	const cartRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(cartRef as RefObject<HTMLDivElement>, () =>
		setIsOpenCart(false)
	);

	useEffect(() => {
		if (!isOpenCart) return;

		let lastScrollTop =
			window.pageYOffset || document.documentElement.scrollTop;

		const handleScroll = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			if (scrollTop > lastScrollTop + 10) {
				setIsOpenCart(false);
			}

			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isOpenCart]);

	return (
		<div className={clsx("relative", className)} ref={cartRef}>
			<button
				onClick={() => {
					setIsMobileMenuOpen(false);
					setIsOpenCart(!isOpenCart);
				}}
				className="flex gap-4 items-center rounded-md bg-secondary-background px-4 py-[13px] hover:brightness-125 max-xs:gap-3 max-xs:px-3.5 max-xs:py-2.5"
			>
				<img src="/icons/cart.png" alt="" />

				<span className="font-semibold max-xs:hidden">
					BASKET{" "}
					<span className="text-accent-purple font-bold">(50)</span>
				</span>

				<span className="font-bold text-accent-purple hidden max-xs:block">
					50
				</span>
			</button>

			<AnimatePresence>
				{isOpenCart && (
					<motion.div
						initial={{ opacity: 0, scale: 1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden absolute top-full mt-2 py-[18px] w-[690px] right-0 max-sm:-right-[52px] max-sm:w-[340px] bg-secondary-background rounded-md pl-5 pr-7 z-50 max-sm:px-5 max-sm:py-4"
					>
						<div className="raise-up flex gap-7 items-start overflow-hidden max-sm:flex-col-reverse max-sm:gap-4">
							<div className="flex flex-col gap-2.5 w-full h-[266px] overflow-y-auto hide-scrollbar max-sm:gap-2">
								{[...new Array(30)].map((_, index) => (
									<div
										key={index}
										className="bg-[#1d2433] flex items-center gap-6 pl-5 pr-[30px] rounded-md min-h-[82px] max-sm:pl-4 max-sm:pr-4"
									>
										<img
											className="shrink-0 max-sm:w-12"
											src="/images/knife.png"
											alt=""
										/>

										<div className="leading-[16px] flex flex-col items-start">
											<span className="font-bold max-sm:text-[13px]">
												Jacker Stone | Londer Brow
											</span>

											<span className="text-secondary-text text-[11px] font-medium max-sm:text-[10px]">
												MW • 0.65498704
											</span>

											<span className="text-accent-purple text-[15px] font-bold mt-1 max-sm:text-[14px] max-sm:mt-0.5">
												$900
											</span>
										</div>

										<button className="ml-auto bg-secondary-background rounded-md flex-middle w-7 h-7 hover:brightness-125 shrink-0">
											<img src="/icons/x.png" alt="" />
										</button>
									</div>
								))}
							</div>

							<div className="w-[198px] shrink-0 flex flex-col gap-5 max-sm:w-full max-sm:gap-3.5">
								<h6 className="uppercase text-[16px] font-bold">
									Total
								</h6>

								<div className="flex gap-[3px] flex-col">
									{[...new Array(2)].map((_, index) => (
										<div
											key={index}
											className="rounded-md text-[13px] pl-5 pr-4 font-bold flex items-center justify-between h-10 w-full bg-primary-background"
										>
											<span>
												{index === 0
													? "Items"
													: "Total amount"}
											</span>

											<span
												className={clsx(
													index !== 0 &&
														"text-accent-purple"
												)}
											>
												{index === 0 ? 50 : "$1.390"}
											</span>
										</div>
									))}
								</div>

								<p className="text-[11px] leading-[15px] text-secondary-text">
									By buying skins, I agree with the{" "}
									<a
										href="#"
										target="_blank"
										className="text-primary-link hover:brightness-125"
									>
										policy of confidentiality
									</a>
								</p>

								<button className="uppercase w-full font-bold text-[18px] py-4 leading-[16px] rounded-md border-accent-purple border bg-accent-purple/20 hover:bg-accent-purple">
									Buy
								</button>

								<div className="-mt-1 flex-middle">
									<button className="text-[#576176] text-[11px] leading-[15px] font-bold hover:brightness-125">
										Empty the shopping cart
									</button>
								</div>
							</div>
						</div>

						<img
							className="absolute top-0 left-0 w-2/3 bottom-0 z-[1] pointer-events-none max-sm:top-[unset] max-sm:w-full"
							src="/images/decorations/cart-shadow.png"
							alt=""
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(_isMobileMenuOpen_);

	const user = useAtomValue(_user_);

	const setDisableBodyScroll = useSetAtom(_disableBodyScroll_);

	useEffect(() => {
		setDisableBodyScroll(isMobileMenuOpen);

		const handleResize = () => {
			if (window.innerWidth > 1520 && isMobileMenuOpen) {
				setTimeout(() => setIsMobileMenuOpen(false), 200);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isMobileMenuOpen, setDisableBodyScroll]);

	return (
		<div className="relative">
			<header className="z-[100] relative px-5 bg-primary-background border-b border-primary-border flex items-center h-[74px] max-sm:h-16 max-xl:justify-between">
				<Logo />

				<SearchBar className="ml-[84px] max-xl:hidden" />

				<Navigation className="h-full mx-7 max-xl:hidden" />

				{user && (
					<CartButton className="hidden max-xl:flex ml-auto mr-5" />
				)}

				<div className="max-xl:hidden ml-auto">
					{user ? (
						<div className="flex items-center gap-4">
							<CartButton />

							<UserBadge user={user} />
						</div>
					) : (
						<SteamAuthButton />
					)}
				</div>

				<div
					className="hidden max-xl:flex flex-col gap-1 cursor-pointer"
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
					"z-[100] border-b border-primary-border absolute top-[74px] max-sm:top-16 left-0 w-full bg-primary-background transform origin-top",
					isMobileMenuOpen
						? "scale-y-100 opacity-100"
						: "scale-y-0 opacity-0 pointer-events-none"
				)}
			>
				<div className="p-5">
					<SearchBar className="!max-w-full" />

					<Navigation className="my-5 flex flex-col gap-5" />

					{user ? <UserBadge user={user} /> : <SteamAuthButton />}
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
