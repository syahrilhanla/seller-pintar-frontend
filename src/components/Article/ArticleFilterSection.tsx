import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category.type";
import axios from "axios";

const ArticleFilterSection = async () => {
	const categories = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/categories`
	);

	const categoryList = categories.data.data;

	return (
		<section>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-slate-800">
					Filter by Category
				</h2>

				<Select>
					<SelectTrigger className="w-48 border border-slate-300 bg-white text-slate-700 hover:border-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 rounded-md shadow-sm">
						<SelectValue placeholder="All Categories" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categoryList.map((category: Category) => (
							<SelectItem key={category.id} value={category.name}>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</section>
	);
};

export default ArticleFilterSection;
