import ArticleFooter from "@/components/Article/ArticleFooter";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

const UserProfileLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<AuthGuard role="User">
			<div className="flex flex-col min-h-screen relative">
				<Navbar logoTheme="light" />
				{children}
				<ArticleFooter />
			</div>
		</AuthGuard>
	);
};

export default UserProfileLayout;
