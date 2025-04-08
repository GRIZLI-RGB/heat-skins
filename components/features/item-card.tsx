"use client";

import clsx from "clsx";
import { useState } from "react";

export default function ItemCard() {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			className={clsx(
				"relative bg-primary-background p-[14px]",
				hovered ? "rounded-t-md" : "rounded-md"
			)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="absolute flex flex-col top-3 right-2.5 gap-2.5">
				<img src="/images/collections/1.png" alt="" />
				<img src="/images/collections/2.png" alt="" />
				<img src="/images/collections/3.png" alt="" />
			</div>

			<span className="text-[15px] font-semibold">$299.17</span>

			<img
				className="mx-auto my-5"
				src="/images/gradient-knife.png"
				alt=""
			/>

			<div className="flex flex-col text-[12px]">
				<span className="font-semibold text-[#f19f63]">
					★ Hand Wraps Dragonic
				</span>

				<span className="font-medium text-secondary-text -mt-0.5">
					Constrictor
				</span>

				<span className="text-[#a4aab6] mt-1">MW / 0.87902041</span>
			</div>

			<img
				className={clsx(
					"absolute left-0 top-0 bottom-0 right-0",
					hovered ? "opacity-100" : "opacity-0"
				)}
				alt=""
				src="/images/decorations/item-card-hovered-shadow.png"
			/>

			<button
				className={clsx(
					"hover:brightness-125 absolute bottom-0 left-0 right-0 z-[2] h-[42px] rounded-b-md translate-y-full flex items-center justify-center gap-1.5 bg-[#121c21] border border-[#154030]",
					hovered ? "opacity-100" : "opacity-0 pointer-events-none"
				)}
			>
				<img src="/icons/add.png" alt="" />

				<span className="uppercase font-semibold text-[12px]">
					Add to cart
				</span>
			</button>
		</div>
	);
}
