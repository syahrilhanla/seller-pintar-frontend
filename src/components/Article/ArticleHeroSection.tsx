import Image from "next/image";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArticleHeroSection = () => {
	return (
		<section
			style={{
				backgroundImage:
					"url('/young-male-designer-using-graphics-tablet-while-working-with-com.jpg')",
			}}
			className="relative py-16 px-6 text-center bg-cover bg-center"
		>
			<div className="absolute inset-0 bg-blue-600/70 backdrop-blur-xs z-0" />
			<div className="relative max-w-2xl mx-auto z-10 text-white flex flex-col items-center">
				<h2 className="text-sm uppercase tracking-wide mb-2">Blog genzet</h2>
				<h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
					The Journal : Design Resources, Interviews, and Industry News
				</h1>
				<p className="text-lg text-white mb-8">
					Your daily dose of design insights!
				</p>
				<div className="w-full md:w-fit flex flex-col sm:flex-row gap-3 justify-center items-center bg-blue-500 p-2 rounded-lg">
					<Select>
						<SelectTrigger className="w-full sm:w-fit bg-white text-slate-900 hover:bg-slate-50 focus:bg-slate-50">
							<SelectValue placeholder="Select category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							{/* {categories.map((cat) => (
										<SelectItem key={cat.id} value={cat.id}>
											{cat.name}
										</SelectItem>
									))} */}
						</SelectContent>
					</Select>
					<div className="relative w-full">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
							<Search size={18} />
						</span>
						<Input
							placeholder="Search articles"
							value={""}
							// onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-8 bg-white text-slate-900"
						/>
					</div>
				</div>
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
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src="invalidUrl" />
							<AvatarFallback className="bg-blue-200 text-blue-900">
								SH
							</AvatarFallback>
						</Avatar>
						<span className="hidden md:inline text-white">Syahril Hanla</span>
					</div>
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
				<Avatar className="mr-4 my-3">
					<AvatarImage src="invalidUrl" />
					<AvatarFallback className="bg-blue-300 text-blue-700">
						SH
					</AvatarFallback>
				</Avatar>
			</div>
		</section>
	);
};

export default ArticleHeroSection;
