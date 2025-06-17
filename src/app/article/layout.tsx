import Navbar from "@/components/Navbar";

const ArticleLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Navbar />

			{/* Main content area */}
			{children}
		</>
	);
};

export default ArticleLayout;
