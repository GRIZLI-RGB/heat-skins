import clsx from "clsx";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
	return (
		<Link
			className={clsx(
				"tracking-[0.015em] font-bold text-2xl inline-flex items-center justify-center",
				className
			)}
			href="/"
		>
			GrabYourKit
		</Link>
	);
}
