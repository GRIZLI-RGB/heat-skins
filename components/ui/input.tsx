"use client";

import clsx from "clsx";
import { useState } from "react";

export default function Input({
	type = "text",
	label,
	className,
	placeholder,
}: {
	type?: "text" | "number";
	label?: string;
	className?: string;
	placeholder?: string;
}) {
	const [focused, setFocused] = useState(false);

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
