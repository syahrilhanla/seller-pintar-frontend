import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import NavbarDropdown from "@/components/NavbarDropdown";
import Link from "next/link";

interface Props {
	logoTheme?: "light" | "dark";
	accountName?: string; // Add dynamic account name prop
}

const Navbar = ({ logoTheme, accountName = "Account" }: Props) => {
	// Determine account name color based on theme
	const accountNameClass =
		logoTheme === "dark" || logoTheme === undefined
			? "text-white underline"
			: "text-slate-800 underline";

	return (
		<div className="w-full h-16 flex justify-between px-2 md:px-8 duration-300 z-20 bg-white md:bg-transparent">
			{logoTheme === "dark" ? (
				<span className="md:hidden flex font-bold text-lg p-4">
					<Image
						src="/Logo.svg"
						alt="Logo"
						width={120}
						height={30}
						className="mx-auto my-2"
					/>
				</span>
			) : logoTheme === "light" ? (
				<Link href="/" className="font-bold text-lg p-4 bg-white">
					<Image
						src="/Frame.svg"
						alt="Logo"
						width={120}
						height={30}
						className="mx-auto my-2"
					/>
				</Link>
			) : (
				// if no theme is specified, dynamically render based on screen size
				<Link href="/" className="flex items-center">
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
				</Link>
			)}
			<Popover>
				<PopoverTrigger className="mr-4 my-2">
					<div className="flex items-center gap-2 cursor-pointer">
						<Avatar>
							<AvatarFallback className="bg-blue-200 text-blue-900">
								SH
							</AvatarFallback>
						</Avatar>
						{/* Hide on mobile, show on md+ and use theme color */}
						<span className={`hidden md:inline ${accountNameClass}`}>
							Syahril Hanla
						</span>
					</div>
				</PopoverTrigger>
				<PopoverContent forceMount className="mr-4 px-0">
					<NavbarDropdown />
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default Navbar;
