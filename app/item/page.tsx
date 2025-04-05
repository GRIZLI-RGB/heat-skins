"use client";

import clsx from "clsx";
import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect, useRef } from "react";

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
}: {
	className?: string;
	labels?: boolean;
}) => {
	return (
		<div className={clsx(className)}>
			{labels && (
				<div className="mb-0.5 text-[11px] font-medium flex items-center justify-between">
					<span className="text-[#b1b7c5]">FN</span>

					<span>0.93675063</span>
				</div>
			)}

			<div className="flex relative">
				{[
					{
						percent: "15%",
						color: "#3f95e2",
					},
					{
						percent: "21%",
						color: "#3be07a",
					},
					{
						percent: "23%",
						color: "#facf33",
					},
					{
						percent: "23%",
						color: "#fa9d40",
					},
					{
						percent: "18%",
						color: "#ff4b4c",
					},
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
					className="brightness-[1000%] absolute -top-2 left-[58%]"
					src="/icons/arrow-down.png"
					alt=""
				/>
			</div>
		</div>
	);
};

export default function ItemPage() {
	const keyRingsRef = useRef(null);

	useEffect(() => {
		if (keyRingsRef.current) {
			OverlayScrollbars(
				{ target: keyRingsRef.current },
				{
					scrollbars: { autoHide: "never",  },

					overflow: {
						x: "scroll",
					},
				}
			);
		}
	}, []);

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
								{
									label: "Float",
									value: "0.93675063",
								},
								{ label: "Type", value: "Knife" },
								{ label: "Rarity", value: "Secret" },
							].map(({ label, value }, index) => (
								<div
									key={index}
									className="flex items-center justify-between font-semibold text-[13px] border-b border-[#1b212e] py-[15px] last:border-b-0"
								>
									<span className="text-[#b1b7c5]">
										{label}
									</span>

									{index === 0 && (
										<FloatBar className="mx-7 w-full" />
									)}

									<span>{value}</span>
								</div>
							))}
						</div>
					</div>

					<div className="bg-primary-background rounded-md pl-7 pt-5 pb-4 relative max-sm:px-5 max-sm:pt-4">
						<BlockTitle className="mb-4">
							Key rings and stickers{" "}
							<span className="text-[#9298a4]">(54)</span>
						</BlockTitle>

						<div ref={keyRingsRef} className="pb-6">
							<div className="flex gap-5">
								{[...new Array(20)].map((_, index) => (
									<div
										key={index}
										className="flex-middle w-[104px] min-w-[104px] h-[104px] bg-[#171c29] rounded-md"
									>
										<img
											src="/images/big-keychain.png"
											alt=""
										/>
									</div>
								))}
							</div>
						</div>

						<img
							src="/images/decorations/key-rings-shadow.png"
							alt=""
							className="absolute right-0 top-0 bottom-0 pointer-events-none max-xs:w-[32%] h-full"
						/>
					</div>
				</div>

				<div className="max-lg:w-full overflow-hidden bg-primary-background rounded-t-md shrink-0 w-[575px] border-b-[3px] border-[#f82740] px-5 pb-4 pt-6 relative max-xs:px-4 max-xs:pb-4 max-xs:pt-5">
					<div className="raise-up">
						<div className="mb-7 flex items-center justify-between">
							<div className="leading-[20px] font-semibold flex flex-col">
								<span className="text-[18px] max-xs:text-[16px]">
									AWP Dragon Lore
								</span>

								<span className="text-[#b1b7c5] text-[14px] max-xs:text-[12px]">
									Factory New
								</span>
							</div>

							<div className="flex items-center gap-3 max-xs:gap-2">
								<button className="bg-[#191f2d] hover:brightness-125 max-xs:w-10 max-xs:p-0 max-xs:flex-middle rounded-md flex gap-3 items-center pl-4 pr-[18px] h-10 text-[13px] font-medium">
									<img src="/icons/eye.png" alt="" />

									<span className="max-xs:hidden">Inspect in game</span>
								</button>

								<button className="w-10 h-10 flex-middle bg-[#191f2d] hover:brightness-125 rounded-md">
									<img src="/icons/camera.png" alt="" />
								</button>
							</div>
						</div>

						<img
							className="mx-auto max-md:max-h-[140px]"
							src="/images/big-knife.png"
							alt=""
						/>

						<div className="font-bold text-[22px] max-xs:text-[20px]">
							$ 9.870{" "}
							<span className="text-[#bbe511] text-[13px]">
								(-30%)
							</span>
						</div>

						<div className="mt-3.5 flex gap-5 relative max-xs:flex-col max-xs:gap-2 max-xs:mt-3">
							<div className="flex flex-col gap-6 absolute right-0 -top-5 -translate-y-full items-center grayscale-50 max-xs:gap-4">
								{["vk", "twitter", "discord", "steam"].map(
									(social) => (
										<a
											className="group"
											href="#"
											key={social}
										>
											<img
												className="group-hover:brightness-[1000%]"
												src={`/icons/social/${social}.png`}
												alt=""
											/>
										</a>
									)
								)}
							</div>

							<button className="max-xs:text-[14px] max-xs:h-12 text-[16px] leading-[100%] w-full h-[56px] uppercase rounded-md border border-accent-purple font-semibold flex-middle gap-2.5 bg-accent-purple hover:brightness-125">
								<img
									className="brightness-[1000%] pb-0.5 pointer-events-none"
									src="/icons/cart-big.png"
									alt=""
								/>

								<span>Add to cart</span>
							</button>

							<button className="max-xs:text-[14px] max-xs:h-12 text-[16px] leading-[100%] w-full h-[56px] uppercase rounded-md border border-accent-purple font-semibold flex-middle bg-accent-purple/20 hover:bg-accent-purple">
								Buy now
							</button>
						</div>
					</div>

					<img
						className="absolute bottom-0 left-0 right-0 w-full"
						src="/images/decorations/item-shadow.png"
						alt=""
					/>
				</div>
			</div>

			<div className="bg-primary-background rounded-md p-6 max-lg:p-5">
				<BlockTitle className="mb-6">74 offers</BlockTitle>

				<div className="flex flex-col gap-2.5 max-lg:gap-2">
					{[...new Array(3)].map((_, index) => (
						<div
							key={index}
							className="bg-[#171c29] rounded-md h-16 flex items-center pl-7 pr-2.5 max-lg:pl-4 max-md:flex-col max-md:h-auto max-md:!p-4 max-md:items-center max-md:text-center max-md:gap-2.5"
						>
							<span
								className={clsx(
									"font-bold text-[13px] w-[80px]",
									index === 2
										? "text-[#ee314c]"
										: "text-[#8cce37]"
								)}
							>
								{index === 2 ? "BLOCKED" : "UNBLOCKED"}
							</span>

							<FloatBar className="mx-9 min-w-[245px]" labels />

							<div className="flex gap-2.5 max-lg:gap-1">
								{[...new Array(5)].map((_, i) => (
									<div
										key={i}
										className="flex-middle rounded-md w-[46px] h-[46px] bg-primary-background"
									>
										<img
											src="/images/keychain.png"
											alt=""
										/>
									</div>
								))}
							</div>

							<span className="text-[16px] ml-auto font-bold max-lg:text-[14px] max-md:ml-0 max-md:!text-[16px]">
								$ 7.530
							</span>

							<button className="max-md:mx-0 ml-8 mr-2.5 flex-middle h-[46px] w-[46px] bg-accent-purple rounded-md hover:brightness-125">
								<img
									className="brightness-[1000%] p-3.5"
									src="/icons/cart.png"
									alt=""
								/>
							</button>

							<button className="max-md:w-full h-[46px] flex-middle font-semibold uppercase border rounded-md border-accent-purple bg-accent-purple/20 px-7 leading-[100%] hover:bg-accent-purple">
								Buy now
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
