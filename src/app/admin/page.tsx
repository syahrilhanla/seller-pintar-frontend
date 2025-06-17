import axios from "axios";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AdminPage = async ({ searchParams }: Props) => {
	const { search, category } = await searchParams;

	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/articles`,
		{
			params: {
				search,
				category,
			},
		}
	);

	const articles = data;

	console.log(articles);

	return <div></div>;
};

export default AdminPage;
