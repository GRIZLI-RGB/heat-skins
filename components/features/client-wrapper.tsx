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

			{/* <button
				onClick={() => setIsOpenModalsModal(!isOpenModalsModal)}
				className="fixed bottom-5 right-5 bg-[#f53361] text-white px-4 py-2 rounded-md leading-[100%] hover:brightness-125"
			>
				Модалки
			</button> */}

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
							type="number"
							label="Give away"
							placeholder="Enter number"
						/>
						<Input
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
				2
			</Modal>

			<Modal
				open={isOpenPurchaseItemsModal}
				onClose={() => setIsOpenPurchaseItemsModal(false)}
			>
				3
			</Modal>

			<Modal
				open={isOpenSuccessfulReplenishmentModal}
				onClose={() => setIsOpenSuccessfulReplenishmentModal(false)}
			>
				4
			</Modal>

			<Modal
				open={isOpenNotEnoughMoneyModal}
				onClose={() => setIsOpenNotEnoughMoneyModal(false)}
			>
				5
			</Modal>

			<Modal
				open={isOpenEnoughMoneyModal}
				onClose={() => setIsOpenEnoughMoneyModal(false)}
			>
				6
			</Modal>
		</>
	);
}
