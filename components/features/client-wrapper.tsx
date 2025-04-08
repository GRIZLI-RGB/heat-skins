"use client";

import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import Header from "../ui/header";
import Footer from "../ui/footer";

import { _disableBodyScroll_ } from "@/lib/store";
import Modal from "../ui/modal";
import Input from "../ui/input";
import CurrencyDropdown from "./currency-dropdown";

const Button = ({ text }: { text: string }) => {
	return (
		<button className="uppercase font-bold border border-accent-purple rounded-lg bg-accent-purple/20 hover:bg-accent-purple leading-[100%] w-full py-[25px] text-[19px] max-xs:py-5">
			{text}
		</button>
	);
};

export default function ClientWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [disableBodyScroll, setDisableBodyScroll] =
		useAtom(_disableBodyScroll_);

	const [isOpenModalsModal, setIsOpenModalsModal] = useState(false);

	const [isOpenReplenishmentModal, setIsOpenReplenishmentModal] =
		useState(false);
	const [isOpenPurchasePaymentModal, setIsOpenPurchasePaymentModal] =
		useState(false);
	const [isOpenPurchaseItemsModal, setIsOpenPurchaseItemsModal] =
		useState(false);
	const [
		isOpenSuccessfulReplenishmentModal,
		setIsOpenSuccessfulReplenishmentModal,
	] = useState(false);
	const [isOpenNotEnoughMoneyModal, setIsOpenNotEnoughMoneyModal] =
		useState(false);
	const [isOpenEnoughMoneyModal, setIsOpenEnoughMoneyModal] = useState(false);

	useEffect(() => {
		const osInstance = OverlayScrollbars(document.body, {
			overflow: { x: "hidden", y: "scroll" },
			scrollbars: { theme: "os-theme-light", autoHide: "scroll" },
		});

		return () => {
			osInstance?.destroy();
		};
	}, []);

	useEffect(() => {
		const osInstance = OverlayScrollbars(document.body);
		if (!osInstance) return;

		osInstance.options({
			overflow: { y: disableBodyScroll ? "hidden" : "scroll" },
		});
	}, [disableBodyScroll]);

	useEffect(() => {
		setDisableBodyScroll(
			isOpenReplenishmentModal ||
				isOpenPurchasePaymentModal ||
				isOpenPurchaseItemsModal ||
				isOpenSuccessfulReplenishmentModal ||
				isOpenNotEnoughMoneyModal ||
				isOpenEnoughMoneyModal ||
				isOpenModalsModal
		);
	}, [
		isOpenEnoughMoneyModal,
		isOpenNotEnoughMoneyModal,
		isOpenPurchaseItemsModal,
		isOpenPurchasePaymentModal,
		isOpenReplenishmentModal,
		isOpenSuccessfulReplenishmentModal,
		setDisableBodyScroll,
		isOpenModalsModal,
	]);

	return (
		<>
			<Header />

			<main className="flex-1">{children}</main>

			<Footer />

			<button
				onClick={() => setIsOpenModalsModal(!isOpenModalsModal)}
				className="fixed bottom-5 right-5 bg-[#f53361] text-white px-4 py-2 rounded-md leading-[100%] hover:brightness-125"
			>
				Модалки
			</button>

			<Modal
				open={isOpenModalsModal}
				onClose={() => setIsOpenModalsModal(false)}
			>
				<div className="flex flex-col p-10 gap-2.5">
					{[
						{
							text: "Replenishment",
							onClick: () => setIsOpenReplenishmentModal(true),
						},
						{
							text: "Purchase payment",
							onClick: () => setIsOpenPurchasePaymentModal(true),
						},
						{
							text: "Purchase items",
							onClick: () => setIsOpenPurchaseItemsModal(true),
						},
						{
							text: "Successful replenishment",
							onClick: () =>
								setIsOpenSuccessfulReplenishmentModal(true),
						},
						{
							text: "Not enough money",
							onClick: () => setIsOpenNotEnoughMoneyModal(true),
						},
						{
							text: "Enough money",
							onClick: () => setIsOpenEnoughMoneyModal(true),
						},
					].map(({ text, onClick }) => (
						<button
							className="w-full bg-secondary-background rounded-md h-10 px-8 leading-[100%] font-medium hover:brightness-125"
							key={text}
							onClick={() => {
								setIsOpenModalsModal(false);
								onClick();
							}}
						>
							{text}
						</button>
					))}
				</div>
			</Modal>

			<Modal
				open={isOpenReplenishmentModal}
				onClose={() => setIsOpenReplenishmentModal(false)}
			>
				<div className="pb-8 mx-8 max-xs:py-5 max-xs:mx-5 pt-7 w-[480px] max-sm:w-auto">
					<h6 className="mb-6 flex items-center gap-4 text-[22px] font-bold">
						<img src="/icons/wallet.png" alt="" />
						<span className="uppercase">Replenishment</span>
					</h6>

					<CurrencyDropdown />

					<div className="grid grid-cols-3 gap-[15px] mt-8 mb-9 max-xs:gap-3 max-xs:grid-cols-2 max-xs:my-5">
						{[...new Array(9)].map((_, index) => (
							<button
								className="max-xs:p-6 flex-middle bg-[#181d2a] hover:brightness-125 rounded-md h-[100px]"
								key={index}
							>
								<img src="/images/stripe.png" alt="" />
							</button>
						))}
					</div>

					<div className="max-xs:flex-col max-xs:gap-2 flex items-start gap-5">
						<Input
							onlyText={false}
							type="number"
							label="Give away"
							placeholder="Enter number"
						/>
						<Input
							onlyText={false}
							type="number"
							label="Receive"
							placeholder="Enter number"
						/>
					</div>

					<div className="mt-3 mb-8 font-medium text-secondary-text text-[11px] leading-[19px]">
						<p>
							Minimum deposit amount{" "}
							<span className="text-accent-purple">$10</span>
						</p>

						<p>
							By clicking the button below, you agree to the{" "}
							<a
								href="#"
								target="_blank"
								className="text-primary-link hover:brightness-125"
							>
								privacy policy
							</a>{" "}
							and{" "}
							<a
								href="#"
								target="_blank"
								className="text-primary-link hover:brightness-125"
							>
								terms of use
							</a>
						</p>
					</div>

					<button className="uppercase font-bold border border-accent-purple rounded-lg bg-accent-purple/20 hover:bg-accent-purple leading-[100%] w-full py-[25px] text-[19px] max-xs:py-5">
						Proceed to payment ›
					</button>
				</div>
			</Modal>

			<Modal
				open={isOpenPurchasePaymentModal}
				onClose={() => setIsOpenPurchasePaymentModal(false)}
			>
				<div className="p-12 min-w-[450px] text-center max-sm:min-w-0 max-sm:p-5">
					<h6 className="font-medium text-[22px] uppercase mt-1.5">
						Purchase payment
					</h6>

					<div className="relative py-10 flex-middle">
						<img className="" src="/icons/loader.png" alt="" />

						<img
							src="/images/decorations/outer-shadow.png"
							className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
							alt=""
						/>
					</div>

					<div className="uppercase text-[16px] mt-1">
						Waiting for payment
					</div>

					<p className="text-secondary-text text-[13px] mt-3.5 mb-8">
						Click on the button below to pay.
						<br />
						The payment will be credited within 15 minutes.
						<br />
						You have 60 minutes to pay
					</p>

					<Button text="Proceed to payment" />
				</div>
			</Modal>

			<Modal
				open={isOpenPurchaseItemsModal}
				onClose={() => setIsOpenPurchaseItemsModal(false)}
			>
				<div className="p-12 min-w-[450px] text-center max-sm:min-w-0 max-sm:p-5">
					<h6 className="font-medium text-[22px] uppercase mt-1.5">
						Purchase of items
					</h6>

					<div className="relative py-10 flex-middle">
						<img className="" src="/icons/bag.png" alt="" />

						<img
							src="/images/decorations/outer-shadow.png"
							className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
							alt=""
						/>
					</div>

					<div className="uppercase text-[16px] mt-1">
						The payment was successfully made
					</div>

					<p className="text-secondary-text text-[13px] mt-3.5 mb-8">
						Skins have been successfully purchased
						<br />
						Go to your personal account to receive the items
					</p>

					<Button text="Go to inventory" />
				</div>
			</Modal>

			<Modal
				open={isOpenSuccessfulReplenishmentModal}
				onClose={() => setIsOpenSuccessfulReplenishmentModal(false)}
			>
				<div className="p-12 min-w-[450px] text-center max-sm:min-w-0 max-sm:p-5">
					<h6 className="font-medium text-[22px] uppercase mt-1.5">
						Replenishment
					</h6>

					<div className="relative py-10 flex-middle">
						<img className="" src="/icons/okey.png" alt="" />

						<img
							src="/images/decorations/outer-shadow.png"
							className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
							alt=""
						/>
					</div>

					<div className="uppercase text-[16px] mt-1">
						The payment was successfully made
					</div>

					<p className="text-secondary-text text-[13px] mt-3.5 mb-8">
						The balance is topped up on{" "}
						<span className="text-accent-purple">$500</span>
					</p>

					<button className="uppercase font-bold border border-primary-border bg-[#151a26] hover:brightness-125 rounded-lg leading-[100%] w-full py-[25px] text-[19px] max-xs:py-5">
						Go to shopping
					</button>
				</div>
			</Modal>

			<Modal
				open={isOpenNotEnoughMoneyModal}
				onClose={() => setIsOpenNotEnoughMoneyModal(false)}
			>
				<div className="p-12 min-w-[450px] text-center max-sm:min-w-0 max-sm:p-5">
					<h6 className="font-medium text-[22px] uppercase">
						You get
					</h6>

					<span className="font-medium">
						Total amount of{" "}
						<span className="text-accent-purple">$800</span>
					</span>

					<div className="my-9 flex items-center gap-6 bg-[#181d2a] rounded-md px-6 py-4">
						<img className="" src="/images/knife.png" alt="" />

						<div className="flex flex-col font-medium leading-[100%] text-left">
							<span className="text-[13px]">
								Grow scelet | Jeans Followed
							</span>
							<span className="text-secondary-text text-[13px] mt-0.5 mb-3">
								A little worn • 0.657980
							</span>
							<span className="text-[#f82649]">Blocked</span>
						</div>
					</div>

					<p className="text-secondary-text text-[13px] mt-3.5 mb-8 flex items-center gap-2.5">
						<img src="/icons/danger.png" alt="" />
						<span>
							There are not enough funds on the balance sheet :(
						</span>
					</p>

					<Button text="Top up your balance" />
				</div>
			</Modal>

			<Modal
				open={isOpenEnoughMoneyModal}
				onClose={() => setIsOpenEnoughMoneyModal(false)}
			>
				<div className="p-12 min-w-[450px] text-center max-sm:min-w-0 max-sm:p-5">
					<h6 className="font-medium text-[22px] uppercase">
						You get
					</h6>

					<span className="font-medium">
						Total amount of{" "}
						<span className="text-accent-purple">$800</span>
					</span>

					<div className="my-9 flex items-center gap-6 bg-[#181d2a] rounded-md px-6 py-4">
						<img className="" src="/images/knife.png" alt="" />

						<div className="flex flex-col font-medium leading-[100%] text-left">
							<span className="text-[13px]">
								Grow scelet | Jeans Followed
							</span>
							<span className="text-secondary-text text-[13px] mt-0.5 mb-3">
								A little worn • 0.657980
							</span>
							<span className="text-[#61d124]">Unblocked</span>
						</div>
					</div>

					<p className="text-[13px] mt-3.5 mb-8 flex items-center justify-center gap-3">
						<img src="/icons/success.png" alt="" />

						<span className="flex flex-col justify-center items-start">
							<span>The payment was made promptly</span>
							<span className="text-secondary-text ">
								Go to your personal account
							</span>
						</span>
					</p>

					<Button text="Go to inventory" />
				</div>
			</Modal>
		</>
	);
}
