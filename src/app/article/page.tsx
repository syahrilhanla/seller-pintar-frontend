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
		<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
			<div className="w-full">
				<ArticleHeroSection />

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			</div>
		</div>
	);
}
