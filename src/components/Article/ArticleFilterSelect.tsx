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
			<Select onValueChange={selectCategory}>
				<SelectTrigger className="w-full sm:w-fit bg-white text-slate-900 hover:bg-slate-50 focus:bg-slate-50">
					<SelectValue placeholder="Select category" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Categories</SelectItem>
					{categoryList.map((category) => (
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
