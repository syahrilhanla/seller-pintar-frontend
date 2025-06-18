"use client";

import { Dot } from "lucide-react";
import Image from "next/image";

import { formatDate } from "@/lib/helpers";

import { useReadLocalStorage } from "usehooks-ts";
import { User } from "@/types/user.type";
import { useCallback, useEffect, useState } from "react";
import { Article } from "@/types/article.type";
import axios from "axios";
import ArticleCard from "@/components/Article/ArticleCard";

const ArticleDetailPage = () => {
	const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

	const previewArticle = useReadLocalStorage<{
		title: string;
		category: string;
		content: string;
		thumbnail: string;
		user: User | null;
	} | null>("preview");

	const getRelatedArticles = useCallback(async () => {
		if (!previewArticle?.category) return;

		try {
			const { data } = await axios.get(
				`https://test-fe.mysellerpintar.com/api/articles?category=47bfaae5-e3d0-436b-a300-28cc882ed4a4&limit=3`
			);

			setRelatedArticles(data.data);
		} catch (error) {
			console.error("Error fetching related articles:", error);
		}
	}, [previewArticle?.category]);

	useEffect(() => {
		console.log(previewArticle?.category, relatedArticles);

		getRelatedArticles();
	}, [getRelatedArticles, previewArticle?.category]);

	return (
		<div className="max-w-5xl min-h-dvh mx-auto mt-12 px-4 gap-4 py-8 flex flex-col items-center">
			<p className=" text-sm md:text-base text-slate-600 flex gap-1 items-center">
				{formatDate(new Date())} <Dot /> Created by{" "}
				{previewArticle?.user?.username || "Unknown User"}
			</p>

			<h1 className="text-3xl font-semibold text-slate-900 text-center">
				{previewArticle?.title}
			</h1>

			<Image
				src={
					previewArticle?.thumbnail ||
					"/young-male-designer-using-graphics-tablet-while-working-with-com.jpg"
				}
				alt={previewArticle?.title || "Article Thumbnail"}
				className="mt-4 w-full h-auto rounded-lg"
				width={0}
				height={0}
				sizes="100vw"
			/>

			<main className="w-full my-4">
				<p
					className="text-gray-700 text-justify"
					dangerouslySetInnerHTML={{ __html: previewArticle?.content || "" }}
				/>
			</main>

			<section className="w-full mt-4 md:px-8">
				<h3 className="text-2xl font-semibold text-slate-900">
					Other articles
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					{relatedArticles.map((relatedArticle: Article) => (
						<ArticleCard article={relatedArticle} key={relatedArticle.id} />
					))}
				</div>
			</section>
		</div>
	);
};

export default ArticleDetailPage;
