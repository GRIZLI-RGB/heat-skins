import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect, useRef } from "react";
import { Modal as ReactResponsiveModal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";

export default function Modal({
	open,
	onClose,
	children,
}: {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) {
	const containerRef = useRef(null);

	useEffect(() => {
		if (open) {
			const timer = setTimeout(() => {
				const modalContainer = document.querySelector(
					".react-responsive-modal-container.react-responsive-modal-containerCenter"
				);

				if (modalContainer) {
					OverlayScrollbars(
						{ target: modalContainer as HTMLElement },
						{ scrollbars: { autoHide: "scroll" } }
					);
				}
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [open]);

	return (
		<>
			<div className="pizda" ref={containerRef} />

			<ReactResponsiveModal
				blockScroll
				container={containerRef.current}
				focusTrapped={false}
				center
				closeOnEsc
				open={open}
				onClose={onClose}
				showCloseIcon={false}
				closeOnOverlayClick
				classNames={{
					overlay: "!bg-[#0f131d]/80 !backdrop-blur-sm",
					modal: "!bg-primary-background !rounded-lg !p-0 !shadow-none",
					modalContainer: "",
				}}
			>
				<div className="relative">
					<img
						onClick={onClose}
						className="absolute right-[18px] top-[18px] cursor-pointer block hover:brightness-[2000%]"
						src="/icons/close.png"
						alt=""
					/>
					{children}
				</div>
			</ReactResponsiveModal>
		</>
	);
}
