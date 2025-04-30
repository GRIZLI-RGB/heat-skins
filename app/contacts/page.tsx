"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { _globalLoading_ } from "@/lib/store";

export default function ContactsPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		setGlobalLoading(false);
	}, []);

	return (
		<div className="max-sm:px-6 max-sm:mt-8 max-sm:mb-10 max-sm:mb mt-[60px] mb-[68px] px-[68px] max-w-[1220px] [&>p]:text-[13px] [&_a]:underline [&>p]:leading-[24px] [&>p]:font-medium flex flex-col gap-6">
			<h6 className="text-accent-purple text-[19px] font-bold">
				Contacts
			</h6>
			<p>
				Feel free to write us anything!
				<br />
				<a href="mailto:support@grabyourkit.com">
					support@grabyourkit.com
				</a>
			</p>
			<h6 className="text-accent-purple text-[19px] font-bold">
				Legal Name
			</h6>
			<p>YOURGAMES LTD</p>
			<h6 className="text-accent-purple text-[19px] font-bold">
				Address
			</h6>
			<p>
				86-90 Paul Street,
				<br />
				London, Greater London, England
			</p>
			<h6 className="text-accent-purple text-[19px] font-bold">
				Postal code
			</h6>
			<p>EC2A 4NE</p>
			<h6 className="text-accent-purple text-[19px] font-bold">
				Country
			</h6>
			<p>United Kingdom</p>
			<h6 className="text-accent-purple text-[19px] font-bold">
				General inquiries
			</h6>
			<p>
				<a href="mailto:info@grabyourkit.com">info@grabyourkit.com</a>
			</p>
		</div>
	);
}
