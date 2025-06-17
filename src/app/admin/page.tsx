import AdminArticleTable from "@/components/AdminArticle/AdminArticleTable";
import axios from "axios";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AdminPage = async ({ searchParams }: Props) => {
	const { search, category, page } = await searchParams;

	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/articles`,
		{
			params: {
				title: search,
				category,
				page,
			},
		}
	);

	const articles = data.data;

	return (
		<div>
			<AdminArticleTable
				articles={articles || []}
				totalArticles={data.total}
				currentPage={Number(page || 1)}
			/>
		</div>
	);
};

export default AdminPage;
