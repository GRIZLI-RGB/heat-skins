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
		<div className="max-sm:px-6 max-sm:mt-8 max-sm:mb-10 max-sm:mb mt-[60px] mb-[68px] px-[68px] max-w-[1220px] [&>p]:text-[13px] [&>p]:leading-[24px] [&>p]:font-medium flex flex-col gap-6">
			<h6 className="text-accent-purple text-[19px] font-bold">
				Our Guarantees
			</h6>
			<p>
				At GrabYourKit, we are committed to providing a secure,
				transparent, and legally compliant service for all users.
				<br />
				Our operations adhere to the following legislation:
			</p>
			<p>
				General Data Protection Regulation (EU) 2016/679 ({'"'}GDPR{'"'}
				),
			</p>
			<p>
				United Kingdom General Data Protection Regulation ({'"'}UK GDPR
				{'"'}),
			</p>
			<p>UK Data Protection Act 2018,</p>
			<p>UK Consumer Rights Act 2015,</p>
			<p>ePrivacy Directive 2002/58/EC.</p>
			<p>
				The following guarantees are provided in accordance with these
				regulations:
			</p>
			<p>
				1. Secure Payments
				<br />
				All transactions are processed through secure, encrypted payment
				gateways in compliance with industry standards. We protect your
				financial information and ensure your transaction is safe.
			</p>
			<p>
				{" "}
				2. Fast Delivery of Purchased Items
				<br />
				We aim to deliver purchased digital items immediately upon
				payment confirmation. In accordance with the UK Consumer Rights
				Act 2015 and applicable EU consumer laws, if a delivery cannot
				be completed within a reasonable time, you are entitled to
				request a full refund or suitable remedy.
			</p>
			<p>
				3. Authenticity of Items
				<br />
				All digital items sold on GrabYourKit are genuine and sourced
				from verified inventories. We guarantee that the items
				correspond to their descriptions and meet quality expectations
				as required by consumer protection law.
			</p>
			<p>
				4. Transparent Pricing
				<br />
				The price displayed during checkout is the final amount payable.
				No hidden fees or surcharges will apply after checkout, ensuring
				compliance with EU and UK transparency and pricing regulations.
			</p>
			<p>
				5. Privacy and Data Protection
				<br />
				Your personal data is handled lawfully, fairly, and
				transparently, strictly following:
			</p>
			<p>GDPR (EU),</p>
			<p>UK GDPR,</p>
			<p>UK Data Protection Act 2018.</p>
			<p>
				You have full rights to access, rectify, delete, or restrict the
				processing of your personal information.
				<br />
				You also have the right to lodge a complaint with a supervisory
				authority, such as the Information Commissioner{"'"}s Office
				(ICO) in the UK.
			</p>
			<p>
				6. Right to Withdrawal (Limited for Digital Goods)
				<br />
				In compliance with the EU Consumer Rights Directive and UK
				Consumer Contracts Regulations, you acknowledge that by agreeing
				to immediate delivery of digital goods, you waive the statutory
				14-day withdrawal right. We clearly inform you of this condition
				prior to completing your purchase.
			</p>
			<p>
				7. Customer Support Commitment
				<br />
				Our support team is available to assist with any purchase or
				account issues. We aim to respond promptly and resolve queries
				fairly, in accordance with applicable consumer protection
				standards. You can reach our support team at
				support@grabyourkit.com.
			</p>
			<p>
				Limitation of Guarantees
				<br />
				While we are committed to providing a reliable and high-quality
				service, GrabYourKit is not liable for:
			</p>
			<p>Service interruptions caused by force majeure events,</p>{" "}
			<p>Errors arising from user actions,</p>{" "}
			<p>
				Failures or limitations of third-party platforms (e.g., Steam),
			</p>
			<p>Scheduled or unscheduled maintenance periods.</p>
			<p>
				These limitations do not affect your statutory rights under
				applicable consumer protection laws.
			</p>
		</div>
	);
}
