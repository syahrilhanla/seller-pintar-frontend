import { Article } from "@/types/article.type";
import axios from "axios";

import ArticleCard from "@/components/Article/ArticleCard";
import ArticleHeroSection from "@/components/Article/ArticleHeroSection";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArticlePage({ searchParams }: Props) {
	// must "await" the dynamic searchParams to ensure they are resolved before use,
	// according to Next.js documentation
	const { category, page, search } = await searchParams;

	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/articles`,
		{
			params: {
				category,
				page,
				search,
			},
		}
	);

	const articles: Article[] = data.data;

	return (
		<div className="min-h-screen bg-gradient-to-br bg-white">
			<div className="w-full">
				<ArticleHeroSection />

				<div className="px-5 md:px-24">
					<p className="mt-10 mb-4 text-slate-600 text-sm md:text-base">
						Showing: 9 of {data.total} articles
					</p>

					<div className="grid gap-8 md:grid-cols-3">
						{articles.map((article) => (
							<ArticleCard key={article.id} article={article} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
