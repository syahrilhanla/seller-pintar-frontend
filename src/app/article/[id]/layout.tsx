import Navbar from "@/components/Navbar";
import React from "react";

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
