"use client";

import { useEffect, useMemo, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { _globalLoading_, _user_ } from "@/lib/store";
import Table from "@/components/ui/table";
import { TransactionType } from "@/lib/types";
import { getTransactions } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useDebouncedValue } from "@/lib/hooks";

export default function PersonalAccountTransactionsPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	const user = useAtomValue(_user_);

	const [searchByTransactionId, setSearchByTransactionId] = useState("");

	const searchByTransactionIdDebounced = useDebouncedValue(
		searchByTransactionId,
		500
	);

	useEffect(() => {
		setGlobalLoading(true);

		getTransactions()
			.then((res) => setTransactions(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const getTableData = useMemo(() => {
		return transactions
			.filter((transaction) => {
				return transaction.id
					.toString()
					.toLowerCase()
					.includes(searchByTransactionId.toLowerCase());
			})
			.map((transaction) => [
				<div key="id">{transaction.id}</div>,
				<div key="payment_system">
					{transaction.payment_system_name}
				</div>,
				<div key="amount" className="text-accent-purple">
					{user?.currency_symbol}
					{transaction.sum}
				</div>,
				<div key="status" className="text-[#25f37c]">
					{transaction.status_name}
				</div>,
				<div key="date" className="text-right">
					{formatDate(transaction.created_at, "short")}
				</div>,
			]);
	}, [transactions, searchByTransactionId, user]);

	return (
		<Table
			withSearches
			searchByTransactionId={searchByTransactionIdDebounced}
			setSearchByTransactionId={setSearchByTransactionId}
			minWidth="660px"
			maxHeight="650px"
			headers={[
				{
					text: "ID",
					align: "left",
				},
				{
					text: "Payment system",
					align: "center",
				},
				{
					text: "Amount",
					align: "center",
				},
				{
					text: "Status",
					align: "center",
				},
				{
					text: "Date",
					align: "right",
				},
			]}
			data={getTableData}
		/>
	);
}
