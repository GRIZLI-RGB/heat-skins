"use client";

import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";

import Table from "@/components/ui/table";
import { _globalLoading_ } from "@/lib/store";
import { getInventory } from "@/lib/api";
import { ItemType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function PersonalAccountInventoryPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [inventory, setInventory] = useState<ItemType[]>([]);

	useEffect(() => {
		setGlobalLoading(true);

		getInventory()
			.then((res) => setInventory(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = () => {
		return inventory.map((item) => [
			<div key="id">{item.id}</div>,
			<div key="item" className="flex items-center gap-2.5">
				<img className="w-6" src={item.img} alt="" />

				<span>{item.market_hash_name}</span>
			</div>,
			<div key="floath">
				{item.float || "-"}{" "}
				{item.wear_short_name && <span>{item.wear_short_name}</span>}
			</div>,
			<div key="price" className="text-accent-purple">
				{item.currency_symbol}
				{item.price}
			</div>,
			<div key="availabillity">
				{formatDate(item.created_at, "short")}
			</div>,
			<div key="status" className="text-[#25f37c]">
				Ready
			</div>,
			<div key="action" className="h-full">
				<button className="uppercase text-[12px] h-full bg-[#162a2e] text-[#25f37c] font-bold w-[84px] text-center rounded-md hover:brightness-125">
					Accept
				</button>
			</div>,
		]);
	};

	return (
		<Table
			minWidth="890px"
			paddings={[0, 0, 0, 18]}
			widths={["5%", "30%", "15%", "15%", "15%", "15%", "10%"]}
			maxHeight="650px"
			headers={[
				{
					text: "ID",
					align: "left",
				},
				{
					text: "Item",
					align: "center",
				},
				{
					text: "Floath",
					align: "center",
				},
				{
					text: "Price",
					align: "center",
				},
				{
					text: "Availabillity",
					align: "center",
				},
				{
					text: "Status",
					align: "center",
				},
				{
					text: "",
					align: "right",
				},
			]}
			data={getTableData()}
		/>
	);
}
