"use client";

import DesiredItemDropdown from "@/components/features/desired-item-dropdown";
import FilterDropdown from "@/components/features/filter-dropdown";
import ItemCard from "@/components/features/item-card";
import clsx from "clsx";
import { useState } from "react";

export default function HomePage() {
	const [filterTab, setFilterTab] = useState<"cs2" | "dota2">("cs2");

	return (
		<>
			<section className="flex gap-2.5 border-b border-[#1b212e] p-[18px] max-lg:gap-1 max-lg:flex-wrap max-xs:grid max-xs:grid-cols-1">
				{[
					"Knife",
					"Gun",
					"Rifle",
					"AWP",
					"Submachine",
					"Shotgun",
					"Machinegun",
					"Gloves",
					"Sticker",
					"Other",
				].map((item) => (
					<DesiredItemDropdown
						className="max-lg:max-w-[200px] max-xs:!max-w-none"
						text={item}
						key={item}
						options={[
							{
								id: "1",
								name: "Karambit",
								image: "/images/knife.png",
							},
							{
								id: "2",
								name: "Knife",
								image: "/images/knife.png",
							},
						]}
						onSelect={(option) => console.log("Selected:", option)}
					/>
				))}
			</section>

			<div className="flex items-start max-sm:flex-col">
				<section className="border-r max-sm:border-r-0 max-sm:w-full border-[#1b212e] p-[18px] pb-[90px] max-sm:pb-0 w-[274px] shrink-0">
					<div className="flex w-full">
						{["cs2", "dota2"].map((tab) => (
							<button
								className={clsx(
									"relative h-12 flex items-center gap-3 border w-full px-[18px] bg-[#11151e] overflow-hidden",
									tab === filterTab
										? "border-accent-purple z-[5] rounded-md"
										: "border-primary-border",
									tab === "cs2" &&
										filterTab !== "cs2" &&
										"rounded-l-md",
									tab === "dota2" &&
										filterTab !== "dota2" &&
										"rounded-r-md",
									tab === "cs2" && "-mr-0.5",
									tab === "dota2" && "-ml-0.5"
								)}
								key={tab}
								onClick={() =>
									setFilterTab(tab as "cs2" | "dota2")
								}
							>
								<img
									className={clsx(
										"!transition-none",
										tab === filterTab &&
											"filter-to-accent-purple"
									)}
									src={`/icons/${tab}.png`}
									alt=""
								/>

								<span className="text-[13px] font-semibold">
									{
										{
											cs2: "CS2",
											dota2: "DOTA 2",
										}[tab]
									}
								</span>

								<img
									className={clsx(
										"absolute top-0 left-0 bottom-0 h-full",
										tab === filterTab
											? "opacity-100"
											: "opacity-0"
									)}
									src="/images/decorations/tab-shadow.png"
									alt=""
								/>
							</button>
						))}
					</div>

					<div className="my-[18px] flex items-center justify-between gap-2">
						<div className="flex gap-3 items-center">
							<img src="/icons/settings.png" alt="" />
							<span className=" font-bold">FILTERS</span>
						</div>

						<button className="text-[#959dae] font-medium hover:brightness-125">
							Reset
						</button>
					</div>

					<div className="flex flex-col gap-1">
						{[
							"type",
							"price",
							"float",
							"quality",
							"phase",
							"hold",
							"stickers",
							"rarity",
							"other",
						].map((variant) => (
							<FilterDropdown key={variant} variant={variant} />
						))}
					</div>
				</section>

				<section className="w-full px-[18px] relative">
					<h3 className="flex items-center gap-3 py-8 pl-[14px]">
						<img src="/images/cs2.png" alt="" />

						<span className="text-[18px] font-bold">
							Counter strike 2
						</span>
					</h3>

					<div className="flex gap-3 flex-wrap max-h-[850px] overflow-scroll hide-scrollbar max-sm:grid max-sm:max-h-[600px] max-sm:gap-2 max-sm:grid-cols-2 max-[480px]:grid-cols-1">
						{[...new Array(1000)].map((_, index) => (
							<ItemCard key={index} />
						))}
					</div>

					<img
						className="absolute left-0 right-0 bottom-0 pointer-events-none"
						src="/images/decorations/items-shadow.png"
						alt=""
					/>
				</section>
			</div>
		</>
	);
}
