"use client";

import Link from "next/link";

import LogoutDialog from "./LogoutDialog";

const NavbarDropdown = () => {
	return (
		<ul className="space-y-4">
			<Link href={"/profile"} className="flex items-center">
				<li className="text-slate-600 px-4">My Account</li>
			</Link>
			<hr />

			<LogoutDialog />
		</ul>
	);
};

export default NavbarDropdown;
