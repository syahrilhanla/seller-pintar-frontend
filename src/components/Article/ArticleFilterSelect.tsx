"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Category } from "@/types/category.type";
import { useRouter } from "next/navigation";

interface Props {
	categoryList: Category[];
}

const ArticleFilterSelect = ({ categoryList }: Props) => {
	const router = useRouter();
	const searchParams = new URLSearchParams();

	const selectCategory = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value === "all") {
			params.delete("category");
		} else {
			// special case for "Management" category, category id is empty string
			if (value === "Management") params.set("category", "");
			else params.set("category", value);
		}

		router.push(`/article?${params.toString()}`, { scroll: false });
	};

	return (
		<>
			<h2 className="text-xl font-semibold text-slate-800">
				Filter by Category
			</h2>

			<Select onValueChange={selectCategory}>
				<SelectTrigger className="w-48 border border-slate-300 bg-white text-slate-700 hover:border-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 rounded-md shadow-sm">
					<SelectValue placeholder="All Categories" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Categories</SelectItem>
					{categoryList.map((category: Category) => (
						<SelectItem key={category.id} value={category.id || "Management"}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
};

export default ArticleFilterSelect;
