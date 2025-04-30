"use client";

import clsx from "clsx";
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";

import { ItemType } from "@/lib/types";
import { _cartItemsIds_, _user_ } from "@/lib/store";

export default function ItemCard({ item }: { item: ItemType }) {
	const [hovered, setHovered] = useState(false);

	const [cartItemsIds, setCartItemsIds] = useAtom(_cartItemsIds_);
	const isInCart = cartItemsIds.includes(item.id);

	const toggleCart = () => {
		const updatedCart = isInCart
			? cartItemsIds.filter((id) => id !== item.id)
			: [...cartItemsIds, item.id];

		setCartItemsIds(updatedCart);
	};

	const user = useAtomValue(_user_);

	return (
		<div
			onClick={() => (window.location.href = `/item/${item.id}`)}
			className={clsx(
				"cursor-pointer relative bg-primary-background p-[14px] w-[168px]",
				hovered ? "rounded-t-md" : "rounded-md"
			)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{item.stickers.length > 0 && (
				<div className="raise-up absolute flex flex-col top-3 right-2.5 gap-2.5">
					{item.stickers.map((sticker, index) => (
						<img
							className="h-5"
							key={`${sticker.id}-${index}`}
							src={sticker.img}
							alt={sticker.name}
						/>
					))}
				</div>
			)}

			<span className="raise-up text-[15px] font-semibold">
				{item.currency_symbol}
				{item.price}
			</span>

			<img className="mx-auto my-5 raise-up" src={item.img} alt="" />

			<div className="flex flex-col text-[12px] raise-up">
				<span className="font-semibold text-[#f19f63]">
					{item.market_hash_name || "★ Hand Wraps Dragonic"}
				</span>

				<span className="font-medium text-secondary-text -mt-0.5">
					{item.type}
				</span>

				{item.wear_short_name && (
					<span className="text-[#a4aab6] mt-1">
						{item.wear_short_name} / {item.float || "-"}
					</span>
				)}
			</div>

			{/* <img
				className={clsx(
					"absolute left-0 top-0 bottom-0 right-0",
					hovered ? "opacity-100" : "opacity-0"
				)}
				alt=""
				src="/images/decorations/item-card-hovered-shadow.png"
			/> */}
			<div
				style={{
					background: `linear-gradient(to top, ${item.rarity_gradient.from}, ${item.rarity_gradient.via}, ${item.rarity_gradient.to})`,
				}}
				className={clsx(
					"rounded-md absolute left-0 top-0 bottom-0 right-0",
					hovered ? "opacity-50" : "opacity-0"
				)}
			/>

			{user && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						toggleCart();
					}}
					className={clsx(
						"hover:brightness-125 absolute bottom-0 left-0 right-0 z-[2] h-[42px] rounded-b-md translate-y-full flex items-center justify-center gap-1.5 bg-[#121c21] border border-[#154030]",
						hovered
							? "opacity-100"
							: "opacity-0 pointer-events-none"
					)}
				>
					{!isInCart && <img src={`/icons/add.png`} alt="" />}
					<span className="uppercase font-semibold text-[12px]">
						{isInCart ? "Remove from cart" : "Add to cart"}
					</span>
				</button>
			)}
		</div>
	);
}
