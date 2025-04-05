import Table from "@/components/ui/table";

export default function PersonalAccountTransactionsPage() {
	return (
		<Table
			minWidth="660px"
			withInputs
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
			data={[
				...new Array(100).fill([
					<div key="id">67234634</div>,
					<div key="payment_system">Master Card</div>,
					<div key="amount" className="text-accent-purple">
						$ 700
					</div>,
					<div key="status" className="text-[#25f37c]">
						Completed
					</div>,
					<div key="date" className="text-right">
						23 Feb (13:48)
					</div>,
				]),
			]}
		/>
	);
}
