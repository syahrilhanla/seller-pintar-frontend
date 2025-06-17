import { LogOut } from "lucide-react";
import Link from "next/link";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const NavbarDropdown = () => {
	return (
		<ul className="space-y-4">
			<Link href={"/profile"} className="flex items-center">
				<li className="text-slate-600 px-2">My Account</li>
			</Link>
			<hr />

			<Dialog>
				<DialogTrigger className="w-full block">
					<li className="cursor-pointer text-red-500 px-2 flex gap-1">
						<LogOut /> Logout
					</li>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Logout</DialogTitle>
						<DialogDescription>
							Are you sure you want to logout?{" "}
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="sm:justify-end">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Cancel
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type="button">Logout</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</ul>
	);
};

export default NavbarDropdown;
