import Image from "next/image";

const ArticleFooter = () => {
	return (
		<footer className="bg-[#2563EBDB] h-20 w-full flex justify-center items-center mt-auto">
			<div className="flex flex-col md:flex-row md:gap-2">
				<Image
					src="/Logo.svg"
					alt="Logo"
					width={100}
					height={30}
					className="mx-auto my-2"
				/>
				<p className="md:leading-10 text-white font-light">{`© 2025 Blog genzet. All rights reserved.`}</p>
			</div>
		</footer>
	);
};

export default ArticleFooter;
