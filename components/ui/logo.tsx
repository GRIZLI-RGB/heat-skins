import clsx from "clsx";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
	return (
		<Link
			className={clsx(
				"inline-flex items-center justify-center min-w-[160px]",
				className
			)}
			href="/"
		>
			<img src="/images/logo.png" alt="" />
		</Link>
	);
}
