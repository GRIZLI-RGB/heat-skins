"use client";

import clsx from "clsx";
import { useState } from "react";

export default function Input({
	type = "text",
	label,
	className,
	placeholder,
	onlyText = true,
	value,
	onChange,
}: {
	type?: "text" | "number";
	label?: string;
	className?: string;
	placeholder?: string;
	onlyText?: boolean;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	const [focused, setFocused] = useState(false);

	if (onlyText) {
		return (
			<input
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={clsx(
					"px-[18px] text-[12px] font-semibold h-10 rounded-md bg-[#11151f] border border-primary-border focus:border-accent-purple placeholder:text-[#656f83]",
					className
				)}
				type="text"
			/>
		);
	}

	return (
		<div className={clsx(className)}>
			{label && (
				<label className="text-[#c8cede] text-[13px] block mb-2 font-semibold">
					{label}
				</label>
			)}

			<div
				className={clsx(
					"pb-0.5 h-[52px] px-6 flex items-center justify-between gap-3 font-bold rounded-md border",
					focused ? "border-accent-purple" : "border-primary-border"
				)}
			>
				<input
					value={value}
					onChange={onChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					className="placeholder:text-white/25 placeholder:font-semibold"
					placeholder={placeholder}
					type={type}
				/>

				<span className="text-[#434b60] text-[14px]">$</span>
			</div>
		</div>
	);
}
