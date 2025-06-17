import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import NavbarDropdown from "@/components/NavbarDropdown";

const ArticleLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			{/* white navbar */}
			<div className=" w-full absolute flex justify-between top-0 left-0 z-20 bg-white md:bg-transparent">
				<span className="md:hidden flex font-bold text-lg p-4">
					<Image
						src="/Frame.svg"
						alt="Logo"
						width={120}
						height={30}
						className="mx-auto my-2"
					/>
				</span>

				<span className="hidden md:flex font-bold text-lg p-4">
					<Image
						src="/Logo.svg"
						alt="Logo"
						width={120}
						height={30}
						className="mx-auto my-2"
					/>
				</span>

				<Popover>
					<PopoverTrigger className="mr-4 my-2">
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

			{/* Main content area */}
			{children}
		</>
	);
};

export default ArticleLayout;
