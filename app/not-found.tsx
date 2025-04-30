"use client";

import Link from "next/link";

export default function NotFound() {
	return (
		<div className="max-w-[1240px] px-5 mx-auto py-11 max-md:py-8 flex flex-col gap-6 items-center justify-center text-center">
			<div className="bg-primary-background rounded-md px-10 py-12 max-w-[600px] w-full flex flex-col items-center gap-5">
				<h1 className="text-[28px] font-bold text-white">
					404 — Page Not Found
				</h1>
				<p className="text-[#b1b7c5] text-[15px] font-semibold">
					Oops, the page you are looking for doesn’t exist or has been
					moved.
				</p>

				<Link
					href="/"
					className="uppercase font-bold bg-accent-purple/20 border text-[16px] border-accent-purple hover:bg-accent-purple rounded-md leading-[120%] py-4 px-10 mt-4 text-white "
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
