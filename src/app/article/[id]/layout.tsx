import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

const ArticleDetailLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<AuthGuard>
			<Navbar logoTheme="light" />
			{children}
		</AuthGuard>
	);
};

export default ArticleDetailLayout;
