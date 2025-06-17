import axios from "axios";
import { Dot } from "lucide-react";
import Image from "next/image";

import { formatDate } from "@/lib/helpers";

import ArticleCard from "@/components/Article/ArticleCard";

import { Article } from "@/types/article.type";

interface Props {
	params: Promise<{ id: string }>;
}

const ArticleDetailPage = async ({ params: params }: Props) => {
	const { id } = await params;

	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`
	);

	const article = data as Article;
	const category = article.categoryId;

	const { data: relatedArticles } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/articles?category=${category}&limit=3`
	);

	return (
		<div className="max-w-5xl mx-auto mt-12 px-4 gap-4 py-8 flex flex-col items-center">
			<p className=" text-sm md:text-base text-slate-600 flex gap-1 items-center">
				{formatDate(new Date(article.createdAt))} <Dot /> Created by{" "}
				{article.user.username}
			</p>

			<h1 className="text-3xl font-semibold text-slate-900 text-center">
				{article.title}
			</h1>

			<Image
				src={article.imageUrl || "/placeholder-image.png"}
				alt={article.title}
				className="mt-4 w-full h-auto rounded-lg"
				width={0}
				height={0}
				sizes="100vw"
			/>

			<main className="w-full my-4">
				<p
					className="text-gray-700 text-justify"
					dangerouslySetInnerHTML={{ __html: article.content }}
				/>
			</main>

			<section className="w-full mt-4 md:px-8">
				<h3 className="text-2xl font-semibold text-slate-900">
					Other articles
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					{relatedArticles.data
						.filter(
							(relatedArticle: Article) => relatedArticle.id !== article.id
						)
						.map((relatedArticle: Article) => (
							<ArticleCard article={relatedArticle} key={relatedArticle.id} />
						))}
				</div>
			</section>
		</div>
	);
};

export default ArticleDetailPage;
