import FAQ from "@/components/ui/faq";

export default function FaqPage() {
	return (
		<div className="mt-12 ml-16 mr-5 mb-[84px] max-w-[1140px] max-sm:max-w-full max-sm:w-full max-sm:mx-0 max-sm:mt-10 max-sm:mb-16 max-sm:px-6">
			<FAQ
				items={[
					...new Array(8).fill({
						question:
							"Your personal information when  private company limited by shares",
						answer: "We are In-Game Solutions PTE. LTD, a private company limited by shares, registration number 202435257H, has its registered address and the principal place of Our Privacy Policy meets requirements of the European Union General Data Protection Regulation (GDPR) and Singapore Personal Data Protection Act.<br/><br/>This Privacy Policy explains how We collect, use, share, and protect Your personal information when You use Our Website. By accessing or using Our services,",
					}),
				]}
			/>
		</div>
	);
}
