"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { _globalLoading_ } from "@/lib/store";

export default function PrivacyPolicyPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		setGlobalLoading(false);
	}, []);

	return (
		<div className="max-sm:px-6 max-sm:mt-8 max-sm:mb-10 max-sm:mb mt-[60px] mb-[68px] px-[68px] max-w-[1220px] [&>p]:text-[13px] [&>p]:leading-[24px] [&>p]:font-medium flex flex-col gap-6">
			<h6 className="text-accent-purple text-[19px] font-bold">
				Privacy Policy
			</h6>
			<p>
				1. Introduction
				<br />
				Welcome to GrabYourKit.
				<br />
				This Privacy Policy explains how we collect, use, disclose, and
				safeguard your personal data when you use our services or visit
				our website.
				<br />
				We comply with the General Data Protection Regulation (EU)
				2016/679 ({'"'}GDPR{'"'}), the United Kingdom General Data
				Protection Regulation ({'"'}UK GDPR{'"'}), and the UK Data
				Protection Act 2018.
			</p>

			<p>
				By accessing or using our services, you acknowledge that you
				have read, understood, and agreed to the terms of this Privacy
				Policy.
			</p>

			<p>
				2. Data Controller
				<br />
				GrabYourKit is the data controller for the purposes of the GDPR
				and UK GDPR.
				<br />
				Our registered business address is [ADDRESS TO BE ADDED].
				<br />
				For any questions regarding this Privacy Policy, you can contact
				us at support@grabyourkit.com.
			</p>

			<p>
				3. Information We Collect
				<br />
				We may collect and process the following categories of personal
				data:
			</p>

			<p>
				Account Information: Steam ID, email address, account
				credentials.
			</p>

			<p>
				Transaction Data: Payment information, purchase history,
				transaction IDs.
			</p>

			<p>
				Technical Data: IP address, device identifiers, browser type,
				operating system, and usage data.
			</p>
			<p>
				Communication Data: Information you provide when contacting
				support or interacting with us.
			</p>

			<p>
				We do not collect or process any special categories of personal
				data (e.g., racial or ethnic origin, political opinions,
				religious beliefs).
			</p>

			<p>
				4. Legal Basis for Processing Personal Data
				<br />
				We process your personal data under the following lawful bases
				as defined by GDPR and UK GDPR:
			</p>

			<p>
				Performance of a contract: to fulfill our contractual
				obligations when you make a purchase.
			</p>

			<p>Legal obligation: to comply with legal requirements.</p>

			<p>
				Legitimate interests: to improve our services, prevent fraud,
				and maintain the security of our platform.
			</p>

			<p>
				Consent: where required, particularly for marketing
				communications (note: we currently do not send marketing emails
				unless explicitly authorized).
			</p>

			<p>
				5. How We Use Your Information
				<br />
				We use your personal data to:
			</p>

			<p>Provide and deliver services and purchased items,</p>

			<p>Verify your account and process transactions,</p>

			<p>Communicate with you about your account or orders,</p>

			<p>Respond to inquiries and customer support requests,</p>

			<p>
				Detect and prevent fraudulent activities and security breaches,
			</p>

			<p>Comply with applicable legal obligations.</p>

			<p>
				6. Sharing Your Information
				<br />
				We may share your information with:
			</p>

			<p>Payment Processors: to complete transactions.</p>

			<p>
				Service Providers: to support our operational and technical
				infrastructure.
			</p>

			<p>
				Public Authorities: if legally required (e.g., responding to a
				court order or law enforcement request).
			</p>

			<p>
				Business Transfers: in connection with mergers, acquisitions, or
				asset sales.
			</p>

			<p>
				We require that all third parties respect the security of your
				personal data and process it in accordance with applicable laws.
			</p>

			<p>
				7. International Data Transfers
				<br />
				If we transfer your personal data outside the United Kingdom or
				European Economic Area (EEA), we will ensure that appropriate
				safeguards are in place, such as:
			</p>

			<p>
				Standard Contractual Clauses approved by the European Commission
				and UK authorities,
			</p>

			<p>
				Transfers to countries deemed to provide an adequate level of
				protection by the European Commission or UK Government.
			</p>

			<p>You may request a copy of the safeguards by contacting us.</p>

			<p>
				8. Data Security
				<br />
				We implement technical and organizational measures to protect
				your data, including encryption, secure servers, and access
				controls.
				<br />
				Despite our efforts, no system is completely secure. If you
				suspect any security breach, please contact us immediately at
				support@grabyourkit.com.
			</p>

			<p>
				9. Data Retention
				<br />
				We retain your personal data only as long as necessary for the
				purposes for which it was collected, including compliance with
				legal obligations, dispute resolution, and enforcement of
				agreements.
				<br />
				When data is no longer required, it will be securely deleted.
			</p>

			<p>
				10. Your Rights Under GDPR and UK GDPR
				<br />
				You have the following rights regarding your personal data:
			</p>

			<p>
				Right of Access: to request a copy of the data we hold about
				you.
			</p>

			<p>
				Right to Rectification: to correct inaccurate or incomplete
				data.
			</p>

			<p>
				Right to Erasure ({'"'}right to be forgotten{'"'}): to request
				deletion of your data under certain conditions.
			</p>

			<p>
				Right to Restrict Processing: to limit how we process your data
				in certain circumstances.
			</p>

			<p>
				Right to Data Portability: to receive your data in a structured,
				commonly used, and machine-readable format.
			</p>

			<p>
				Right to Object: to object to certain types of processing, such
				as processing based on legitimate interests.
			</p>

			<p>
				Right to Withdraw Consent: where processing is based on your
				consent, you may withdraw it at any time.
			</p>

			<p>
				To exercise any of these rights, please contact us at
				support@grabyourkit.com.
			</p>

			<p>
				You also have the right to lodge a complaint with a supervisory
				authority:
			</p>

			<p>
				In the UK: Information Commissioner{"'"}s Office (ICO) –
				www.ico.org.uk
			</p>

			<p>In the EU: Your local Data Protection Authority.</p>

			<p>
				11. Third-Party Links
				<br />
				Our website may contain links to third-party websites.
				<br />
				We are not responsible for the privacy practices or content of
				third-party sites.
				<br />
				We recommend you read the privacy policies of any external sites
				you visit.
			</p>

			<p>
				12. Children{"'"}s Privacy
				<br />
				GrabYourKit is not intended for individuals under the age of 18.
				<br />
				We do not knowingly collect personal data from children.
				<br />
				If you believe a child has provided us with personal
				information, please contact us immediately, and we will delete
				the data.
			</p>

			<p>
				13. Changes to This Privacy Policy
				<br />
				We reserve the right to update this Privacy Policy at any time.
				<br />
				Any changes will be effective upon posting the updated Privacy
				Policy on our website.
				<br />
				We encourage you to review this Privacy Policy regularly.
			</p>

			<p>
				14. Contact Us
				<br />
				If you have any questions or concerns about this Privacy Policy
				or our data practices, please contact us at
				support@grabyourkit.com.
			</p>
		</div>
	);
}
