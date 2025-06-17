import ArticleFooter from "@/components/Article/ArticleFooter";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

const ArticleLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<AuthGuard>
			<Navbar />
			{children}
			<ArticleFooter />
		</AuthGuard>
	);
};

export default ArticleLayout;
