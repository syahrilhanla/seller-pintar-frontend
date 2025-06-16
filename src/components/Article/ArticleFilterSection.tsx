import axios from "axios";

import ArticleFilterSelect from "@/components/Article/ArticleFilterSelect";

const ArticleFilterSection = async () => {
	const categories = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/categories`
	);

	const categoryList = categories.data.data;

	return (
		<section>
			<div className="flex items-center justify-between mb-6">
				<ArticleFilterSelect categoryList={categoryList} />
			</div>
		</section>
	);
};

export default ArticleFilterSection;
