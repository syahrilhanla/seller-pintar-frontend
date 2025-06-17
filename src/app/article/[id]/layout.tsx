import Navbar from "@/components/Navbar";

const ArticleDetailLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		// <AuthGuard role="User">
		<>
			<Navbar logoTheme="light" />
			{children}
		</>
		// </AuthGuard>
	);
};

export default ArticleDetailLayout;
