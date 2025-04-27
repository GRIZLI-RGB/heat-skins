"use client";

import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { _globalLoading_ } from "@/lib/store";
import Table from "@/components/ui/table";
import { getReferrals } from "@/lib/api";
import { ReferralUserType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function PersonalAccountReferralsPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [referrals, setReferrals] = useState<ReferralUserType[]>([]);

	useEffect(() => {
		setGlobalLoading(true);

		getReferrals()
			.then((res) => setReferrals(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = () => {
		const data = referrals.map((referral) => [
			<div key="id">{referral.id}</div>,
			<div key="item" className="flex items-center gap-2.5">
				<img
					className="max-h-[25px]"
					src="/images/user-avatar.png"
					alt=""
				/>

				<span>{referral.username}</span>
			</div>,
			<div key="price" className="text-accent-purple">
				{referral.currency_symbol}
				{referral.ref_balance}
			</div>,
			<div key="date" className="text-right">
				{formatDate(referral.created_at, "short")}
			</div>,
		]);

		console.log(data);

		return data;
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
					text: "User",
					align: "center",
				},
				{
					text: "Your income",
					align: "center",
				},
				{
					text: "Registration date",
					align: "right",
				},
			]}
			data={getTableData()}
		/>
	);
}
