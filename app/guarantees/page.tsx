"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { _globalLoading_ } from "@/lib/store";

export default function GuaranteesPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		setGlobalLoading(false);
	}, []);

	return (
		<div className="max-sm:px-6 max-sm:mt-8 max-sm:mb-10 max-sm:mb mt-[60px] mb-[68px] px-[68px] max-w-[1220px] [&>p]:text-[13px] [&>p]:leading-[24px] [&>p]:font-medium flex flex-col gap-7">
			<h6 className="text-accent-purple text-[19px] font-bold">
				The guarantees
			</h6>
			<p>
				We are In-Game Solutions PTE. LTD, a private company limited by
				shares, registration number 202435257H, has its registered
				address and the principal place of business at Our Privacy
				Policy meets requirements of the European Union General Data
				Protection Regulation (GDPR) and Singapore Personal Data
				Protection Act.
			</p>
			<p>
				This Privacy Policy explains how We collect, use, share, and
				protect Your personal information when You use Our Website. By
				accessing or using Our services,
			</p>
			<p>
				1. INFORMATION WE COLLECT
				<br />
				We may collect and process the following types of personal
				information:
			</p>
			<h6 className="text-accent-purple text-[19px] font-bold">
				Important information
			</h6>
			<p>
				Information You Provide to Us <br />- Account Information: Name,
				email address and Steam details (login, username, icon, other
				information You made public on Steam) payment details.
				<br /> - Profile Information: Photos, personal details,
				descriptions and all information that You make public on the
				Internet. <br />- Transaction Information: Details of purchases,
				sales, and interactions on the Website.
			</p>
			<p>
				- Usage Data: Your browsing activity, pages visited, and search
				queries.
				<br /> - Device Information: IP address, browser type, device
				type, operating system, and location data.
			</p>
			<p>
				Third-Party Information
				<br /> - We may collect information about You from third
				parties, such as social media Websites or payment processors,
				when You connect their services to our Website. <br />- We
				encourage You to review privacy policies of such third parties
				thoroughly before cooperating with them.
			</p>
			<p>
				2. How We Use Your Information <br />- We use Your information
				to:
				<br /> - Provide You relevant services on Our Website. <br />-
				Provide, improve, and personalize Our services. <br />-
				Communicate with You regarding Your account, orders, and support
				inquiries. <br />- Process payments and prevent fraudulent
				activities. <br />- Send promotional content and updates (if you
				opt-in).
			</p>
		</div>
	);
}
