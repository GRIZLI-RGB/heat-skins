"use client";

import clsx from "clsx";
import { useState, useEffect, memo } from "react";
import { useDebouncedCallback } from "use-debounce";

interface FilterDropdownProps {
	variant: string;
	options?: string[];
	min?: number | string;
	max?: number | string;
	selected?: string[];
	selectedMin?: string;
	selectedMax?: string;
	onChange?: (selected: string[]) => void;
	onChangeRange?: (min: string, max: string) => void;
	defaultOpen?: boolean;
}

function FilterDropdown({
	variant,
	options = [],
	min = 0,
	max = 100,
	selected = [],
	selectedMin = "",
	selectedMax = "",
	onChange,
	onChangeRange,
	defaultOpen = false,
}: FilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [localSelected, setLocalSelected] = useState<string[]>(selected);
	const [localMin, setLocalMin] = useState(selectedMin);
	const [localMax, setLocalMax] = useState(selectedMax);

	useEffect(() => {
		if (defaultOpen) setIsOpen(true);
	}, [defaultOpen]);

	function arraysEqual(a: string[], b: string[]) {
		if (a === b) return true;
		if (a.length !== b.length) return false;
		return a.every((val, i) => val === b[i]);
	}

	useEffect(() => {
		if (
			!arraysEqual(localSelected, selected) ||
			localMin !== selectedMin ||
			localMax !== selectedMax
		) {
			setLocalSelected(selected);
			setLocalMin(selectedMin || "");
			setLocalMax(selectedMax || "");
		}
	}, [selected, selectedMin, selectedMax]);

	const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^[0-9]*\.?[0-9]*$/.test(value)) {
			setLocalMin(value);
			debouncedRangeChange(value, localMax);
		}
	};

	const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^[0-9]*\.?[0-9]*$/.test(value)) {
			setLocalMax(value);
			debouncedRangeChange(localMin, value);
		}
	};

	// Оптимизировать debounce
	const debouncedRangeChange = useDebouncedCallback(
		(newMin: string, newMax: string) => {
			if (onChangeRange) {
				const minNum = parseFloat(newMin) || 0;
				const maxNum = parseFloat(newMax) || 0;

				if (
					minNum !== parseFloat(selectedMin || "") ||
					maxNum !== parseFloat(selectedMax || "")
				) {
					onChangeRange(newMin, newMax);
				}
			}
		},
		500
	);

	const handleBlur = () => {
		const validate = (value: string, defaultVal: string): string => {
			if (value === "") return "";
			const num = parseFloat(value);
			return isNaN(num)
				? defaultVal
				: Math.max(Number(min), Math.min(num, Number(max))).toString();
		};

		const validatedMin = validate(localMin, min.toString());
		const validatedMax = validate(localMax, max.toString());

		setLocalMin(validatedMin);
		setLocalMax(validatedMax);
		onChangeRange?.(validatedMin, validatedMax);
	};

	const toggleItem = (item: string) => {
		const newSelected = localSelected.includes(item)
			? localSelected.filter((i) => i !== item)
			: [...localSelected, item];

		setLocalSelected(newSelected);
		onChange?.(newSelected);
	};

	// Вспомогательные функции
	const getVariantTitle = () => {
		const titles: Record<string, string> = {
			type: "Type",
			price: "Price",
			float: "Float",
			quality: "Quality",
			phase: "Phase",
			rarity: "Rarity",
			hold: "Hold",
			stickers: "Stickers",
			other: "Other",
		};
		return (
			titles[variant] ||
			variant.charAt(0).toUpperCase() + variant.slice(1)
		);
	};

	const getColorForRarity = (rarity: string) => {
		const colors: Record<string, string> = {
			"Consumer Grade": "#b0c3d9",
			"Industrial Grade": "#5e98d9",
			"Mil-Spec Grade": "#4b69ff",
			Restricted: "#8847ff",
			Classified: "#d32ce6",
			Covert: "#eb4b4b",
			Contraband: "#e4ae39",
		};
		return colors[rarity] || "#ffffff";
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={clsx(
					"h-[42px] flex items-center justify-between px-4 w-full rounded-md",
					isOpen ? "bg-[#171c28]" : "bg-primary-background"
				)}
			>
				<span className="leading-[100%]">{getVariantTitle()}</span>
				<img src={`/icons/${isOpen ? "minus" : "plus"}.png`} alt="" />
			</button>

			<div
				className={clsx(
					isOpen
						? "block -mt-1 pt-1.5 bg-[#171c28] rounded-b-md px-4 pb-3"
						: "hidden"
				)}
			>
				{variant === "price" || variant === "float" ? (
					<div className="space-y-3 py-2">
						<div className="flex flex-col gap-3">
							<div>
								<label className="block text-xs text-[#6b7280] mb-1">
									Min value
								</label>
								<div className="relative">
									<input
										type="text"
										inputMode="decimal"
										value={localMin}
										onChange={handleMinChange}
										onBlur={handleBlur}
										onKeyDown={(e) =>
											e.key === "Enter" && handleBlur()
										}
										placeholder={`From ${min}`}
										className="w-full bg-[#11151e] rounded-md px-3 py-2 text-sm pr-8"
									/>
									{localMin && (
										<button
											onClick={() => {
												setLocalMin("");
												onChangeRange?.("", localMax);
											}}
											className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#6b7280] hover:text-white"
										>
											×
										</button>
									)}
								</div>
								{localMin && isNaN(parseFloat(localMin)) && (
									<p className="text-red-500 text-xs mt-1">
										Invalid number format
									</p>
								)}
							</div>

							<div>
								<label className="block text-xs text-[#6b7280] mb-1">
									Max value
								</label>
								<div className="relative">
									<input
										type="text"
										inputMode="decimal"
										value={localMax}
										onChange={handleMaxChange}
										onBlur={handleBlur}
										onKeyDown={(e) =>
											e.key === "Enter" && handleBlur()
										}
										placeholder={`To ${max}`}
										className="w-full bg-[#11151e] rounded-md px-3 py-2 text-sm pr-8"
									/>
									{localMax && (
										<button
											onClick={() => {
												setLocalMax("");
												onChangeRange?.(localMin, "");
											}}
											className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#6b7280] hover:text-white"
										>
											×
										</button>
									)}
								</div>
								{localMax && isNaN(parseFloat(localMax)) && (
									<p className="text-red-500 text-xs mt-1">
										Invalid number format
									</p>
								)}
							</div>
						</div>

						<div className="flex items-center justify-between text-xs text-[#6b7280] pt-1">
							<span>
								Range: {min} - {max}
							</span>
							{!isNaN(parseFloat(localMin)) &&
								!isNaN(parseFloat(localMax)) && (
									<span className="text-accent-purple">
										{parseFloat(localMin)} -{" "}
										{parseFloat(localMax)}
									</span>
								)}
						</div>
					</div>
				) : (
					options.map((option) => (
						<button
							key={option}
							onClick={() => toggleItem(option)}
							className="h-10 flex items-center justify-between w-full border-b border-b-primary-border last:border-0"
							style={{
								color:
									variant === "rarity"
										? getColorForRarity(option)
										: "#ffffff",
							}}
						>
							<span>{option}</span>
							<div className="bg-[#11151e] rounded-md w-4 h-4 flex-middle">
								<div
									className={clsx(
										"w-1.5 h-1.5 rounded-full",
										localSelected.includes(option)
											? "bg-accent-purple opacity-100"
											: "opacity-0"
									)}
								/>
							</div>
						</button>
					))
				)}
			</div>
		</div>
	);
}

export default memo(FilterDropdown);
