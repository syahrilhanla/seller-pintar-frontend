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
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useReadLocalStorage } from "usehooks-ts";
import { User } from "@/types/user.type";

interface Props {
	categoryId: string;
	categoryName: string;
}

const AdminCategoryDelete = ({ categoryId, categoryName }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const user = useReadLocalStorage<User | null>("user");

	const router = useRouter();

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user?.token}`,
					},
				}
			);

			// trigger category list refetch data
			router.push("/admin/category?refetch=true");

			toast.success(
				`Category "${categoryName}" has been deleted successfully.`
			);
		} catch (error) {
			toast.error("Failed to delete category. Please try again.");
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
					<DialogTitle>Delete Category</DialogTitle>
					<DialogDescription>
						{`Delete category "${categoryName}"? This will remove it from master data permanently.`}
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
							disabled={isLoading}
						>
							{isLoading ? <LoaderCircle className="animate-spin" /> : "Delete"}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AdminCategoryDelete;
