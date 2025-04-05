"use client";

import clsx from "clsx";
import { useState } from "react";

export default function SearchBar({ className }: { className?: string }) {
	const [focused, setFocused] = useState(false);

	return (
		<div
			className={clsx(
				"border rounded-md flex items-center justify-between pl-4 pr-3 h-[42px] max-w-[356px] gap-3 w-full",
				focused ? "border-[#f53361]" : "border-[#232a3c]",
				className
			)}
		>
			<input
				onBlur={() => setFocused(false)}
				onFocus={() => setFocused(true)}
				placeholder="CS2 Skin Search"
				className="placeholder:text-[#444b5a] text-[13px] font-medium"
			/>

			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					width="20px"
					height="19px"
				>
					<image
						x="0px"
						y="0px"
						width="20px"
						height="19px"
						xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAMAAACnUt2HAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABL1BMVEXTNmDUN2DUNmDTNl/UN2DTNmDTNmDTNmDTNmDUNmDUNmDUNmDUNmDTNl/UN2DTNl/TNl/TNmDUN2DUNmDUNmDTNl/TNl/UNmDTNmDTNl/TNl/UN2DUNmDUN2DUN2DTNmDUNmDTNmDUN2DTNl/UNmDTNl/TNl/TNl/TNl/TNl/TNl/TNmDUNmDTNmDTNmDTNmDUNmDTNmDTNl/UNmDTNmDTNl/TNl/UNmDTNmDUNmDTNmDTNmDUN2DUNmDTNl/TNl/UNmDUN2DTNmDTNmDUNmDUNmDTNmDTNl/TNmDTNmDTNl/UNmDUNmDTNmDTNmDTNmDTNmDTNmDUN2DUNmDTNmDUN2DTNmDUN2DUNmDUNmDTNl/TNl/UN2DUNmDTNmDUN2DTNl/UN2DUNmDTNmD///9nd0FaAAAAYHRSTlMAAAAAIYjQ7/Xgq0rJIbfksKbL+jCU8lO28wspHKSXmlTr/Abc7Ic+xFZf8lxazvkHon6DGucP/lMN12KgLQEUaO6pdvHpu0HU95j7xwI8hK20ml0MOc8INPjZKPSvJOfw0lqmAAAAAWJLR0Rkwtq4CQAAAAd0SU1FB+kEAQscBrPiNsYAAAEWSURBVBjTLZAFcwMwCIUJtFvna9d17u7u0rm7+wj8//+wl10vdwnh8chHiAJzJltVnauprWMSYiRwhKxGU48a6xuYiRiKNKprU3O+4B5bioGFA3FrtFIbHCHT7t7RScne5VrqTr2Ypce8F+2E+tT64RCEIgM2OASVhn2EQmXxqNmYIJnzcUlmsFCYUJ+ERlNWwFUkJJhptRkB0qzOzRMCTvYF92KyL7ot4ZBUsKxxBeCBVtcsridvCBubZlupF/pE1e2dXSrv7bv7AUSg8qGa29ExhsWgfpKexKSnZxYNVecXlxb16hpJUNLN7d39w+MTPxtcL6+g4RDonx762zvSH5UreCip4fNL9RsxnpO0p59g+fnN8x8CnDIF8rJJMAAAAABJRU5ErkJggg=="
					/>
				</svg>
			</div>
		</div>
	);
}
