"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

import Input from "./input";

export type TableProps = {
	headers: {
		text: string;
		align?: "left" | "right" | "center";
	}[];
	className?: string;
	cns?: {
		row?: string;
	};
	widths?: string[];
	data: React.ReactNode[][];
	maxHeight?: string;
	minWidth?: string;
	disableShadow?: boolean;
	paddings?: [number, number, number, number];
	withSearches?: boolean;
	searchByTransactionId?: string;
	setSearchByTransactionId?: (value: string) => void;
};

export default function Table({
	headers,
	className,
	cns,
	widths,
	data,
	maxHeight,
	minWidth,
	disableShadow = false,
	paddings = [0, 18, 0, 18],
	withSearches = false,
	searchByTransactionId = "",
	setSearchByTransactionId = () => {},
}: TableProps) {
	const tableRef = useRef(null);

	useEffect(() => {
		if (tableRef.current) {
			OverlayScrollbars(
				{ target: tableRef.current },
				{ scrollbars: { autoHide: "never" } }
			);
		}
	}, []);

	return (
		<div
			className={clsx(
				"bg-primary-background rounded-md p-6 relative overflow-hidden",
				className
			)}
		>
			{withSearches && data.length > 0 && (
				<>
					<div className="flex gap-4">
						<Input
							value={searchByTransactionId}
							onChange={(e) =>
								setSearchByTransactionId(e.target.value)
							}
							placeholder="Transaction ID"
							className="!max-w-[214px]"
						/>
						{/* <Input
							value={searchByItemName}
							onChange={(e) =>
								setSearchByItemName(e.target.value)
							}
							placeholder="Item name"
							className="!max-w-[214px]"
						/> */}
					</div>

					<div className="h-px w-[150%] relative -left-[10%] bg-[#11151e] my-6" />
				</>
			)}

			<div
				className="max-w-full overflow-x-auto custom-scrollbar relative"
				ref={tableRef}
			>
				<div
					style={{
						minWidth,
						padding: `${paddings[0]}px ${paddings[1]}px ${paddings[2]}px ${paddings[3]}px`,
					}}
					className={clsx(
						"text-[#656f83] text-[12px] leading-[20px] font-medium flex items-center mb-5"
					)}
				>
					{headers.map((header, index) => (
						<div
							style={{
								width: widths
									? widths[index]
									: `${100 / headers.length}%`,
								textAlign: header?.align || "center",
							}}
							key={header.text}
						>
							{header.text}
						</div>
					))}
				</div>

				<div
					className="flex flex-col gap-2 overflow-y-auto hide-scrollbar"
					style={{
						minWidth,
						maxHeight,
					}}
				>
					{data.length > 0 &&
						data.map((row, index) => (
							<div
								className={clsx(
									"rounded-md flex items-center w-full bg-[#151b28] h-10 min-h-10 hover:brightness-125",
									cns?.row
								)}
								key={index}
								style={{
									padding: `${paddings[0]}px ${paddings[1]}px ${paddings[2]}px ${paddings[3]}px`,
								}}
							>
								{row.map((cell, index) => (
									<div
										className="flex items-center h-full font-bold text-[12px]"
										style={{
											width: widths
												? widths[index]
												: `${100 / row.length}%`,
											justifyContent:
												headers[index]?.align ||
												"center",
										}}
										key={index}
									>
										{cell}
									</div>
								))}
							</div>
						))}

					{!(data.length > 0) && (
						<div
							className={
								"flex-middle text-center font-semibold py-10"
							}
						>
							No data
						</div>
					)}
				</div>
			</div>

			{!disableShadow && data.length > 5 && (
				<img
					className="absolute left-0 right-0 bottom-0 w-full pointer-events-none"
					src="/images/decorations/table-shadow.png"
					alt=""
					style={{
						background:
							"linear-gradient(180deg, rgba(31, 32, 47, 0) 64%, #1F202F 100%)",
						minWidth,
					}}
				/>
			)}
		</div>
	);
}
