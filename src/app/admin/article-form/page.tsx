import AdminArticleForm from "@/components/AdminArticle/AdminArticleForm";
import axios from "axios";

const ArticleFormPage = async () => {
	const categories = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/categories?limit=100`
	);

	const categoryList = categories.data.data;

	return <AdminArticleForm categoryList={categoryList} />;
};

export default ArticleFormPage;
