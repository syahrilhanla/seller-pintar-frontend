"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Category } from "@/types/category.type";
import { usePathname, useRouter } from "next/navigation";

interface Props {
	categoryList: Category[];
	defaultCategoryId?: string; // optional default category ID to pre-select
	onSelectWithoutQuery?: (categoryId: string) => void; // optional callback when a category is selected
}

const ArticleFilterSelect = ({
	categoryList,
	onSelectWithoutQuery,
	defaultCategoryId,
}: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = new URLSearchParams();

	const selectCategory = (value: string) => {
		if (onSelectWithoutQuery) {
			// if onSelect is provided, call it with the selected category ID
			onSelectWithoutQuery(value);

			// do not update the URL if onSelectWithoutQuery is provided
			return;
		}

		const params = new URLSearchParams(searchParams.toString());
		if (value === "all") {
			params.delete("category");
		} else {
			// special case for "Management" category, category id is empty string
			if (value === "Management") params.set("category", "");
			else params.set("category", value);
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<>
			<Select onValueChange={selectCategory} defaultValue={defaultCategoryId}>
				<SelectTrigger
					// apply the className conditionally based on onSelectWithoutQuery prop
					className={`w-full ${
						onSelectWithoutQuery ? "" : "sm:w-fit"
					} bg-white text-slate-900 hover:bg-slate-50 focus:bg-slate-50 cursor-pointer`}
				>
					<SelectValue placeholder="Select category" />
				</SelectTrigger>
				<SelectContent>
					{!onSelectWithoutQuery && (
						<SelectItem className="cursor-pointer" value="all">
							All Categories
						</SelectItem>
					)}
					{categoryList.map((category) => (
						<SelectItem
							key={category.id}
							className="cursor-pointer"
							value={category.id || "Management"}
						>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
};

export default ArticleFilterSelect;
