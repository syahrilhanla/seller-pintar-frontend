"use client";

import AdminCategoryTable from "@/components/Category/AdminCategoryTable";
import useAdminCategoryList from "@/components/Category/hooks/useAdminCategoryList";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

const CategoryPage = () => {
	return (
		<Suspense
			fallback={
				<div>
					<LoaderCircle className="animate-spin" />
				</div>
			}
		>
			<CategoryPageContent />
		</Suspense>
	);
};

export default CategoryPage;

const CategoryPageContent = () => {
	const { paginatedCategories, totalCategories, pageNumber, isLoading } =
		useAdminCategoryList();

	return (
		<div>
			<AdminCategoryTable
				isLoading={isLoading}
				categories={paginatedCategories || []}
				totalCategories={totalCategories}
				currentPage={pageNumber}
			/>
		</div>
	);
};
