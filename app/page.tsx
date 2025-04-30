"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

import DesiredItemDropdown from "@/components/features/desired-item-dropdown";
import FilterDropdown from "@/components/features/filter-dropdown";
import ItemCard from "@/components/features/item-card";
import { getItemFilters, getItems } from "@/lib/api";
import { ApiGetItemsType, ItemType } from "@/lib/types";
import { useAtomValue, useSetAtom } from "jotai";
import { _globalLoading_, _searchQuery_ } from "@/lib/store";
import { useDebouncedValue } from "@/lib/hooks";
import { useDebounceValue } from "usehooks-ts";

const FilterByType = ({ className }: { className?: string }) => {
	return (
		<section
			className={clsx(
				"flex gap-2.5 border-b border-[#1b212e] p-[18px] max-lg:gap-1",
				className
			)}
		>
			{[
				"Knife",
				"Gun",
				"Rifle",
				"AWP",
				"Submachine",
				"Shotgun",
				"Machinegun",
				"Gloves",
				"Sticker",
				"Other",
			].map((item) => (
				<DesiredItemDropdown
					className="max-lg:max-w-[200px] max-xs:!max-w-none"
					text={item}
					key={item}
					options={[
						{
							id: "1",
							name: "Karambit",
							image: "/images/knife.png",
						},
						{
							id: "2",
							name: "Knife",
							image: "/images/knife.png",
						},
					]}
					onSelect={(option) => console.log("Selected:", option)}
				/>
			))}
		</section>
	);
};

interface FiltersState {
	types: string[];
	phases: string[];
	price_min: string;
	price_max: string;
	wears: string[];
	rarities: string[];
	float_min: string;
	float_max: string;
	stattrack?: boolean;
	souvenir?: boolean;
	stickers?: number[];
}

export default function HomePage() {
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [items, setItems] = useState<ItemType[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const observer = useRef<IntersectionObserver | null>(null);
	const bottomRef = useRef(null);

	const searchQuery = useAtomValue(_searchQuery_);
	const searchQueryDebounced = useDebouncedValue(searchQuery, 800);

	const [filters, setFilters] = useState<FiltersState>({
		types: [],
		phases: [],
		price_min: "",
		price_max: "",
		wears: [],
		rarities: [],
		float_min: "",
		float_max: "",
	});

	const [debouncedFilters] = useDebounceValue(filters, 500);

	useEffect(() => {
		setItems([]);
		setPage(1);
		setHasMore(true);
		fetchItems();
	}, [debouncedFilters]);

	const [filtersData, setFiltersData] = useState({
		types: [],
		phases: [],
		min_price: "0",
		max_price: "0",
		wears: [],
		rarities: [],
		float_min: 0,
		float_max: 1,
	});

	useEffect(() => {
		const loadFilters = async () => {
			try {
				const res = await getItemFilters();
				setFiltersData(res.data);
			} catch (err) {
				console.error("Failed to load filters", err);
			}
		};

		loadFilters();
	}, []);

	const fetchItems = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);

		try {
			const apiFilters: ApiGetItemsType = { page };

			if (filters.types.length > 0) apiFilters.types = filters.types;
			if (filters.phases.length > 0) apiFilters.phases = filters.phases;
			if (filters.price_min)
				apiFilters.price_min = parseFloat(filters.price_min);
			if (filters.price_max)
				apiFilters.price_max = parseFloat(filters.price_max);
			if (filters.wears.length > 0) apiFilters.wears = filters.wears;
			if (filters.rarities.length > 0)
				apiFilters.rarities = filters.rarities;
			if (filters.float_min)
				apiFilters.float_min = parseFloat(filters.float_min);
			if (filters.float_max)
				apiFilters.float_max = parseFloat(filters.float_max);
			if (filters.stattrack !== undefined)
				apiFilters.stattrack = filters.stattrack;
			if (filters.souvenir !== undefined)
				apiFilters.souvenir = filters.souvenir;

			if (searchQueryDebounced !== "") {
				apiFilters.search = searchQueryDebounced;
			}

			const res = await getItems(apiFilters);

			if (res.data.data.length === 0) {
				setHasMore(false);
			} else {
				setItems((prev) =>
					page === 1 ? res.data.data : [...prev, ...res.data.data]
				);
				setPage((prev) => prev + 1);
			}
		} catch (err) {
			console.error("Ошибка загрузки:", err);
		} finally {
			setLoading(false);
			setGlobalLoading(false);
		}
	}, [loading, hasMore, page, filters, searchQueryDebounced]);

	useEffect(() => {
		setItems([]);
		setPage(1);
		setHasMore(true);
		fetchItems();
	}, [searchQueryDebounced]);

	useEffect(() => {
		if (!bottomRef.current) return;

		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(
			([entry]) => {
				if (
					entry.isIntersecting &&
					hasMore &&
					!loading &&
					!searchQueryDebounced
				) {
					fetchMoreItems(); // Выносим логику подгрузки в отдельную функцию
				}
			},
			{
				root: null,
				rootMargin: "200px",
				threshold: 0.1,
			}
		);

		observer.current.observe(bottomRef.current);

		return () => {
			if (observer.current) observer.current.disconnect();
		};
	}, [bottomRef.current, hasMore, loading, searchQueryDebounced]);

	const fetchMoreItems = useCallback(async () => {
		if (loading || !hasMore || searchQueryDebounced) return;

		setLoading(true);

		try {
			const res = await getItems({ page });

			if (res.data.data.length === 0) {
				setHasMore(false);
			} else {
				setItems((prev) => [...prev, ...res.data.data]);
				setPage((prev) => prev + 1);
			}
		} catch (err) {
			console.error("Ошибка загрузки:", err);
		} finally {
			setLoading(false);
			setGlobalLoading(false);
		}
	}, [page, loading, hasMore, searchQueryDebounced]);

	return (
		<>
			<div className="p-5 pb-1 hidden max-xs:block">
				<button
					className="hover:brightness-125 max-w-full flex items-center justify-center uppercase text-center text-[16px] font-bold bg-primary-background border border-primary-border rounded-md w-full h-12"
					onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
				>
					Filter by type
					<svg
						className={`ml-2 transition-transform duration-200 ${
							isMobileFilterOpen ? "rotate-180" : ""
						}`}
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 9L12 16L5 9"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>

			<div
				className={clsx(
					"backdrop-blur-md left-0 top-0 w-full h-full fixed z-[49]",
					isMobileFilterOpen
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				)}
			/>

			<div
				className={clsx(
					"fixed left-0 right-0 bottom-0 z-50 bg-primary-background overflow-hidden",
					isMobileFilterOpen
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				)}
			>
				<div className="p-5 border-t border-primary-border rounded-t-lg">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-bold">Filter by type</h3>

						<button
							onClick={() => setIsMobileFilterOpen(false)}
							className="hover:brightness-[2000%]"
						>
							<img
								src="/icons/close.png"
								className="brightness-150"
								alt=""
							/>
						</button>
					</div>

					<div className="max-h-[60vh] overflow-y-auto hide-scrollbar pb-4">
						<FilterByType className="grid grid-cols-1 gap-2 !p-0 !border-0" />
					</div>
				</div>
			</div>

			{/* <FilterByType className="max-lg:flex-wrap max-xs:hidden" /> */}

			<div className="flex items-start max-sm:flex-col">
				<section className="border-r max-sm:border-r-0 max-sm:w-full border-[#1b212e] p-[18px] pb-[90px] max-sm:pb-0 w-[274px] shrink-0">
					<div className="flex w-full">
						<div
							className={clsx(
								"justify-center relative h-12 flex items-center gap-3 border w-full px-[18px] bg-[#11151e] overflow-hidden border-accent-purple z-[5] rounded-md"
							)}
						>
							<img
								className={
									"!transition-none filter-to-accent-purple"
								}
								src={`/icons/cs2.png`}
								alt=""
							/>

							<span className="text-[13px] font-semibold">
								CS2
							</span>

							<img
								className={clsx(
									"absolute top-0 left-0 bottom-0 h-full opacity-100"
								)}
								src="/images/decorations/tab-shadow.png"
								alt=""
							/>
						</div>
					</div>

					<div className="my-[18px] flex items-center justify-between gap-2">
						<div className="flex gap-3 items-center">
							<img src="/icons/settings.png" alt="" />
							<span className="font-bold">FILTERS</span>
						</div>

						<button
							className="text-[#959dae] font-medium hover:brightness-125"
							onClick={() =>
								setFilters({
									types: [],
									phases: [],
									price_min: "",
									price_max: "",
									wears: [],
									rarities: [],
									float_min: "",
									float_max: "",
								})
							}
						>
							Reset
						</button>
					</div>

					<div className="flex flex-col gap-1">
						<FilterDropdown
							variant="type"
							options={filtersData.types}
							selected={filters.types}
							onChange={(selected) =>
								setFilters({
									...filters,
									types: selected as string[],
								})
							}
						/>

						<FilterDropdown
							defaultOpen
							variant="price"
							min={filtersData.min_price}
							max={filtersData.max_price}
							selectedMin={filters.price_min}
							selectedMax={filters.price_max}
							onChangeRange={(min, max) =>
								setFilters({
									...filters,
									price_min: min,
									price_max: max,
								})
							}
						/>

						<FilterDropdown
							variant="float"
							min={filtersData.float_min}
							max={filtersData.float_max}
							selectedMin={filters.float_min}
							selectedMax={filters.float_max}
							onChangeRange={(min, max) =>
								setFilters({
									...filters,
									float_min: min,
									float_max: max,
								})
							}
						/>

						<FilterDropdown
							variant="quality"
							options={filtersData.wears}
							selected={filters.wears}
							onChange={(selected) =>
								setFilters({
									...filters,
									wears: selected as string[],
								})
							}
						/>

						<FilterDropdown
							variant="phase"
							options={filtersData.phases}
							selected={filters.phases}
							onChange={(selected) =>
								setFilters({
									...filters,
									phases: selected as string[],
								})
							}
						/>

						<FilterDropdown
							variant="rarity"
							options={filtersData.rarities}
							selected={filters.rarities}
							onChange={(selected) =>
								setFilters({
									...filters,
									rarities: selected as string[],
								})
							}
						/>

						<FilterDropdown
							variant="hold"
							options={["StatTrak™", "Souvenir"]}
							selected={[
								...(filters.stattrack ? ["StatTrak™"] : []),
								...(filters.souvenir ? ["Souvenir"] : []),
							]}
							onChange={(selected) =>
								setFilters({
									...filters,
									stattrack: selected.includes("StatTrak™"),
									souvenir: selected.includes("Souvenir"),
								})
							}
						/>
					</div>
				</section>

				<section className="w-full px-[18px] relative">
					<h3 className="flex items-center gap-3 py-8 pl-[14px]">
						<img src="/images/cs2.png" alt="" />

						<span className="text-[18px] font-bold">
							Counter strike 2
						</span>
					</h3>

					<div className="flex gap-3 flex-wrap max-h-[850px] overflow-auto hide-scrollbar max-sm:grid max-sm:max-h-[600px] max-sm:gap-2 max-sm:grid-cols-2 max-[480px]:grid-cols-1">
						{items.map((item) => (
							<ItemCard key={item.id} item={item} />
						))}
						{loading && (
							<div className="w-full text-center p-4">
								Loading...
							</div>
						)}
						<div ref={bottomRef} className="w-full h-4" />   {" "}
					</div>

					<img
						className="absolute left-0 right-0 bottom-0 pointer-events-none"
						src="/images/decorations/items-shadow.png"
						alt=""
					/>
				</section>
			</div>
		</>
	);
}
