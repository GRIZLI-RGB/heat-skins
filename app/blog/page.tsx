"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";

import { BlogArticleType } from "@/lib/types";
import { _globalLoading_ } from "@/lib/store";
import { getBlogArticles, getBlogBannerArticle } from "@/lib/api";
import { formatDate, truncateString } from "@/lib/utils";

export default function BlogPage() {
	const [articles, setArticles] = useState<BlogArticleType[] | null>(null);
	const [popularArticles, setPopularArticles] = useState<
		BlogArticleType[] | null
	>(null);
	const [bannerArticle, setBannerArticle] = useState<BlogArticleType | null>(
		null
	);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		getBlogBannerArticle()
			.then((res) => {
				setBannerArticle(res.data);
			})
			.finally(() => {
				getBlogArticles({
					limit: 5,
					most_viewed: true,
				})
					.then((res) => setPopularArticles(res.data))
					.finally(() => {
						(async () => {
							try {
								const firstPage = await getBlogArticles({
									page: 1,
									limit: 10,
								});
								const totalPages = firstPage.data.last_page;
								const allArticles = [...firstPage.data.data];

								for (let page = 2; page <= totalPages; page++) {
									const res = await getBlogArticles({
										page,
										limit: 10,
									});
									allArticles.push(...res.data.data);
								}

								setArticles(allArticles);
							} finally {
								setGlobalLoading(false);
							}
						})();
					});
			});
	}, []);

	return (
		<div className="pt-[45px] pb-[68px] mx-auto max-w-[1250px] px-5 max-sm:pt-10 max-sm:pb-12">
			{bannerArticle && (
				<div
					className="relative pt-11 pb-9 px-5 rounded-lg overflow-hidden"
					style={{
						background: `url(${bannerArticle.preview_url}) no-repeat center center / cover`,
					}}
				>
					<div className="absolute bg-[#19183e]/70 left-0 top-0 w-full h-full" />

					<div className="raise-up flex flex-col items-center text-center">
						<h6 className="uppercase text-[26px] font-bold max-xs:text-[22px]">
							{truncateString(bannerArticle.title)}
						</h6>

						<p className="text-[13px] mt-4 mb-6 max-w-[989px]">
							{truncateString(bannerArticle.content, 128)}
						</p>

						<Link
							href={`/blog/${bannerArticle.id}`}
							className="max-xs:w-full uppercase border border-accent-purple rounded-md leading-[100%] bg-accent-purple/20 px-5 py-4 font-bold text-[15px] hover:bg-accent-purple"
						>
							Подробнее ›
						</Link>
					</div>
				</div>
			)}

			{articles && (
				<div className="mt-7">
					<h6 className="uppercase flex items-center gap-3 font-bold text-[22px]">
						<img src="/icons/blog.png" alt="" />
						<span>Recent blogs</span>
					</h6>

					<div className="mt-[30px] flex items-start gap-4 max-sm:mt-6 max-sm:flex-col">
						<div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 w-full max-xs:!grid-cols-1">
							{articles.map((article) => (
								<Link
									className="relative max-sm:p-3.5 p-5 rounded-lg overflow-hidden h-[200px] leading-[100%] group"
									href={`/blog/${article.id}`}
									key={article.id}
								>
									<div className="absolute bg-[#19183e]/70 left-0 top-0 w-full h-full z-[0]" />

									<img
										className="absolute inset-0 bg-cover bg-center group-hover:scale-110 w-full h-full object-cover z-[-1]"
										src={article.preview_url.toString()}
										alt=""
									/>

									<div className="raise-up flex flex-col items-start h-full">
										<h6 className="leading-[120%] text-[16px] font-semibold mt-auto">
											{truncateString(article.title)}
										</h6>

										<p
											className="break-all text-[13px] text-secondary-text font-medium mt-1 mb-4"
											dangerouslySetInnerHTML={{
												__html: truncateString(
													article.content,
													128
												),
											}}
										/>

										<button className="text-[12px] uppercase font-bold group-hover:text-accent-purple">
											Read completely ›
										</button>
									</div>
								</Link>
							))}
						</div>

						{popularArticles && (
							<div className="bg-primary-background rounded-lg p-5 w-[290px] shrink-0 max-sm:w-full">
								<h6 className="flex items-center gap-2.5 text-[16px] font-bold">
									<img src="/icons/star.png" alt="" />
									<span>Popular blogs</span>
								</h6>

								<div className="mt-5 flex flex-col gap-2">
									{popularArticles.map((article) => (
										<Link
											href={`/blog/${article.id}`}
											key={article.id}
											className="rounded-md bg-[#161b27] px-4 py-3 group hover:bg-secondary-background"
										>
											<div className="font-semibold group-hover:text-accent-purple leading-[120%] mb-[3px]">
												{truncateString(article.title)}
											</div>

											<div
												className="break-words text-[11px] text-secondary-text"
												dangerouslySetInnerHTML={{
													__html: truncateString(
														article.content,
														128
													),
												}}
											/>

											<div className="text-[11px] text-[#626a7d] mt-3.5">
												{formatDate(article.created_at)}
											</div>
										</Link>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
