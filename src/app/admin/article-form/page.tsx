import AdminArticleForm from "@/components/AdminArticle/AdminArticleForm";
import { Article } from "@/types/article.type";
import axios from "axios";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ArticleFormPage = async ({ searchParams }: Props) => {
	const { id } = await searchParams;

	let article: Article | null = null;

	if (id) {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`
		);

		article = data;
	}

	const categories = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/categories?limit=100`
	);

	const categoryList = categories.data.data;

	return <AdminArticleForm categoryList={categoryList} />;
};

export default ArticleFormPage;
