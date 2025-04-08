"use client";

import { memo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

interface SkinOption {
	id: string;
	name: string;
	image: string;
}

function DesiredItemDropdown({
	className,
	text,
	options,
	onSelect,
}: {
	className?: string;
	text: string;
	options: SkinOption[];
	onSelect: (option: SkinOption) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<SkinOption | null>(
		null
	);
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
		setIsOpen(false)
	);

	const handleSelect = (option: SkinOption) => {
		setSelectedOption(option);
		onSelect(option);
		setIsOpen(false);
	};

	return (
		<div className={clsx("relative w-full", className)} ref={ref}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="hover:brightness-125 w-full flex items-center justify-between gap-2 bg-primary-background rounded-md border border-primary-border px-5 h-12 transition-all duration-200"
			>
				<div className="flex items-center gap-2.5">
					{selectedOption ? (
						<>
							<img
								src={selectedOption.image}
								alt={selectedOption.name}
								className="w-6 h-6 object-contain"
							/>
							<span className="text-white text-[13px] font-medium">
								{selectedOption.name}
							</span>
						</>
					) : (
						<span className="text-secondary-text text-[13px] font-medium">
							{text}
						</span>
					)}
				</div>

				<motion.img
					src="/icons/arrow-down.png"
					alt=""
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute z-10 mt-1 w-full bg-primary-background rounded-md border border-primary-border shadow-lg overflow-hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<div className="max-h-60 overflow-y-auto">
							{options.map((option) => (
								<button
									key={option.id}
									onClick={() => handleSelect(option)}
									className="w-full flex items-center gap-3 px-4 py-2 hover:bg-secondary-background transition-colors duration-150"
								>
									<img
										src={option.image}
										alt={option.name}
										className="w-8 h-8 object-contain"
									/>
									<span className="text-white text-[13px] font-medium">
										{option.name}
									</span>
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default memo(DesiredItemDropdown);
