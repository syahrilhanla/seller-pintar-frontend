"use client";

import { usePathname } from "next/navigation";

import ArticleFooter from "@/components/Article/ArticleFooter";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

const ArticleLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const pathname = usePathname();

	return (
		<AuthGuard role="User">
			{pathname === "/article" || pathname === "/profile" ? (
				<div className="absolute z-20 top-0 left-0 w-full">
					<Navbar />
				</div>
			) : null}
			{children}
			<ArticleFooter />
		</AuthGuard>
	);
};

export default ArticleLayout;
