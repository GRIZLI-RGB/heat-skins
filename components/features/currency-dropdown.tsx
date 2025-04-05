// import { RefObject, useRef, useState } from "react";
// import { useOnClickOutside } from "usehooks-ts";

// export default function CurrencyDropdown() {
// 	const [isOpenChooseCurrency, setIsOpenChooseCurrency] = useState(false);

// 	const chooseCurrencyRef = useRef<HTMLDivElement>(null);
// 	useOnClickOutside(chooseCurrencyRef as RefObject<HTMLDivElement>, () =>
// 		setIsOpenChooseCurrency(false)
// 	);

// 	return (
// 		<div>
// 			<label className="text-[#c8cede] text-[13px] block mb-2 font-semibold">
// 				Choose a currency
// 			</label>

// 			<div className="relative" ref={chooseCurrencyRef}>
// 				<button className="px-5 hover:brightness-125 pb-0.5 w-full flex items-center justify-between gap-2 border-t overflow-hidden border-primary-border bg-[#181d2a] rounded-md">
// 					<div className="flex items-center gap-2.5 font-bold text-[16px] h-[50px]">
// 						<img src="/icons/countries/ua.png" alt="" />
// 						<span>USD</span>
// 					</div>

// 					<img src="/icons/arrow-down.png" alt="" />
// 				</button>

// 				{isOpenChooseCurrency && <div></div>}
// 			</div>
// 		</div>
// 	);
// }

import { AnimatePresence, motion } from "motion/react";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

type Currency = {
	code: string;
	name: string;
	icon: string;
};

const currencies: Currency[] = [
	{ code: "USD", name: "US Dollar", icon: "/icons/countries/ua.png" },
	{ code: "EUR", name: "Euro", icon: "/icons/countries/ua.png" },
	{ code: "GBP", name: "British Pound", icon: "/icons/countries/ua.png" },
	{ code: "UAH", name: "Ukrainian Hryvnia", icon: "/icons/countries/ua.png" },
];

export default function CurrencyDropdown() {
	const [isOpenChooseCurrency, setIsOpenChooseCurrency] = useState(false);
	const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
		currencies[0]
	);
	const chooseCurrencyRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(
		chooseCurrencyRef as React.RefObject<HTMLDivElement>,
		() => setIsOpenChooseCurrency(false)
	);

	const toggleDropdown = () => setIsOpenChooseCurrency(!isOpenChooseCurrency);

	const handleCurrencySelect = (currency: Currency) => {
		setSelectedCurrency(currency);
		setIsOpenChooseCurrency(false);
	};

	return (
		<div>
			<label className="text-[#c8cede] text-[13px] block mb-2 font-semibold">
				Choose a currency
			</label>

			<div className="relative" ref={chooseCurrencyRef}>
				<button
					onClick={toggleDropdown}
					className="px-5 hover:brightness-125 pb-0.5 w-full flex items-center justify-between gap-2 border-t overflow-hidden border-primary-border bg-[#181d2a] rounded-md"
				>
					<div className="flex items-center gap-2.5 font-bold text-[16px] h-[50px]">
						<img
							src={selectedCurrency.icon}
							alt={selectedCurrency.code}
							width={24}
							height={24}
							className="w-6 h-6"
						/>
						<span>{selectedCurrency.code}</span>
					</div>

					<img
						src="/icons/arrow-down.png"
						alt=""
						className={`transition-transform duration-200 ${
							isOpenChooseCurrency ? "rotate-180" : ""
						}`}
					/>
				</button>

				<AnimatePresence>
					{isOpenChooseCurrency && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="absolute z-10 mt-1 w-full bg-[#181d2a] border border-primary-border rounded-md shadow-lg overflow-hidden"
						>
							<ul>
								{currencies.map((currency) => (
									<li key={currency.code}>
										<button
											onClick={() =>
												handleCurrencySelect(currency)
											}
											className={`w-full px-5 py-3 flex items-center gap-3 hover:bg-[#222a3a] transition-colors ${
												selectedCurrency.code ===
												currency.code
													? "bg-[#222a3a]"
													: ""
											}`}
										>
											<img
												src={currency.icon}
												alt={currency.code}
												width={24}
												height={24}
												className="w-6 h-6"
											/>
											<div className="text-left">
												<div className="font-medium">
													{currency.code}
												</div>
												<div className="text-xs text-[#c8cede]">
													{currency.name}
												</div>
											</div>
										</button>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
