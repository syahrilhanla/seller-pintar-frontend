import Image from "next/image";
import Link from "next/link";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ArticleFilterSection from "@/components/Article/ArticleFilterSection";

import { PlusIcon } from "lucide-react";
import { Article } from "@/types/article.type";
import { formatDate } from "@/lib/helpers";
import PaginationComponent from "@/components/PaginationComponent";
import AdminArticleDelete from "./AdminArticleDelete";

interface Props {
	articles: Article[];
	totalArticles: number;
	currentPage: number;
}

const AdminArticleTable = ({ articles, totalArticles, currentPage }: Props) => {
	return (
		<div className="p-8">
			<div className="rounded-md border overflow-hidden">
				<Table className="overflow-hidden">
					<TableHeader>
						<TableRow className="bg-white">
							<TableHead colSpan={5} className="p-4">
								Total Articles: {totalArticles}
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						<TableRow className="bg-white">
							<TableCell colSpan={5} className="p-4 font-semibold">
								<div className="flex items-center justify-between">
									<ArticleFilterSection role="Admin" />
									<Link href="/admin/article-form">
										<Button className="text-slate-50 cursor-pointer bg-blue-600 hover:bg-blue-500 transition-colors duration-200">
											<PlusIcon />
											Add Articles
										</Button>
									</Link>
								</div>
							</TableCell>
						</TableRow>

						{/* table title */}
						<TableRow>
							<TableTitle />
						</TableRow>
						{/* table title */}

						{articles.map((article) => (
							<TableRow key={article.id} className="bg-white text-slate-600">
								<TableCell className="p-4 text-center flex items-center justify-center">
									<Image
										src={
											article.imageUrl ||
											"/young-male-designer-using-graphics-tablet-while-working-with-com.jpg"
										}
										alt={article.title}
										className="w-16 h-16 object-cover rounded"
										quality={50}
										width={0}
										height={0}
									/>
								</TableCell>
								<TableCell className="p-4 text-center">
									{article.title}
								</TableCell>
								<TableCell className="p-4 text-center">
									{article.category.name}
								</TableCell>
								<TableCell className="p-4 text-center">
									{formatDate(new Date(article.createdAt), true)}
								</TableCell>
								<TableCell className="p-4 text-center space-x-0">
									<Link href={`/article/${article.id}?preview=true`}>
										<Button
											variant="link"
											className="text-blue-600 cursor-pointer underline"
										>
											Preview
										</Button>
									</Link>
									<Link href={`/admin/article-form?id=${article.id}`}>
										<Button
											variant="link"
											className="text-blue-600 cursor-pointer underline"
										>
											Edit
										</Button>
									</Link>
									<AdminArticleDelete articleId={article.id} />
								</TableCell>
							</TableRow>
						))}
						<TableRow className="bg-white text-slate-600">
							<TableCell colSpan={5}>
								<div className="w-full -my-4 -mb-6 flex items-center justify-center">
									<PaginationComponent
										totalItems={totalArticles}
										currentPage={currentPage}
									/>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default AdminArticleTable;

const TableTitle = () => {
	const titles = ["Thumbnail", "Title", "Category", "Created at", "Action"];

	return (
		<>
			{titles.map((title) => (
				<TableCell key={title} className="p-4 bg-inherit text-center">
					{title}
				</TableCell>
			))}
		</>
	);
};
