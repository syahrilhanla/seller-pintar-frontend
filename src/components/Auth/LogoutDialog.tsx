"use client";

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
import { useLocalStorage } from "usehooks-ts";

interface Props {
	children?: React.ReactNode;
}

const LogoutDialog = ({ children }: Props) => {
	const [user, setUser, removeUser] = useLocalStorage("user", null);

	const handleLogout = () => {
		removeUser();
	};

	return (
		<Dialog>
			<DialogTrigger className="w-full block">
				{children ? (
					children
				) : (
					<li className="cursor-pointer text-red-500 px-4 flex gap-1">
						<LogOut /> Logout
					</li>
				)}
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
						<Button
							type="button"
							className="cursor-pointer"
							variant="secondary"
						>
							Cancel
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Link href={"/login"}>
							<Button
								type="button"
								className="cursor-pointer"
								onClick={handleLogout}
							>
								Logout
							</Button>
						</Link>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LogoutDialog;
