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
	articleId: string;
}

const AdminArticleDelete = ({ articleId }: Props) => {
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

export default AdminArticleDelete;
