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
		setGlobalLoading(true);

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

					{/* <p className="text-[#c2c8d6] mt-1 text-[13px] max-sm:text-[12px]">
						Everyday practice shows that the high quality of
						positional research research plays a crucial role for
						ovatnt methods.
						<br />
						But interactive prototypes are ambiguous and will be
						made.
					</p> */}

					{article.photo_url && (
						<img
							className="block rounded-md overflow-hidden my-7 object-cover min-h-[130px] max-h-[480px] w-full"
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

					{/* <p>
							Being just a part of the overall picture, replicated
							from foreign sources, modern research has been
							subjected to a series of independent studies.
						</p>

						<p>
							The high level of involvement of representatives of
							the target audience is a clear proof of a simple
							fact: synthetic testing plays an important role in
							shaping the timely completion of a super task. For
							the modern world, the basic vector of development
							plays an important role in the formation of new
							principles for the formation of the material,
							technical and personnel base.
						</p>

						<p>
							Clearly, the conclusions drawn on the basis of
							Internet analytics are only a{" "}
							<span className="text-[#f5aa33]">
								method of political participation
							</span>
							and are functionally separated into independent
							elements.
						</p>

						<p>
							As has been repeatedly mentioned, some features of
							domestic policy have been declared to violate
							universal norms of ethics and morality. The clarity
							of our position is obvious: the new model of
							organizational activity requires us to analyze
							thoughtful reasoning. In our quest to improve the
							user experience, we are missing the key
						</p>

						<p className="font-medium text-[#515a6f]">
							Banal but irrefutable conclusions, as well as
							interactive prototypes, call us to new achievements,
							which, in turn, should be described in as much
							detail as possible. Each of us understands the
							obvious thing: constant quantitative growth and the
							scope of our activity plays an important role in the
							formation of clustering efforts. In our quest to
							improve the user experience, we miss that the
							shareholders of the largest companies are calling us
							to new achievements, which, in turn, must be called
							to account. Within the framework of the
							specification of modern standards, representatives
							of modern social reserves, initiated exclusively
							synthetically, are considered exclusively in the
							context of marketing and financial prerequisites.
						</p>

						<p>
							Within the framework of the specification of modern
							standards, the basic scenarios of user behavior are
							nothing more than the quintessence of marketings
							victory over reason and should be considered
							exclusively in the context of marketing and
							financial prerequisites. Cartel agreements are not
							allowed
						</p> */}
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
