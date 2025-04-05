import Table from "@/components/ui/table";

export default function PersonalAccountInventoryPage() {
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
					<div key="floath">0.987051137 (MW)</div>,
					<div key="price" className="text-accent-purple">
						$ 700
					</div>,
					<div key="availabillity">23 Feb (13:48)</div>,
					<div key="status" className="text-[#25f37c]">
						Ready
					</div>,
					<div key="action" className="h-full">
						<button className="uppercase text-[12px] h-full bg-[#162a2e] text-[#25f37c] font-bold w-[84px] text-center rounded-md hover:brightness-125">
							Accept
						</button>
					</div>,
				]),
			]}
		/>
	);
}
