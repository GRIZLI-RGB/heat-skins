"use client";

import clsx from "clsx";
import { OverlayScrollbars } from "overlayscrollbars";
import { use, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { _cartItemsIds_, _globalLoading_, _user_ } from "@/lib/store";
import { getItem, getOauthSteamLink } from "@/lib/api";
import { ItemQualityType, ItemType, WearCategoryType } from "@/lib/types";
import { getItemGradient } from "@/lib/utils";

const BlockTitle = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h6
			className={clsx(
				"uppercase text-[16px] leading-[20px] font-bold",
				className
			)}
		>
			{children}
		</h6>
	);
};

const FloatBar = ({
	className,
	labels = false,
	offer,
}: {
	className?: string;
	labels?: boolean;
	offer: ItemType;
}) => {
	return (
		<div className={clsx(className)}>
			{labels && (
				<div className="mb-1 text-[11px] font-medium flex items-center justify-between">
					<span className="text-[#b1b7c5]">
						{offer.wear_short_name}
					</span>

					<span>{offer.float}</span>
				</div>
			)}

			<div className="flex relative">
				{[
					{ percent: "7%", color: "#3f95e2" }, // FN
					{ percent: "8%", color: "#3be07a" }, // MW
					{ percent: "23%", color: "#facf33" }, // FT
					{ percent: "7%", color: "#fa9d40" }, // WW
					{ percent: "55%", color: "#ff4b4c" }, // BS
				].map(({ percent, color }, index) => (
					<div
						className="h-[3px]"
						key={index}
						style={{
							width: percent,
							backgroundColor: color,
						}}
					/>
				))}

				<img
					className="brightness-[1000%] absolute -top-1.5 w-[6px]"
					style={{
						left: `${offer.float * 100}%`,
						transform: `translateX(-50%)`,
					}}
					src="/icons/arrow-down.png"
					alt=""
				/>
			</div>
		</div>
	);
};

export default function ItemPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const keyRingsRef = useRef(null);

	const { id } = use(params);

	const [offers, setOffers] = useState<{
		currency_symbol: string;
		offer: ItemType;
		requested_category: ItemQualityType;
		similar_offers: {
			data: ItemType[];
			total: number;
			current_page: number;
			per_page: number;
			to: number;
			from: number;
			last_page: number;
		};
		wear_categories: WearCategoryType[];
	} | null>(null);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const user = useAtomValue(_user_);

	useEffect(() => {
		if (keyRingsRef.current) {
			OverlayScrollbars(
				{ target: keyRingsRef.current },
				{
					scrollbars: { autoHide: "never" },

					overflow: {
						x: "scroll",
					},
				}
			);
		}

		getItem({ id })
			.then((res) => setOffers(res.data))
			.catch(() => (window.location.href = "/"))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getPriceChangePercentage = (oldPrice: string, newPrice: string) => {
		// Преобразуем в числа, заменяем запятые на точки (если нужно)
		const oldP =
			typeof oldPrice === "string"
				? parseFloat(oldPrice.replace(",", "."))
				: Number(oldPrice);
		const newP =
			typeof newPrice === "string"
				? parseFloat(newPrice.replace(",", "."))
				: Number(newPrice);

		// Проверяем, что оба числа валидны и oldPrice не нулевой
		if (isNaN(oldP) || isNaN(newP) || oldP === 0 || oldP === newP) {
			return null;
		}

		// Рассчитываем процентное изменение и округляем
		const percentage = Math.round(((newP - oldP) / oldP) * 100);

		// Защита от бесконечности и аномально больших значений
		if (!isFinite(percentage) || Math.abs(percentage) > 1000) {
			return null;
		}

		return percentage;
	};

	const handleBuyItem = (itemId: number) => {
		alert(itemId);
	};

	const [cartItemsIds, setCartItemsIds] = useAtom(_cartItemsIds_);

	const toggleCart = (itemId: number) => {
		const updatedCart = cartItemsIds.includes(itemId)
			? cartItemsIds.filter((id) => id !== itemId)
			: [...cartItemsIds, itemId];

		setCartItemsIds(updatedCart);
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [currentWearCategory, setCurrentWearCategory] = useState<
		ItemQualityType | undefined
	>(undefined);

	const containerRef = useRef(null);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const loadMoreItems = async () => {
		if (
			!offers ||
			isLoadingMore ||
			offers.similar_offers.current_page >=
				offers.similar_offers.last_page
		)
			return;

		setIsLoadingMore(true);

		try {
			const nextPage = currentPage + 1;
			const res = await getItem({
				id,
				wear_category: currentWearCategory,
				page: nextPage,
			});

			setOffers((prev) => ({
				...res.data,
				similar_offers: {
					...res.data.similar_offers,
					data: [
						...(prev?.similar_offers.data || []),
						...res.data.similar_offers.data,
					],
				},
			}));
			setCurrentPage(nextPage);
		} catch (error) {
			console.error("Ошибка загрузки:", error);
		} finally {
			setIsLoadingMore(false);
		}
	};

	// Обработчик скролла (срабатывает при прокрутке внутри OverlayScrollbars)
	useEffect(() => {
		// @ts-expect-error: "Old library"
		const osInstance = containerRef.current?.osInstance();
		if (!osInstance) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } =
				osInstance.elements().viewport;
			const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

			if (isNearBottom) {
				loadMoreItems();
			}
		};

		osInstance.elements().viewport.addEventListener("scroll", handleScroll);
		return () => {
			osInstance
				.elements()
				.viewport.removeEventListener("scroll", handleScroll);
		};
	}, [offers, isLoadingMore]);

	const updateItems = (wearCategory: WearCategoryType) => {
		setCurrentWearCategory(wearCategory.name);
		setCurrentPage(1);
		setGlobalLoading(true);

		getItem({
			id,
			wear_category: wearCategory.name,
			page: 1,
		})
			.then((res) => setOffers(res.data))
			.catch(() => (window.location.href = "/"))
			.finally(() => setGlobalLoading(false));
	};

	if (offers) {
		return (
			<div className="max-w-[1240px] px-5 mx-auto py-12 flex flex-col gap-3">
				<div className="flex gap-3 max-lg:flex-col-reverse">
					<div className="flex flex-col gap-3 w-full overflow-hidden">
						<div className="bg-primary-background rounded-md px-7 pt-6 pb-1 max-sm:px-5 max-sm:pt-4">
							<BlockTitle className="mb-2.5">
								Specifications
							</BlockTitle>

							<div>
								{[
									...(offers.offer.float
										? [
												{
													label: "Float",
													value: offers.offer.float,
												},
										  ]
										: []),
									{ label: "Type", value: offers.offer.type },
									{
										label: "Rarity",
										value: offers.offer.rarity,
									},
								].map(({ label, value }, index) => (
									<div
										key={index}
										className="flex items-center justify-between font-semibold text-[13px] border-b border-[#1b212e] py-[15px] last:border-b-0"
									>
										<span className="text-[#b1b7c5]">
											{label}
										</span>

										{offers.offer.float && index === 0 && (
											<FloatBar
												offer={offers.offer}
												className="mx-7 w-full"
											/>
										)}

										<span>{value}</span>
									</div>
								))}
							</div>
						</div>

						{offers.offer.stickers &&
							offers.offer.stickers.length > 0 && (
								<div className="bg-primary-background rounded-md pl-7 pt-5 pb-4 relative max-sm:px-5 max-sm:pt-4">
									<BlockTitle className="mb-4">
										Key rings and stickers{" "}
										<span className="text-[#9298a4]">
											({offers.offer.stickers.length})
										</span>
									</BlockTitle>

									<div ref={keyRingsRef} className="pb-6">
										<div className="flex gap-5">
											{offers.offer.stickers.map(
												(sticker) => (
													<div
														key={sticker.id}
														className="p-4 flex-middle w-[104px] min-w-[104px] h-[104px] bg-[#171c29] rounded-md"
													>
														<img
															src={sticker.img}
															alt=""
														/>
													</div>
												)
											)}
										</div>
									</div>

									<img
										src="/images/decorations/key-rings-shadow.png"
										alt=""
										className="absolute right-0 top-0 bottom-0 pointer-events-none max-xs:w-[32%] h-full"
									/>
								</div>
							)}
					</div>

					<div
						style={{
							borderColor: offers.offer.rarity_color,
						}}
						className="max-lg:w-full overflow-hidden bg-primary-background rounded-t-md shrink-0 w-[575px] border-b-[3px] px-5 pb-4 pt-6 relative max-xs:px-4 max-xs:pb-4 max-xs:pt-5"
					>
						<div className="raise-up">
							<div className="mb-7 flex items-center justify-between">
								<div className="leading-[20px] font-semibold flex flex-col">
									<span className="text-[18px] max-xs:text-[16px]">
										{offers.offer.market_hash_name}
									</span>

									<span className="text-[#b1b7c5] text-[14px] max-xs:text-[12px]">
										{offers.offer.wear}
									</span>
								</div>

								<div className="flex items-center gap-3 max-xs:gap-2">
									<button
										onClick={() =>
											window.open(
												offers.offer.screenshot,
												"_blank"
											)
										}
										className="w-10 h-10 flex-middle bg-[#191f2d] hover:brightness-125 rounded-md"
									>
										<img
											src="/icons/camera.png"
											alt="Preview"
										/>
									</button>
								</div>
							</div>

							<img
								className="mx-auto max-md:max-h-[140px] h-[140px]"
								src={offers.offer.img}
								alt=""
							/>

							<div className="font-bold text-[22px] max-xs:text-[20px]">
								{offers.offer.currency_symbol}{" "}
								{offers.offer.price}{" "}
								{(() => {
									const percentage = getPriceChangePercentage(
										offers.offer.old_price,
										offers.offer.price
									);

									if (percentage === null) return null;

									return (
										<span
											className={`text-[13px] ${
												percentage < 0
													? "text-[#bbe511]"
													: "text-red-500"
											}`}
										>
											({percentage > 0 ? "+" : ""}
											{percentage}%)
										</span>
									);
								})()}
							</div>

							<div className="mt-3.5 flex gap-5 relative max-xs:flex-col max-xs:gap-2 max-xs:mt-3">
								{user && (
									<button
										onClick={() =>
											toggleCart(offers.offer.id)
										}
										className="max-xs:text-[14px] max-xs:h-12 text-[16px] leading-[100%] w-full h-[56px] uppercase rounded-md border border-accent-purple font-semibold flex-middle gap-2.5 bg-accent-purple hover:brightness-125"
									>
										<img
											className="brightness-[1000%] pb-0.5 pointer-events-none"
											src="/icons/cart-big.png"
											alt=""
										/>

										<span>
											{cartItemsIds.includes(
												offers.offer.id
											)
												? "Remove from cart"
												: "Add to cart"}
										</span>
									</button>
								)}

								<button
									data-tooltip-hidden={
										user
											? +user.balance >=
											  +offers.offer.price
											: false
									}
									data-tooltip-id="default-tooltip"
									data-tooltip-content={
										user
											? "Not enough funds"
											: "Enter the account"
									}
									onClick={() => {
										if (!user) {
											setGlobalLoading(true);

											window.location.href =
												getOauthSteamLink();
										} else {
											if (
												+user.balance >=
												+offers.offer.price
											) {
												handleBuyItem(offers.offer.id);
											}
										}
									}}
									className={clsx(
										"max-xs:text-[14px] max-xs:h-12 text-[16px] leading-[100%] w-full h-[56px] uppercase rounded-md border border-accent-purple font-semibold flex-middle bg-accent-purple/20 ",
										!user ||
											+user.balance < +offers.offer.price
											? "opacity-50 !cursor-not-allowed"
											: "hover:bg-accent-purple"
									)}
								>
									Buy now
								</button>
							</div>
						</div>

						<div
							style={{
								background: `linear-gradient(to bottom, ${offers.offer.rarity_gradient.from}, ${offers.offer.rarity_gradient.via}, ${offers.offer.rarity_gradient.to})`,
							}}
							className="absolute opacity-50 bottom-0 top-0 left-0 right-0 w-full"
						/>
					</div>
				</div>

				{offers && (
					<div className="bg-primary-background rounded-md p-6 max-lg:p-5">
						<div className="flex items-center mb-6 max-sm:flex-col max-sm:gap-4">
							<BlockTitle className="whitespace-nowrap">
								{offers.similar_offers.total} offers
							</BlockTitle>

							{offers.wear_categories && offers.wear_categories.length > 0 && (
								<div className="flex flex-wrap gap-2 ml-4">
									{offers.wear_categories.map(
										(wearCategory) => {
											const { from, to } =
												getItemGradient(
													wearCategory.name as ItemQualityType
												);

											return (
												<button
													onClick={() =>
														updateItems(
															wearCategory
														)
													}
													key={wearCategory.order}
													className={clsx(
														"hover:opacity-80 inline-flex flex-col text-[12px]  rounded-md px-2.5 py-1.5 leading-[125%]",
														wearCategory.name ===
															offers.requested_category &&
															"outline outline-white"
													)}
													style={{
														backgroundImage: `linear-gradient(
														to top,
														${from},	
														${to}
													  )`,
													}}
												>
													<span className="font-semibold">
														{wearCategory.name}
													</span>
													<span>
														{wearCategory.count}{" "}
														offers from{" "}
														{user?.currency_symbol}
														{wearCategory.min_price}
													</span>
												</button>
											);
										}
									)}
								</div>
							)}
						</div>

						{/* <div className="flex flex-col gap-2.5 max-lg:gap-2">
							{offers.similar_offers.data.map((offer) => (
								<div
									key={offer.id}
									className="bg-[#171c29] rounded-md h-16 flex items-center pl-7 pr-2.5 max-lg:pl-4 max-md:flex-col max-md:h-auto max-md:!p-4 max-md:items-center max-md:text-center max-md:gap-2.5"
								>
									<span
										className={clsx(
											"font-bold text-[13px] w-[80px] mr-9 max-md:mr-0",
											offer.chance_to_transfer > 0
												? "text-[#8cce37]"
												: "text-[#ee314c]"
										)}
									>
										{offer.chance_to_transfer > 0
											? "UNBLOCKED"
											: "BLOCKED"}
									</span>

									{offer.float && (
										<FloatBar
											offer={offer}
											className="mr-9 min-w-[245px] max-md:mr-0 max-md:w-full"
											labels
										/>
									)}

									{offer.stickers && (
										<div className="flex gap-2.5 max-lg:gap-1">
											{offer.stickers.map((sticker) => (
												<div
													key={sticker.id}
													className="flex-middle rounded-md w-[46px] h-[46px] bg-primary-background p-1.5"
												>
													<img
														src={sticker.img}
														alt={sticker.name}
													/>
												</div>
											))}
										</div>
									)}

									<span className="mr-8 text-[16px] ml-auto font-bold max-lg:text-[14px] max-md:ml-0 max-md:!text-[16px] max-md:mr-0">
										{offer.currency_symbol} {offer.price}
									</span>

									{user && (
										<button
											onClick={() => toggleCart(offer.id)}
											className={clsx(
												"max-md:mx-0 mr-2.5 flex-middle h-[46px] w-[46px]  rounded-md hover:brightness-125",
												cartItemsIds.includes(offer.id)
													? "bg-accent-purple/50"
													: "bg-accent-purple"
											)}
										>
											<img
												className={
													"brightness-[1000%] p-3.5"
												}
												src="/icons/cart.png"
												alt=""
											/>
										</button>
									)}

									<button
										data-tooltip-hidden={
											user
												? +user.balance >= +offer.price
												: false
										}
										data-tooltip-id="default-tooltip"
										data-tooltip-content={
											user
												? "Not enough funds"
												: "Enter the account"
										}
										onClick={() => {
											if (
												user &&
												+user.balance >= +offer.price
											) {
												handleBuyItem(offer.id);
											}
										}}
										className={clsx(
											"max-md:w-full h-[46px] flex-middle font-semibold uppercase border rounded-md border-accent-purple bg-accent-purple/20 px-7 leading-[100%]",
											!user ||
												+user.balance < +offer.price
												? "opacity-50 !cursor-not-allowed"
												: "hover:bg-accent-purple"
										)}
									>
										Buy now
									</button>
								</div>
							))}
						</div> */}

						<div className="relative">
							<OverlayScrollbarsComponent
								ref={containerRef}
								className="max-h-[500px]"
								options={{
									scrollbars: {
										autoHide: "scroll",
										clickScroll: true,
									},
									overflow: { x: "hidden", y: "scroll" },
								}}
							>
								<div
									className="flex flex-col gap-2.5 max-lg:gap-2 pr-2"
									style={{
										boxShadow:
											offers?.similar_offers
												.current_page <
											offers?.similar_offers.last_page
												? "inset 0 -15px 20px -10px rgba(255, 255, 255, 0.15)"
												: "none",
									}}
								>
									{offers?.similar_offers.data.map(
										(offer) => (
											<div
												key={offer.id}
												className="bg-[#171c29] rounded-md h-16 flex items-center pl-7 pr-2.5 max-lg:pl-4 max-md:flex-col max-md:h-auto max-md:!p-4 max-md:items-center max-md:text-center max-md:gap-2.5"
											>
												<span
													className={clsx(
														"font-bold text-[13px] w-[80px] mr-9 max-md:mr-0",
														offer.chance_to_transfer >
															0
															? "text-[#8cce37]"
															: "text-[#ee314c]"
													)}
												>
													{offer.chance_to_transfer >
													0
														? "UNBLOCKED"
														: "BLOCKED"}
												</span>

												{offer.float && (
													<FloatBar
														offer={offer}
														className="mr-9 min-w-[245px] max-md:mr-0 max-md:w-full"
														labels
													/>
												)}

												{offer.stickers && (
													<div className="flex gap-2.5 max-lg:gap-1">
														{offer.stickers.map(
															(sticker) => (
																<div
																	key={
																		sticker.id
																	}
																	className="flex-middle rounded-md w-[46px] h-[46px] bg-primary-background p-1.5"
																>
																	<img
																		src={
																			sticker.img
																		}
																		alt={
																			sticker.name
																		}
																	/>
																</div>
															)
														)}
													</div>
												)}

												<span className="mr-8 text-[16px] ml-auto font-bold max-lg:text-[14px] max-md:ml-0 max-md:!text-[16px] max-md:mr-0">
													{offer.currency_symbol}{" "}
													{offer.price}
												</span>

												{user && (
													<button
														onClick={() =>
															toggleCart(offer.id)
														}
														className={clsx(
															"max-md:mx-0 mr-2.5 flex-middle h-[46px] w-[46px]  rounded-md hover:brightness-125",
															cartItemsIds.includes(
																offer.id
															)
																? "bg-accent-purple/50"
																: "bg-accent-purple"
														)}
													>
														<img
															className={
																"brightness-[1000%] p-3.5"
															}
															src="/icons/cart.png"
															alt=""
														/>
													</button>
												)}

												<button
													data-tooltip-hidden={
														user
															? +user.balance >=
															  +offer.price
															: false
													}
													data-tooltip-id="default-tooltip"
													data-tooltip-content={
														user
															? "Not enough funds"
															: "Enter the account"
													}
													onClick={() => {
														if (
															user &&
															+user.balance >=
																+offer.price
														) {
															handleBuyItem(
																offer.id
															);
														}
													}}
													className={clsx(
														"max-md:w-full h-[46px] flex-middle font-semibold uppercase border rounded-md border-accent-purple bg-accent-purple/20 px-7 leading-[100%]",
														!user ||
															+user.balance <
																+offer.price
															? "opacity-50 !cursor-not-allowed"
															: "hover:bg-accent-purple"
													)}
												>
													Buy now
												</button>
											</div>
										)
									)}

									{isLoadingMore && (
										<div className="flex justify-center py-4">
											Loading...
										</div>
									)}
								</div>
							</OverlayScrollbarsComponent>
						</div>
					</div>
				)}
			</div>
		);
	}
}
