"use client";

import clsx from "clsx";
import { useState } from "react";

export default function FilterDropdown({ variant }: { variant: string }) {
	const [isOpen, setIsOpen] = useState(false);

	const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={clsx(
					"h-[42px] flex items-center justify-between px-4 w-full rounded-md",
					isOpen ? "bg-[#171c28]" : "bg-primary-background"
				)}
			>
				<span className="leading-[100%]">
					{variant.slice(0, 1).toUpperCase() + variant.slice(1)}
				</span>

				<img src={`/icons/${isOpen ? "minus" : "plus"}.png`} alt="" />
			</button>

			<div
				className={clsx(
					isOpen ? "block -mt-1 pt-1.5 bg-[#171c28] rounded-b-md px-4" : "hidden"
				)}
			>
				{[
					{ text: "Consumer goods", color: "#b0c3d9" },
					{ text: "Industrial quality", color: "#5e98d9" },
					{ text: "Military quality", color: "#4b69ff" },
					{ text: "Fobidden", color: "#8847ff" },
					{ text: "Classified", color: "#d32ce6" },
					{ text: "The Secret", color: "#eb4b4b" },
					{ text: "Honored", color: "#e4ae39" },
					{ text: "Excellent", color: "#b0c3d9" },
				].map(({ text, color }, index) => (
					<button
						onClick={() => {
							if (checkedIndexes?.includes(index)) {
								setCheckedIndexes(
									checkedIndexes.filter((i) => i !== index)
								);
							} else {
								setCheckedIndexes((prev) => [...prev, index]);
							}
						}}
						className="h-10 flex items-center justify-between w-full border-b border-b-primary-border last:border-0"
						style={{
							color,
						}}
						key={text}
					>
						<span>{text}</span>

						<div className="bg-[#11151e] rounded-md w-4 h-4 flex-middle">
							<div
								className={clsx(
									"w-1.5 h-1.5 rounded-full",
									checkedIndexes?.includes(index)
										? "bg-accent-purple opacity-100"
										: "opacity-0"
								)}
							/>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
