"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { _globalLoading_ } from "@/lib/store";

export default function CookiesPolicyPage() {
	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		setGlobalLoading(false);
	}, []);

	return (
		<div className="max-sm:px-6 max-sm:mt-8 max-sm:mb-10 max-sm:mb mt-[60px] mb-[68px] px-[68px] max-w-[1220px] [&>p]:text-[13px] [&_a]:underline [&>p]:leading-[24px] [&>p]:font-medium flex flex-col gap-6">
			<h6 className="text-accent-purple text-[19px] font-bold">
				Cookies policy
			</h6>
			<p>
				1. Introduction
				<br />
				This Cookie Policy explains how GrabYourKit (“we”, “us”, or
				“our”) uses cookies and similar technologies on our website.
				<br />
				Our use of cookies is governed by applicable privacy and data
				protection laws, including:
			</p>

			<p>
				the General Data Protection Regulation (EU) 2016/679 ({'"'}GDPR
				{'"'}),
			</p>

			<p>
				the United Kingdom General Data Protection Regulation ({'"'}UK
				GDPR{'"'}),
			</p>

			<p>the Data Protection Act 2018,</p>

			<p>and the ePrivacy Directive 2002/58/EC.</p>

			<p>
				By using our website, you consent to the use of cookies as
				described in this Policy.
				<br />
				You may withdraw or modify your consent at any time by adjusting
				your cookie preferences through our cookie management tool.
			</p>

			<p>
				For more information about how we collect and process your
				personal data, please refer to our [Privacy Policy].
			</p>

			<p>
				2. What Are Cookies?
				<br />
				Cookies are small text files placed on your device when you
				visit a website.
				<br />
				They help improve the website{"'"}s functionality, personalize
				your experience, and provide analytical information to the
				website owners.
			</p>
			<p>
				Cookies can either be {'"'}session cookies{'"'} (deleted when
				you close your browser) or {'"'}persistent cookies{'"'} (which
				remain stored on your device for a specific period or until you
				delete them).
			</p>
			<p>
				3. Types of Cookies We Use
				<br />
				We use the following categories of cookies:
			</p>

			<p>
				Essential Cookies
				<br />
				These cookies are necessary for the website to function properly
				and cannot be switched off.
				<br />
				They are usually set in response to actions you take, such as
				setting your privacy preferences or logging in.
			</p>

			<p>
				Performance and Analytics Cookies
				<br />
				These cookies help us understand how visitors interact with our
				website by collecting information anonymously.
				<br />
				They allow us to measure and improve the performance of our
				site.
			</p>

			<p>
				Functionality Cookies
				<br />
				These cookies enable the website to provide enhanced features
				and personalization, such as remembering choices you make.
			</p>
			<p>
				Third-Party Cookies
				<br />
				These are cookies set by third-party services integrated into
				our website (e.g., analytics or payment providers).
			</p>
			<p>
				4. Third-Party Cookies
				<br />
				We may allow third-party services, such as Google Analytics, to
				set cookies on your device to collect data about your browsing
				behavior.
				<br />
				We do not control third-party cookies and recommend reviewing
				the privacy policies of any third-party providers you interact
				with.
			</p>
			<p>
				5. Managing Cookies
				<br />
				You have the right to decide whether to accept or reject
				non-essential cookies.
			</p>

			<p>You can manage your cookie preferences by:</p>

			<p>
				Using our cookie consent management tool presented when you
				first visit our website,
			</p>

			<p>
				Adjusting your browser settings to refuse cookies or alert you
				when cookies are being set,
			</p>
			<p>Deleting stored cookies manually from your device.</p>

			<p>
				Please note that disabling certain types of cookies may affect
				the functionality and user experience of our website.
			</p>
			<p>Useful links for managing cookies:</p>

			<p>
				Google Chrome
				<br />
				<a
					rel="noopener noreferrer"
					target="_blank"
					href="https://support.google.com/chrome/answer/95647"
				>
					https://support.google.com/chrome/answer/95647
				</a>
			</p>

			<p>
				Mozilla Firefox
				<br />
				<a
					href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
					target="_blank"
					rel="noopener noreferrer"
				>
					https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer
				</a>
			</p>

			<p>
				Safari
				<br />
				<a
					href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
					target="_blank"
					rel="noopener noreferrer"
				>
					https://support.apple.com/en-gb/guide/safari/sfri11471/mac
				</a>
			</p>

			<p>
				Microsoft Edge
				<br />
				<a
					href="https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy"
					target="_blank"
					rel="noopener noreferrer"
				>
					https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy
				</a>
			</p>

			<p>
				6. Changes to This Cookie Policy
				<br />
				We may update this Cookie Policy from time to time to reflect
				changes in technology, legal requirements, or our business
				practices.
				<br />
				Any changes will be effective immediately upon posting the
				updated Cookie Policy on our website.
				<br />
				We encourage you to review this Policy periodically.
			</p>

			<p>
				7. Contact Us
				<br />
				If you have any questions or concerns about our use of cookies
				or this Cookie Policy, you can contact us at{" "}
				<a href="mail:support@grabyourkit.com">
					support@grabyourkit.com
				</a>
			</p>
		</div>
	);
}
