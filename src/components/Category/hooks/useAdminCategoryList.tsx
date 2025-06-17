import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Category } from "@/types/category.type";

const DEFAULT_PAGE_SIZE = 10;

const useAdminCategoryList = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	const searchParams = useSearchParams();
	const search = searchParams.get("search") || "";
	const pageNumber = Number(searchParams.get("page") || "1");

	const fetchCategories = useCallback(async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/categories?limit=100`
			);
			const data = await response.json();
			if (data && data.data) {
				setCategories(data.data);
			}
		} catch (error) {
			console.error("Failed to fetch categories:", error);
		}
	}, [setCategories]);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	// match the search term with category names
	const filteredCategories = useMemo(() => {
		return categories.filter((category) =>
			category.name.toLowerCase().includes(search.toLowerCase() || "")
		);
	}, [categories, search]);

	// paginate the filtered categories
	// calculate the start index based on the current page number
	const paginatedCategories = useMemo(() => {
		const start = (pageNumber - 1) * DEFAULT_PAGE_SIZE;
		return filteredCategories.slice(start, start + DEFAULT_PAGE_SIZE);
	}, [filteredCategories, pageNumber, DEFAULT_PAGE_SIZE]);

	return {
		categories,
		paginatedCategories,
		pageNumber,
		totalCategories: filteredCategories.length,
	};
};

export default useAdminCategoryList;
