import clsx from "clsx";

import Logo from "./logo";

const Navigation = ({
	title,
	links,
	className,
}: {
	title?: string;
	links: string[];
	className?: string;
}) => {
	return (
		<nav
			className={clsx(
				"text-[#b1b7c5] flex flex-col gap-3 items-start max-md:text-center max-md:items-center",
				className
			)}
		>
			{title && (
				<h6 className="text-white mb-1 font-extrabold uppercase">
					{title}
				</h6>
			)}

			{links.map((text) => (
				<a
					className="font-semibold text-[12px] hover:text-accent-purple"
					href="#"
					key={text}
				>
					{text}
				</a>
			))}
		</nav>
	);
};

export default function Footer() {
	return (
		<footer className="bg-primary-background pt-[42px] pb-[49px] pl-[273px] pr-[60px] border-t border-primary-border relative max-lg:pr-6 max-lg:pl-[210px] max-md:py-6 max-md:!px-5">
			<div className="flex items-start max-md:flex-col max-md:gap-6 max-md:items-center">
				<Logo className="!hidden max-md:!inline-flex" />

				<div className="grid grid-cols-2 gap-5 shrink-0 max-md:grid-cols-4">
					{["vk", "twitter", "discord", "steam"].map((social) => (
						<a
							className="group w-[56px] aspect-square bg-[#191e2b] rounded-md flex-middle max-md:w-10"
							href="#"
							key={social}
						>
							<img
								className="group-hover:brightness-[1000%]"
								src={`/icons/social/${social}.png`}
								alt=""
							/>
						</a>
					))}
				</div>

				<div className="flex gap-16 max-md:ml-0 max-md:text-center max-md:gap-10">
					<Navigation
						className="ml-[58px] mr-[64px] max-md:ml-0 max-md:mr-0"
						title="Support"
						links={[
							"FAQ",
							"How does it work?",
							"Guarantees",
							"Contacts",
						]}
					/>

					<Navigation
						title="Useful"
						links={["Blog", "Reviews on Huble", "Site rules"]}
					/>
				</div>

				<div className="flex flex-col items-end ml-auto max-md:justify-center max-md:ml-0">
					<Logo className="max-md:hidden" />

					<p className="text-[#565d6e] text-[13px] font-medium leading-[22px] text-right mt-[74px] max-md:text-center max-md:mt-6 max-md:text-[12px]">
						HeatSkins website is operated by In-Game Solutions PTE.
						LTD
						<br />© 2020-2025 HeatSkins, All Rights Reserved
					</p>
				</div>
			</div>

			<img
				className="absolute left-0 bottom-0 max-md:hidden"
				src="/images/player.png"
				alt=""
			/>
		</footer>
	);
}
