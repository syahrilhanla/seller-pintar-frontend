"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

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

import { User } from "@/types/user.type";

interface Props {
	articleId: string;
}

const AdminArticleDelete = ({ articleId }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	const user = useReadLocalStorage<User | null>("user");
	const router = useRouter();

	const handleDelete = async () => {
		try {
			setIsLoading(true);

			await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user?.token}`,
					},
				}
			);

			toast.success("Article deleted successfully!");
			router.push("/admin?page=1");
			router.refresh();
		} catch (error) {
			console.error("Failed to delete article:", error);
			toast.error("Failed to delete article. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="link"
					className="text-red-500 cursor-pointer underline"
				>
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Articles</DialogTitle>
					<DialogDescription>
						Deleting this article is permanent and cannot be undone. All related
						content will be removed.
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
						<Button
							type="button"
							className="cursor-pointer"
							variant="destructive"
							onClick={handleDelete}
						>
							Delete
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AdminArticleDelete;
