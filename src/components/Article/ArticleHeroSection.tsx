import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ArticleFilterSection from "@/components/Article/ArticleFilterSection";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import NavbarDropdown from "@/components/NavbarDropdown";

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

				<ArticleFilterSection />
			</div>

			{/* desktop navbar */}
			<div className="hidden md:block w-full h-16 bg-white">
				<div className="absolute top-6 left-6">
					<span className="font-bold text-lg">
						<Image
							src="/Logo.svg"
							alt="Logo"
							width={120}
							height={30}
							className="mx-auto my-2"
						/>
					</span>
				</div>
				<div className="absolute top-6 right-6">
					<Popover>
						<PopoverTrigger>
							<div className="flex items-center gap-2 cursor-pointer">
								<Avatar>
									<AvatarImage src="invalidUrl" />
									<AvatarFallback className="bg-blue-200 text-blue-900">
										SH
									</AvatarFallback>
								</Avatar>
								<span className="hidden md:inline text-white underline">
									Syahril Hanla
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent forceMount className="mr-4 px-0">
							<NavbarDropdown />
						</PopoverContent>
					</Popover>
				</div>
			</div>

			{/* mobile navbar */}
			<div className="md:hidden w-full absolute flex justify-between top-0 left-0 bg-white">
				<span className="font-bold text-lg ml-4 my-2">
					<Image
						src="/Frame.svg"
						alt="Logo"
						width={120}
						height={30}
						className="mx-auto my-2"
					/>
				</span>
				<Popover>
					<PopoverTrigger className="mr-4 my-2">
						<Avatar className="mr-4 my-3 cursor-pointer">
							<AvatarImage src="invalidUrl" />
							<AvatarFallback className="bg-blue-300 text-blue-700">
								SH
							</AvatarFallback>
						</Avatar>
					</PopoverTrigger>
					<PopoverContent forceMount className="mr-4 px-0">
						<NavbarDropdown />
					</PopoverContent>
				</Popover>
			</div>
		</section>
	);
};

export default ArticleHeroSection;
