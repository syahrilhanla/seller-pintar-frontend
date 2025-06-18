import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import PaginationComponent from "@/components/PaginationComponent";
import AdminCategoryDelete from "@/components/Category/AdminCategoryDelete";
import ArticleSearchInput from "@/components/Article/ArticleSearchInput";
import AdminCategoryForm from "./AdminCategoryForm";

import { LoaderCircle, PlusIcon } from "lucide-react";
import { formatDate } from "@/lib/helpers";
import { Category } from "@/types/category.type";

interface Props {
	isLoading: boolean;
	categories: Category[];
	totalCategories: number;
	currentPage: number;
}

const AdminCategoryTable = ({
	categories,
	totalCategories,
	currentPage,
	isLoading,
}: Props) => {
	return (
		<div className="p-8">
			<div className="rounded-md border overflow-hidden">
				<Table className="overflow-hidden">
					<TableHeader>
						<TableRow className="bg-white">
							<TableHead colSpan={3} className="p-4">
								Total Category: {totalCategories}
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						<TableRow className="bg-white">
							<TableCell colSpan={3} className="p-4 font-semibold">
								<div className="flex items-center justify-between">
									{/* <ArticleFilterSection role="Admin" /> */}
									<div className="w-fit">
										<ArticleSearchInput placeholder="Search category" />
									</div>

									<AdminCategoryForm mode="create">
										<Button className="text-slate-50 cursor-pointer bg-blue-600 hover:bg-blue-500 transition-colors duration-200">
											<PlusIcon />
											Add Category
										</Button>
									</AdminCategoryForm>
								</div>
							</TableCell>
						</TableRow>

						{/* table title */}
						<TableRow>
							<TableTitle />
						</TableRow>
						{/* table title */}

						{isLoading ? (
							<TableRow className="bg-white text-slate-600">
								<TableCell colSpan={3} className="p-4 text-center">
									<div className="w-full flex items-center justify-center">
										<LoaderCircle className="animate-spin" />
									</div>
								</TableCell>
							</TableRow>
						) : categories.length === 0 ? (
							<TableRow className="bg-white text-slate-600">
								<TableCell colSpan={3} className="p-4 text-center">
									No categories found
								</TableCell>
							</TableRow>
						) : null}

						{/* category list */}
						{!isLoading &&
							categories.length > 0 &&
							categories.map((category) => (
								<TableRow key={category.id} className="bg-white text-slate-600">
									<TableCell className="p-4 text-center">
										{category.name}
									</TableCell>
									<TableCell className="p-4 text-center">
										{formatDate(new Date(category.createdAt), true)}
									</TableCell>
									<TableCell className="p-4 text-center space-x-0">
										<AdminCategoryForm
											mode="update"
											category={{
												id: category.id,
												name: category.name,
											}}
										>
											<Button
												variant="link"
												className="text-blue-600 cursor-pointer underline"
											>
												Edit
											</Button>
										</AdminCategoryForm>

										<AdminCategoryDelete
											categoryId={category.id}
											categoryName={category.name}
										/>
									</TableCell>
								</TableRow>
							))}
						<TableRow className="bg-white text-slate-600">
							<TableCell colSpan={3}>
								<div className="w-full -my-4 -mb-6 flex items-center justify-center">
									<PaginationComponent
										totalItems={totalCategories}
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

export default AdminCategoryTable;

const TableTitle = () => {
	const titles = ["Category", "Created at", "Action"];

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
