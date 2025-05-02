"use client";

import { useSetAtom } from "jotai";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getBlogArticle, getBlogArticles } from "@/lib/api";
import { _globalLoading_ } from "@/lib/store";
import { BlogArticleType } from "@/lib/types";
import { formatDate, truncateString } from "@/lib/utils";

export default function BlogArticlePage() {
	const { id } = useParams();

	const [article, setArticle] = useState<BlogArticleType | null>(null);
	const [recentArticles, setRecentArticles] = useState<
		BlogArticleType[] | null
	>(null);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		if (id) {
			getBlogArticle(id.toString())
				.then((res) => setArticle(res.data))
				.finally(() => {
					getBlogArticles({ limit: 4 })
						.then((res) => setRecentArticles(res.data.data))
						.finally(() => setGlobalLoading(false));
				});
		} else {
			window.location.href = "/";
		}
	}, [id]);

	if (article) {
		return (
			<div className="py-12 px-5 max-w-[1250px] mx-auto max-md:py-8">
				<article>
					<div className="flex items-center justify-between gap-2.5 max-xs:flex-col-reverse max-xs:items-start max-xs:gap-0">
						<h1 className="uppercase text-[26px] font-bold max-sm:text-[22px]">
							{article.title}
						</h1>
						<span className="text-[#626a7d] text-[11px] shrink-0">
							{formatDate(article.created_at)}
						</span>
					</div>

					{article.photo_url && (
						<img
							className="block rounded-md overflow-hidden my-7 mx-auto"
							src={article.photo_url.toString()}
							alt=""
						/>
					)}

					<div
						className="[&>p]:text-[13px] [&>p]:leading-[21px] [&>p]:my-6 font-semibold max-sm:[&>p]:text-[12px]"
						dangerouslySetInnerHTML={{
							__html: article.content,
						}}
					/>
				</article>

				{recentArticles && (
					<>
						<div className="h-px w-full bg-[#191e2b] my-10" />

						<div className="flex flex-col gap-7">
							<h6 className="uppercase flex items-center gap-3 font-bold text-[22px]">
								<img src="/icons/blog.png" alt="" />
								<span>Recent blogs</span>
							</h6>

							<div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 w-full max-xs:!grid-cols-1">
								{recentArticles.map((recentArticle) => (
									<Link
										className="max-sm:p-3.5 p-5 rounded-lg overflow-hidden h-[200px] leading-[100%] relative group transition-all duration-300 ease-in-out"
										href={`/blog/${recentArticle.id}`}
										key={recentArticle.id}
									>
										<div className="absolute bg-[#19183e]/70 left-0 top-0 w-full h-full z-[0]" />

										<img
											className="absolute inset-0 object-cover group-hover:scale-110 w-full h-full bg-cover bg-center z-[-1]"
											src={recentArticle.preview_url.toString()}
											alt=""
										/>

										<div className="h-full raise-up flex flex-col items-start">
											<h6 className="text-[16px] font-semibold mt-auto leading-[120%]">
												{truncateString(
													recentArticle.title
												)}
											</h6>

											<p
												className="break-all text-[13px] text-secondary-text font-medium mt-1 mb-4"
												dangerouslySetInnerHTML={{
													__html: truncateString(
														recentArticle.content,
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
						</div>
					</>
				)}
			</div>
		);
	}
}
