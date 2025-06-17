import Navbar from "@/components/Navbar";

const ArticleDetailLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<Navbar logoTheme="light" />
			{children}
		</>
	);
};

export default ArticleDetailLayout;
