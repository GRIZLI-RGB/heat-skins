import Table from "@/components/ui/table";

export default function PersonalAccountReferralsPage() {
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
			data={[
				...new Array(100).fill([
					<div key="id">67234634</div>,
					<div key="item" className="flex items-center gap-2.5">
						<img
							className="max-h-[25px]"
							src="/images/user-avatar.png"
							alt=""
						/>

						<span>Dewolt Shuffle</span>
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
