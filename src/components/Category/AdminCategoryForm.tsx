import { ReactNode } from "react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
	children: ReactNode;
	mode: "create" | "update";
}

const AdminCategoryForm = ({ children, mode }: Props) => {
	const onSubmit = () => {
		// Handle form submission logic here
		console.log("Form submitted");
	};

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === "create" ? "Add Category" : "Edit Category"}
					</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}
					id="category-form"
					className="flex flex-col gap-4"
				>
					<input type="text" placeholder="Category Name" />
				</form>

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
							type="submit"
							form="category-form"
							className="cursor-pointer"
							// onClick={handleLogout}
						>
							{mode === "create" ? "Create" : "Save Changes"}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AdminCategoryForm;
