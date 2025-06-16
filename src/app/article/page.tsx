import { Article } from "@/types/article.type";
import axios from "axios";

import ArticleCard from "@/components/Article/ArticleCard";
import ArticleFilterSection from "@/components/Article/ArticleFilterSection";

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
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
		<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4">
			<div className="max-w-5xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-slate-800 text-center">
					Articles
				</h1>

				<p className="lg:text-lg text-slate-600 mb-6 text-center">
					Explore our latest articles on various topics
				</p>

				{/* filter section */}
				<ArticleFilterSection />

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			</div>
		</div>
	);
}
