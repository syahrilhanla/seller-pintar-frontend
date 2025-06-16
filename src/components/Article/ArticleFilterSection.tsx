import axios from "axios";

import ArticleFilterSelect from "@/components/Article/ArticleFilterSelect";

import ArticleSearchInput from "./ArticleSearchInput";

const ArticleFilterSection = async () => {
	const categories = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/categories`
	);

	const categoryList = categories.data.data;

	return (
		<div>
			<div className="w-full md:w-fit flex flex-col sm:flex-row gap-3 justify-center items-center bg-blue-500 p-2 rounded-lg">
				<ArticleFilterSelect categoryList={categoryList} />

				<ArticleSearchInput />
			</div>
		</div>
	);
};

export default ArticleFilterSection;
