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

interface Props {
	categoryId: string;
	categoryName: string;
}

const AdminCategoryDelete = ({ categoryId, categoryName }: Props) => {
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
							// onClick={}
						>
							Delete
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AdminCategoryDelete;
