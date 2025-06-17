import ArticleFooter from "@/components/Article/ArticleFooter";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

const UserProfileLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<AuthGuard>
			<Navbar logoTheme="light" />
			{children}
			<ArticleFooter />
		</AuthGuard>
	);
};

export default UserProfileLayout;
