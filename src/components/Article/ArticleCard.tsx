import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/helpers";

import { Article } from "@/types/article.type";

const ArticleCard = ({ article }: { article: Article }) => {
	return (
		<Card
			key={article.id}
			className="overflow-hidden shadow-lg rounded-xl bg-white hover:shadow-2xl transition-all flex flex-col hover:scale-105 duration-150 hover:bg-slate-50 scale-3d"
		>
			<Image
				src={
					article.imageUrl ||
					"https://s3.sellerpintar.com/articles/articles/1749892451746-hero.jpg"
				}
				alt={article.title}
				className="w-full h-40 object-cover object-center hover:scale-105 transition-transform duration-300"
				width={500}
				height={300}
			/>

			<CardContent className="p-5 flex flex-col flex-1">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
						{article.title}
					</h2>
					<span className="text-xs text-slate-500 whitespace-nowrap">
						{formatDate(new Date(article.createdAt), "MMMM d, yyyy")}
					</span>
				</div>
				<p
					className="text-slate-600 mb-3 text-sm line-clamp-2"
					dangerouslySetInnerHTML={{ __html: article.content }}
				/>
				<div className="flex items-center justify-between mt-auto text-xs text-slate-500">
					<span>
						By{" "}
						<span className="font-medium text-slate-700">
							{article.user.username}
						</span>
					</span>
					<Badge
						variant="outline"
						className="capitalize px-2 py-1 text-xs border-slate-300 bg-slate-100 text-slate-700"
					>
						{article.category.name}
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
};

export default ArticleCard;
