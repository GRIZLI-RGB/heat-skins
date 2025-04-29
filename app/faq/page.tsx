"use client";

import { useEffect, useState } from "react";

import FAQ from "@/components/ui/faq";
import { FaqItemType } from "@/lib/types";
import { getFaq } from "@/lib/api";
import Loader from "@/components/ui/loader";
import { useSetAtom } from "jotai";
import { _globalLoading_ } from "@/lib/store";

export default function FaqPage() {
	const [faqItems, setFaqItems] = useState<FaqItemType[] | "loading">(
		"loading"
	);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		getFaq()
			.then((res) => setFaqItems(res.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	return (
		<div className="mt-12 ml-16 mr-5 mb-[84px] max-w-[1140px] max-sm:max-w-full max-sm:w-full max-sm:mx-0 max-sm:mt-10 max-sm:mb-16 max-sm:px-6">
			{faqItems === "loading" ? (
				<Loader size={"sm"} />
			) : (
				<FAQ items={faqItems} />
			)}
		</div>
	);
}
