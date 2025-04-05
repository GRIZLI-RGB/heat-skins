import Table from "@/components/ui/table";

export default function PersonalAccountPurchasesPage() {
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
			data={[
				...new Array(100).fill([
					<div key="id">67234634</div>,
					<div key="item" className="flex items-center gap-2.5">
						<img
							className="max-h-[22px]"
							src="/images/knife.png"
							alt=""
						/>

						<span>Understoke Knife</span>
					</div>,
					<div key="price" className="text-accent-purple">
						$ 700
					</div>,
					<div key="date" className="text-right">
						23 Feb (13:48)
					</div>,
				]),
			]}
		/>
	);
}
