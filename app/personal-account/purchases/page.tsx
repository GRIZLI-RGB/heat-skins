"use client";

import Table from "@/components/ui/table";
import { getPurchases } from "@/lib/api";
import { _globalLoading_, _user_ } from "@/lib/store";
import { PurchaseType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function PersonalAccountPurchasesPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [purchases, setPurchases] = useState<PurchaseType[]>([]);

	const user = useAtomValue(_user_);

	useEffect(() => {
		setGlobalLoading(true);

		getPurchases()
			.then((res) => setPurchases(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = () => {
		return purchases.map((purchase) => [
			<div key="id">{purchase.id}</div>,
			<div key="item" className="flex items-center gap-2.5">
				<img className="w-6" src={purchase.offer.img} alt="" />

				<span>{purchase.offer.market_hash_name}</span>
			</div>,
			<div key="price" className="text-accent-purple">
				{user?.currency_symbol}
				{purchase.offer.price}
			</div>,
			<div key="date" className="text-right">
				{formatDate(purchase.created_at, "short")}
			</div>,
		]);
	};

	return (
		<Table
			minWidth="660px"
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
					text: "Price",
					align: "center",
				},
				{
					text: "Date",
					align: "right",
				},
			]}
			data={getTableData()}
		/>
	);
}
