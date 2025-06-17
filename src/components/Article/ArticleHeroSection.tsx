import ArticleFilterSection from "@/components/Article/ArticleFilterSection";

const ArticleHeroSection = () => {
	return (
		<section
			style={{
				backgroundImage:
					"url('/young-male-designer-using-graphics-tablet-while-working-with-com.jpg')",
			}}
			className="relative py-12 px-6 text-center bg-cover bg-center"
		>
			{/* background overlay */}
			<div className="absolute inset-0 bg-blue-600/70 backdrop-blur-xs z-0" />

			<div className="relative max-w-2xl mt-20 mx-auto z-10 text-white flex flex-col items-center">
				<h2 className="text-sm uppercase tracking-wide mb-2">Blog genzet</h2>
				<h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
					The Journal : Design Resources, Interviews, and Industry News
				</h1>
				<p className="text-lg text-white mb-8">
					Your daily dose of design insights!
				</p>

				<ArticleFilterSection role="User" />
			</div>
		</section>
	);
};

export default ArticleHeroSection;
