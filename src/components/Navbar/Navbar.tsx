"use client";

import Image from "next/image";
import { useReadLocalStorage } from "usehooks-ts";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import NavbarDropdown from "@/components/Navbar/NavbarDropdown";
import { User } from "@/types/user.type";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
	logoTheme?: "light" | "dark";
	navbarTitle?: string;
}

const Navbar = ({ logoTheme, navbarTitle }: Props) => {
	// Determine account name color based on theme
	const accountNameClass =
		logoTheme === "dark" || logoTheme === undefined
			? "text-white underline"
			: "text-slate-800 underline";

	const user = useReadLocalStorage<User | null>("user");
	const isUserLoading = user === undefined; // usehooks-ts returns undefined while loading

	return (
		<div className="w-full h-16 flex justify-between px-2 md:px-8 duration-300 z-20 bg-white md:bg-transparent">
			{navbarTitle ? (
				<p className="md:text-lg text-base text-slate-900 px-2 py-4">
					{navbarTitle}
				</p>
			) : logoTheme === "dark" ? (
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
						{isUserLoading ? (
							<>
								<Skeleton className="w-8 h-8 rounded-full" />
								<Skeleton className="hidden md:inline-block h-5 w-24 rounded" />
							</>
						) : (
							<>
								<Avatar>
									<AvatarFallback className="bg-blue-200 text-blue-900">
										{user?.username?.charAt(0).toUpperCase() || "G"}
									</AvatarFallback>
								</Avatar>
								<span className={`hidden md:inline ${accountNameClass}`}>
									{user?.username || "Guest"}
								</span>
							</>
						)}
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
