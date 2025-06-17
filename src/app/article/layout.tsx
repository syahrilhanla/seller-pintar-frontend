import ArticleFooter from "@/components/Article/ArticleFooter";
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
			<ArticleFooter />
		</>
	);
};

export default ArticleLayout;
