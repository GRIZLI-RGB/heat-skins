"use client";

import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { _isOpenReplenishmentModal_, _user_ } from "@/lib/store";

export default function PersonalAccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const user = useAtomValue(_user_);
	const setIsOpenReplenishmentModal = useSetAtom(_isOpenReplenishmentModal_);

	if (user) {
		return (
			<div className="max-w-[1240px] px-5 mx-auto py-11 max-md:py-8 flex flex-col gap-3">
				<div className="flex gap-3 max-md:flex-col">
					<div className="bg-primary-background rounded-md grow p-6 pr-5 gap-5 flex items-center max-sm:gap-4 max-sm:p-4 max-xs:flex-col">
						<img
							className="max-sm:h-20"
							src="/images/big-user-avatar.png"
							alt=""
						/>

						<div className="flex flex-col leading-[20px] font-semibold w-full max-xs:items-center">
							<span>John Trevor</span>

							<div className="flex items-center gap-2 -mt-0.5">
								<span className="text-[13px] text-[#b1b7c5]">
									ostin4444@gmail.com
								</span>

								<img
									src="/icons/pen.png"
									className="cursor-pointer hover:brightness-125"
									alt=""
								/>
							</div>

							<div className="max-xs:w-full h-[52px] max-xs:gap-1.5 px-[18px] flex items-center justify-between mt-3 bg-[#11151e] rounded-md border border-primary-border">
								<div className="flex flex-col max-xs:truncate">
									<span className="text-[#4a546a] text-[11px] font-bold">
										Trade URL{" "}
										<a
											href="#"
											className="text-accent-purple hover:brightness-125"
										>
											learn ›
										</a>
									</span>

									<span className="text-[#b1b7c5] text-[13px] font-semibold -mt-1 max-xs:truncate">
										https://steamcommunity.com/market/listings
									</span>
								</div>

								<img
									src="/icons/checkmark.png"
									className="hover:brightness-125 cursor-pointer max-sm:h-2.5"
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
