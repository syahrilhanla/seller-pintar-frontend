import DataTable from "@/components/AdminArticle/DataTable";
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
				search,
				category,
				page,
			},
		}
	);

	const articles = data.data;

	return (
		<div>
			<DataTable
				articles={articles || []}
				totalArticles={data.total}
				currentPage={Number(page || 1)}
			/>
		</div>
	);
};

export default AdminPage;
