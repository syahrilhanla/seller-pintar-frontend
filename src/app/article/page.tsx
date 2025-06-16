import { Article } from "@/types/article.type";
import axios from "axios";

import ArticleCard from "@/components/Article/ArticleCard";

export default async function ArticlePage() {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/articles`
	);

	const articles: Article[] = data.data;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4">
			<div className="max-w-5xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-slate-800 text-center">
					Articles
				</h1>
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			</div>
		</div>
	);
}
