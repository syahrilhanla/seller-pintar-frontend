import AuthGuard from "@/components/Auth/AuthGuard";
import Navbar from "@/components/Navbar/Navbar";

const ArticleDetailLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<AuthGuard role="User">
			<Navbar logoTheme="light" />
			{children}
		</AuthGuard>
	);
};

export default ArticleDetailLayout;
