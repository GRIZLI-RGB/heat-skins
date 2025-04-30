"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { _globalLoading_ } from "@/lib/store";

export default function TermsOfUsePage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		setGlobalLoading(false);
	}, []);

	return (
		<div className="max-sm:px-6 max-sm:mt-8 max-sm:mb-10 max-sm:mb mt-[60px] mb-[68px] px-[68px] max-w-[1220px] [&>p]:text-[13px] [&>p]:leading-[24px] [&>p]:font-medium flex flex-col gap-6">
			<h6 className="text-accent-purple text-[19px] font-bold">
				Terms of use
			</h6>
			<p>
				1. Introduction
				<br />
				Welcome to GrabYourKit. These Terms of Use (“Terms”) govern your
				access to and use of our website, services, and digital products
				(collectively, the “Services”). By accessing or using the
				Services, you agree to be bound by these Terms. If you do not
				agree to these Terms, please do not use the Services.
			</p>
			<p>
				2. Eligibility
				<br />
				You must be at least 18 years of age, or the age of legal
				majority in your jurisdiction, to use GrabYourKit. By accessing
				or using the Services, you represent and warrant that you meet
				the applicable age requirement.
			</p>
			<p>
				3. Account Registration
				<br />
				To purchase items through GrabYourKit, you must create an
				account either by logging in with your Steam account via the
				official Steam API or by registering with a valid email address
				and password.
				<br />
				You are responsible for maintaining the confidentiality of your
				login credentials and for all activities that occur under your
				account.
			</p>
			<p>
				4. Services Provided
				<br />
				GrabYourKit offers users the ability to purchase digital
				cosmetic items (such as CS2 skins) from our curated inventory.
				<br />
				We do not operate a marketplace, facilitate peer-to-peer trades,
				or engage in the exchange of digital items between users.
			</p>

			<p>
				5. Purchase Terms
				<br />
				All purchases made through GrabYourKit are subject to
				availability and acceptance by us.
				<br />
				Once payment is completed and confirmed, the ownership of the
				purchased digital item is transferred to you.
			</p>

			<p>
				6. Delivery of Items
				<br />
				Purchased items are delivered via an arranged transfer process
				through Steam.
				<br />
				You must log in with your Steam account to receive your
				purchased items.
				<br />
				Delivery is typically immediate upon successful payment, but
				minor delays may occur due to technical factors.
			</p>

			<p>
				7. Pricing and Payment
				<br />
				All prices are displayed in the applicable currency and are
				inclusive of applicable taxes, unless otherwise stated.
				<br />
				We accept various secure payment methods, which are listed
				during the checkout process.
				<br />
				By providing payment information, you represent and warrant that
				you are authorized to use the chosen payment method.
			</p>

			<p>
				8. Refund Policy
				<br />
				All sales are final once a purchased item is delivered.
				<br />
				Refunds, cancellations, or exchanges are not permitted, except
				where required by applicable consumer protection laws.
				<br />
				Please review your selections carefully before completing your
				purchase.
			</p>
			<p>
				9. Prohibited Conduct
				<br />
				When using the Services, you agree not to:
			</p>
			<p>Violate any applicable laws or regulations;</p>
			<p>
				Attempt to disrupt, compromise, or interfere with our systems or
				Services;
			</p>

			<p>
				Use any unauthorized means to access GrabYourKit or its
				inventory;
			</p>

			<p>
				Misrepresent your identity or affiliation with any person or
				entity.
			</p>
			<p>
				10. Intellectual Property Rights
				<br />
				All content, trademarks, logos, and digital assets on
				GrabYourKit are the property of [COMPANY NAME TO BE ADDED] or
				its licensors.
				<br />
				Unauthorized use of any materials on the website is strictly
				prohibited.
			</p>
			<p>
				11. Limitation of Liability
				<br />
				To the fullest extent permitted by law, GrabYourKit and its
				affiliates shall not be liable for any indirect, incidental,
				consequential, or punitive damages arising from your use of or
				inability to use the Services, even if we have been advised of
				the possibility of such damages.
			</p>
			<p>
				12. Indemnification
				<br />
				You agree to indemnify and hold harmless GrabYourKit, its
				affiliates, directors, employees, and agents from and against
				any claims, liabilities, damages, losses, and expenses,
				including reasonable attorneys’ fees, arising out of or
				connected to your use of the Services or your violation of these
				Terms.
			</p>
			<p>
				13. Changes to the Terms
				<br />
				We reserve the right to modify or update these Terms at any time
				at our sole discretion.
				<br />
				Changes become effective upon posting on the website.
				<br />
				It is your responsibility to review the Terms periodically for
				updates.
			</p>
			<p>
				14. Termination
				<br />
				We may suspend or terminate your access to the Services at any
				time, without notice, for conduct that we believe violates these
				Terms or is otherwise harmful to other users or to us.
			</p>
			<p>
				15. Governing Law and Jurisdiction
				<br />
				These Terms shall be governed by and construed in accordance
				with the laws of the United Kingdom, without regard to its
				conflict of laws principles.
				<br />
				Any disputes arising under or related in any way to these Terms
				shall be subject to the exclusive jurisdiction of the courts
				located in the United Kingdom.
			</p>

			<p>
				16. Contact Information
				<br />
				For questions regarding these Terms or our Services, please
				contact us at support@grabyourkit.com.
			</p>
		</div>
	);
}
