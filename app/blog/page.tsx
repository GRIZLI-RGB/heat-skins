export default function BlogPage() {
	return (
		<div className="pt-[45px] pb-[68px] mx-auto max-w-[1250px] px-5 max-sm:pt-10 max-sm:pb-12">
			<div
				className="flex flex-col items-center text-center pt-11 pb-9 px-5 rounded-lg overflow-hidden"
				style={{
					background:
						"url('/images/blog/big-banner.png') no-repeat center center / cover",
				}}
			>
				<h6 className="uppercase text-[26px] font-bold max-xs:text-[22px]">
					The grand update on HEATSKINS
				</h6>

				<p className="text-[13px] mt-4 mb-6 max-w-[989px]">
					Everyday practice shows that the high quality of positional
					research research plays a crucial role for ovatnt
					methods.ays a crucial role for standard approaches. But
					interactive prototypes are ambiguous and will be made.
				</p>

				<a
					href="/blog/article"
					className="max-xs:w-full uppercase border border-accent-purple rounded-md leading-[100%] bg-accent-purple/20 px-5 py-4 font-bold text-[15px] hover:bg-accent-purple"
				>
					Подробнее ›
				</a>
			</div>

			<div className="mt-7">
				<h6 className="uppercase flex items-center gap-3 font-bold text-[22px]">
					<img src="/icons/blog.png" alt="" />
					<span>Recent blogs</span>
				</h6>

				<div className="mt-[30px] flex items-start gap-4 max-sm:mt-6 max-sm:flex-col">
					<div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 w-full max-xs:!grid-cols-1">
						{[...new Array(9)].map((_, index) => (
							<a
								className="max-sm:p-3.5 p-5 rounded-lg overflow-hidden h-[200px] flex flex-col items-start leading-[100%] relative group transition-all duration-300 ease-in-out"
								href="/blog/article"
								key={index}
							>
								<div
									className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500 ease-in-out -z-10"
									style={{
										backgroundImage:
											"url('/images/blog/small-banner.png')",
									}}
								></div>
								<h6 className="text-[16px] font-semibold mt-auto">
									But interactive prototypes
								</h6>
								<p className="text-[13px] text-secondary-text font-medium mt-1 mb-4">
									Although their very existence brings
								</p>
								<button className="text-[12px] uppercase font-bold group-hover:text-accent-purple">
									Read completely ›
								</button>
							</a>
						))}
					</div>

					<div className="bg-primary-background rounded-lg p-5 w-[290px] shrink-0 max-sm:w-full">
						<h6 className="flex items-center gap-2.5 text-[16px] font-bold">
							<img src="/icons/star.png" alt="" />
							<span>Popular blogs</span>
						</h6>

						<div className="mt-5 flex flex-col gap-2">
							{[...new Array(5)].map((_, index) => (
								<a
									href="/blog/article"
									key={index}
									className="rounded-md bg-[#161b27] px-4 py-3 group hover:bg-secondary-background"
								>
									<div className="font-semibold group-hover:text-accent-purple">
										Everyday practice shows
									</div>
									<div className="text-[11px] text-secondary-text">
										Quality of positional research plays
									</div>
									<div className="text-[11px] text-[#626a7d] mt-3.5">
										23 Feb 2024, 16:48
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
