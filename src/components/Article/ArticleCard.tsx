import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/helpers";

import { Article } from "@/types/article.type";
import Link from "next/link";

const ArticleCard = ({ article }: { article: Article }) => {
	return (
		<Link
			key={article.id}
			href={`/article/${article.id}`}
			className="overflow-hidden bg-white"
		>
			<Image
				src={
					article.imageUrl?.trim() ||
					"https://s3.sellerpintar.com/articles/articles/1749892451746-hero.jpg"
				}
				alt={article.title}
				className="w-full h-80 object-cover rounded-xl"
				width={400}
				height={300}
			/>
			<div className="p-4">
				<p className="text-sm text-gray-500 mb-1">
					{formatDate(new Date(article.createdAt))}
				</p>
				<h3 className="text-lg font-semibold text-gray-800 mb-2">
					{article.title}
				</h3>
				<p
					className="text-sm text-gray-600 mb-3 line-clamp-2"
					dangerouslySetInnerHTML={{ __html: article.content }}
				/>
				<div className="flex flex-wrap gap-2">
					<Badge
						variant="outline"
						className="bg-blue-200 text-blue-900 rounded-full text-xs px-2 py-0.5"
					>
						{article.category.name}
					</Badge>
				</div>
			</div>
		</Link>
	);
};

export default ArticleCard;
