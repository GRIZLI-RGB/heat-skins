"use client";

import clsx from "clsx";
import { useState } from "react";

const FAQItem = ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-primary-background rounded-lg overflow-hidden">
			<button
				className={
					"gap-3 text-left flex justify-between items-center w-full py-[9px] pr-2.5 pl-[22px] font-bold text-[15px] max-xs:text-[14px] border-t border-[#1b212e] group"
				}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className={clsx(isOpen ? "text-accent-purple" : "group-hover:text-accent-purple")}>
					{question}
				</span>

				<div
					className={clsx(
						"rounded-md w-[30px] h-[30px] flex-middle shrink-0",
						isOpen ? "bg-[#1b202d]" : "bg-[#11151e]"
					)}
				>
					<img
						src={`/icons/${isOpen ? "faq-minus" : "faq-plus"}.png`}
						alt=""
					/>
				</div>
			</button>

			<div
				className={`overflow-hidden bg-[#121620] ${
					isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div
					className="text-[#c6cddb] leading-[24px] pt-6 pb-5 pl-6 pr-[60px] max-xs:text-[13px] max-xs:px-4"
					dangerouslySetInnerHTML={{ __html: answer }}
				/>
			</div>
		</div>
	);
};

const FAQ = ({ items }: { items: { question: string; answer: string }[] }) => {
	return (
		<div>
			<h2 className="flex gap-[18px] items-center uppercase text-[19px] font-bold mb-10">
				<img src="/icons/faq.png" alt="" />
				<span>Answers to frequently asked questions</span>
			</h2>

			<div className="flex flex-col gap-5">
				{items.map((item, index) => (
					<FAQItem
						key={index}
						question={item.question}
						answer={item.answer}
					/>
				))}
			</div>
		</div>
	);
};

export default FAQ;
