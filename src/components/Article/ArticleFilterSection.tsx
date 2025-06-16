import axios from "axios";

import ArticleFilterSelect from "@/components/Article/ArticleFilterSelect";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

const ArticleFilterSection = async () => {
	const categories = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/categories`
	);

	const categoryList = categories.data.data;

	return (
		<div>
			<div className="w-full md:w-fit flex flex-col sm:flex-row gap-3 justify-center items-center bg-blue-500 p-2 rounded-lg">
				<ArticleFilterSelect categoryList={categoryList} />

				<div className="relative w-full">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
						<Search size={18} />
					</span>
					<Input
						placeholder="Search articles"
						value={""}
						// onChange={(e) => setSearch(e.target.value)}
						className="w-full pl-8 bg-white text-slate-900"
					/>
				</div>
			</div>
		</div>
	);
};

export default ArticleFilterSection;
