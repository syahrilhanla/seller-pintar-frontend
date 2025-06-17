"use client";

import LogoutDialog from "../Auth/LogoutDialog";
import { usePathname, useRouter } from "next/navigation";
import { PopoverClose } from "@radix-ui/react-popover";

const NavbarDropdown = () => {
	const router = useRouter();
	const pathname = usePathname();

	const isAdmin = pathname.startsWith("/admin");

	return (
		<ul className="space-y-4 py-0">
			<PopoverClose className="w-full h-full cursor-pointer text-left py-0">
				<li
					onClick={() => router.push(`${isAdmin ? "/admin" : ""}/profile`)}
					className="text-slate-600 px-4 py-0"
				>
					My Account
				</li>
			</PopoverClose>
			<hr />

			<LogoutDialog />
		</ul>
	);
};

export default NavbarDropdown;
