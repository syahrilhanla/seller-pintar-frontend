"use client";

import AdminCategoryTable from "@/components/Category/AdminCategoryTable";
import useAdminCategoryList from "@/components/Category/hooks/useAdminCategoryList";

const CategoryPage = () => {
	const { paginatedCategories, totalCategories, pageNumber } =
		useAdminCategoryList();

	return (
		<div>
			<AdminCategoryTable
				categories={paginatedCategories || []}
				totalCategories={totalCategories}
				currentPage={pageNumber}
			/>
		</div>
	);
};

export default CategoryPage;
