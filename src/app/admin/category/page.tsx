import axios from "axios";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CategoryPage = async ({ searchParams }: Props) => {
	const { page, search } = await searchParams;

	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/categories`,
		{
			params: {
				page,
				search,
			},
		}
	);

	const categories = data.data;
	const totalCategories = data.total;

	return <div>{JSON.stringify(categories)}</div>;
};

export default CategoryPage;
