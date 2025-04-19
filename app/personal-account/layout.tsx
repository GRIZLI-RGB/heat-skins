"use client";

import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	_globalLoading_,
	_isOpenReplenishmentModal_,
	_user_,
} from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { editProfile } from "@/lib/api";
import Image from "next/image";

export default function PersonalAccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const user = useAtomValue(_user_);
	const setIsOpenReplenishmentModal = useSetAtom(_isOpenReplenishmentModal_);
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [isEmailEditing, setIsEmailEditing] = useState(false);
	const [newEmail, setNewEmail] = useState("No email");

	const [newTradeUrl, setNewTradeUrl] = useState("");

	const handleSaveNewEmail = () => {
		setGlobalLoading(true);

		editProfile({
			email: newEmail,
		}).finally(() => setGlobalLoading(false));

		setIsEmailEditing(false);
	};

	const handleCancelNewEmail = () => {
		setNewEmail(user?.email || "No email");
		setIsEmailEditing(false);
	};

	const handleSaveNewTradeUrl = () => {
		setGlobalLoading(true);

		editProfile({
			trade_url: newTradeUrl,
		}).finally(() => setGlobalLoading(false));
	};

	useEffect(() => {
		if (user) {
			setNewEmail(user.email || "No email");
			setNewTradeUrl(user.steam_trade_url || "");
		}
	}, [user]);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setGlobalLoading(true);

		editProfile({
			avatar: file,
		}).finally(() => setGlobalLoading(false));
	};

	if (user) {
		return (
			<div className="max-w-[1240px] px-5 mx-auto py-11 max-md:py-8 flex flex-col gap-3">
				<div className="flex gap-3 max-md:flex-col">
					<div className="bg-primary-background rounded-md grow p-6 pr-5 gap-5 flex items-center max-sm:gap-4 max-sm:p-4 max-xs:flex-col">
						<div className="relative group">
							<Image
								width={96}
								height={96}
								className={`
      block max-sm:h-20 object-cover min-w-[96px] rounded-[8px] 
      cursor-pointer transition-all duration-300
      group-hover:opacity-80 group-hover:ring-2 group-hover:ring-primary-500
    `}
								src={
									user?.avatar_url ||
									"/images/big-user-avatar.png"
								}
								alt="User avatar"
								onClick={handleAvatarClick}
							/>

							<div
								className="
    absolute inset-0 flex items-center justify-center
    opacity-0 group-hover:opacity-100 transition-opacity duration-300
    pointer-events-none
  "
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="text-white drop-shadow-md"
								>
									<path
										d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
										fill="currentColor"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
										fill="currentColor"
									/>
								</svg>
							</div>

							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
								accept="image/*"
								className="hidden"
							/>
						</div>

						<div className="flex flex-col leading-[20px] font-semibold w-full max-xs:items-center">
							<span>{user.username}</span>

							<div className="flex items-center gap-2 -mt-0.5">
								{isEmailEditing ? (
									<>
										<input
											type="email"
											className="rounded-md text-[13px] px-2 py-0.5 mt-1.5 border"
											value={newEmail}
											onChange={(e) =>
												setNewEmail(e.target.value)
											}
										/>
										<button
											className="pt-1 text-green-500 text-[13px] font-medium"
											onClick={handleSaveNewEmail}
										>
											Save
										</button>
										<button
											className="pt-1 text-red-500 text-[13px] font-medium"
											onClick={handleCancelNewEmail}
										>
											Cancel
										</button>
									</>
								) : (
									<>
										<span className="text-[13px] text-[#b1b7c5]">
											{newEmail}
										</span>

										<img
											src="/icons/pen.png"
											className="cursor-pointer hover:brightness-125"
											alt="Редактировать"
											onClick={() =>
												setIsEmailEditing(true)
											}
										/>
									</>
								)}
							</div>

							<div className="max-xs:w-full h-[52px] max-xs:gap-1.5 px-[18px] flex items-center justify-between mt-3 bg-[#11151e] rounded-md border border-primary-border gap-2">
								<div className="flex flex-col max-xs:truncate w-full">
									<span className="text-[#4a546a] text-[11px] font-bold">
										Trade URL{" "}
										<a
											target="_blank"
											href="https://steamcommunity.com/sharedfiles/filedetails/?id=1135133789"
											rel="noreferrer"
											className="text-accent-purple hover:brightness-125"
										>
											learn ›
										</a>
									</span>

									<input
										value={newTradeUrl}
										onChange={(e) =>
											setNewTradeUrl(e.target.value)
										}
										type="text"
										className="w-full text-[#b1b7c5] text-[13px] font-semibold -mt-1 max-xs:truncate"
										placeholder="https://steamcommunity.com/tradeoffer/new/?partner=431495871&token=n-M9g5yh"
									/>
								</div>

								<img
									onClick={handleSaveNewTradeUrl}
									src={"/icons/checkmark.png"}
									className={clsx(
										"hover:brightness-125 cursor-pointer max-sm:h-2.5",
										((user.steam_trade_url || "") ===
											newTradeUrl ||
											!newTradeUrl.startsWith(
												"https://steamcommunity.com/tradeoffer/new"
											) ||
											!(
												newTradeUrl.includes("token") &&
												newTradeUrl.includes("partner")
											)) &&
											"pointer-events-none brightness-50"
									)}
									alt=""
								/>
							</div>
						</div>
					</div>

					<div className="bg-primary-background rounded-md w-[330px] max-md:w-full shrink-0 relative overflow-hidden px-7 py-6">
						<div className="raise-up leading-[19px] flex flex-col items-start">
							<span className="text-[13px] font-semibold">
								Balance
							</span>
							<span className="text-[21px] font-bold text-accent-purple pt-1 pb-4">
								{user.currency_symbol} {user.balance}
							</span>
							<button
								onClick={() =>
									setIsOpenReplenishmentModal(true)
								}
								className="leading-[100%] uppercase font-bold bg-accent-purple/20 border text-[18px] border-accent-purple hover:bg-accent-purple rounded-md h-[50px] px-12"
							>
								REPLENISH
							</button>
						</div>

						<img
							className="pointer-events-none bottom-0 right-0 absolute"
							src="/images/decorations/balance.png"
							alt=""
						/>
					</div>
				</div>

				<div className="flex gap-3 max-lg:flex-col">
					<div className="flex flex-col gap-3 w-[250px] shrink-0 max-lg:w-full">
						<div className="bg-primary-background rounded-md py-3">
							{[
								"Inventory",
								"Transactions",
								"Purchases",
								"Referrals",
							].map((item) => (
								<Link
									href={`/personal-account/${item.toLowerCase()}`}
									key={item}
									className={clsx(
										"h-[46px] w-full flex gap-[15px] font-semibold items-center px-8 relative",
										pathname ===
											`/personal-account/${item.toLowerCase()}`
											? "after:bg-accent-purple after:w-[3px] after:h-full after:absolute after:left-0"
											: "hover:bg-accent-purple/5"
									)}
								>
									<img
										className={clsx(
											"raise-up",
											pathname ===
												`/personal-account/${item.toLowerCase()}` &&
												"filter-to-accent-purple"
										)}
										src={`/icons/personal-account-menu/${item.toLowerCase()}.png`}
										alt=""
									/>

									<span className="raise-up">{item}</span>

									{pathname ===
										`/personal-account/${item.toLowerCase()}` && (
										<img
											className="absolute top-0 bottom-0 h-full left-0 max-lg:w-full"
											alt=""
											src="/images/decorations/personal-account-menu-shadow.png"
										/>
									)}
								</Link>
							))}
						</div>

						<div className="bg-primary-background rounded-md relative py-5 px-6">
							<h6 className="uppercase text-[15px] font-bold">
								Referral link
							</h6>

							<div className="mt-4 mb-5 flex gap-1.5">
								{[
									{
										label: "Percent",
										value: "73%",
									},
									{
										label: "Referrals",
										value: "560",
									},
								].map(({ label, value }) => (
									<div
										className="leading-[20px] rounded-md bg-[#171c29] flex flex-col items-center w-full h-[82px] justify-center"
										key={label}
									>
										<span className="text-[22px] text-accent-purple font-bold">
											{value}
										</span>

										<span className="text-[13px] font-semibold">
											{label}
										</span>
									</div>
								))}
							</div>

							<div className="mt-7 mb-4 flex flex-col items-center leading-[22px] font-bold">
								<span className="text-[#b1b7c5] text-[13px]">
									You{"'"}ve earned it
								</span>
								<span className="text-accent-purple text-[17px]">
									$ 900
								</span>
							</div>

							<button className="rounded-md uppercase font-bold w-full text-center h-12 text-[17px] leading-[100%] bg-accent-purple hover:brightness-125">
								Bring out
							</button>
						</div>
					</div>

					<div className="grow">{children}</div>
				</div>
			</div>
		);
	}
}
