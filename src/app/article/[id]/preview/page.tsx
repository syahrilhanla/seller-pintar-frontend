"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";
import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";

import ArticleCard from "@/components/Article/ArticleCard";

import { formatDate } from "@/lib/helpers";
import { Dot } from "lucide-react";

import { User } from "@/types/user.type";
import { Article } from "@/types/article.type";
import { ArticlePreview } from "@/types/article.type";
import ArticleLoadingSkeleton from "@/components/Article/ArticleLoadingSkeleton";

const ArticlePreviewPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ArticlePreviewContent />
		</Suspense>
	);
};

export default ArticlePreviewPage;

const ArticlePreviewContent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [previewArticleState, setPreviewArticleState] =
		useState<ArticlePreview>(null);
	const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

	const searchParams = useSearchParams();
	const articleId = searchParams.get("id");

	const previewArticle = useReadLocalStorage<ArticlePreview>("preview");

	const getRelatedArticles = useCallback(async () => {
		try {
			// if articleId is provided, fetch the article details
			if (articleId) {
				const { data }: { data: Article } = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`
				);

				setPreviewArticleState({
					title: data.title,
					category: data.categoryId,
					content: data.content,
					thumbnail: data.imageUrl || "",
					user: data.user as unknown as User, // bypass minor type mismatch
				});
			}

			// if no articleId, use the preview article from local storage
			else setPreviewArticleState(previewArticle);

			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/articles?category=${previewArticleState?.category}&limit=3`
			);

			setRelatedArticles(data.data);
		} catch (error) {
			console.error("Error fetching related articles:", error);
		} finally {
			setIsLoading(false);
		}
	}, [previewArticleState?.category, articleId, previewArticle]);

	useEffect(() => {
		getRelatedArticles();
	}, [
		getRelatedArticles,
		previewArticleState?.category,
		articleId,
		previewArticle,
	]);

	return (
		<div className="max-w-5xl min-h-dvh mx-auto mt-12 px-4 gap-4 py-8 flex flex-col items-center">
			{isLoading ? (
				<ArticleLoadingSkeleton />
			) : (
				<>
					<p className=" text-sm md:text-base text-slate-600 flex gap-1 items-center">
						{formatDate(new Date())} <Dot /> Created by{" "}
						{previewArticleState?.user?.username || "Unknown User"}
					</p>

					<h1 className="text-3xl font-semibold text-slate-900 text-center">
						{previewArticleState?.title}
					</h1>

					<Image
						src={
							previewArticleState?.thumbnail ||
							"/young-male-designer-using-graphics-tablet-while-working-with-com.jpg"
						}
						alt={previewArticleState?.title || "Article Thumbnail"}
						className="mt-4 w-full h-auto rounded-lg"
						width={0}
						height={0}
						sizes="100vw"
					/>

					<main className="w-full my-4">
						<p
							className="text-gray-700 text-justify"
							dangerouslySetInnerHTML={{
								__html: previewArticleState?.content || "",
							}}
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
				</>
			)}
		</div>
	);
};
