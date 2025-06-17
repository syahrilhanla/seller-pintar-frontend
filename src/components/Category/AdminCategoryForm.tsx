"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReadLocalStorage } from "usehooks-ts";
import { toast } from "sonner";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user.type";
import { LoaderCircle } from "lucide-react";

const schema = z.object({
	name: z.string().min(1, "Category field cannot be empty"),
});

type FormData = z.infer<typeof schema>;

interface Props {
	children: ReactNode;
	mode: "create" | "update";
}

const AdminCategoryForm = ({ children, mode }: Props) => {
	const user: User | null = useReadLocalStorage("user");

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormData> = async (payload: FormData) => {
		try {
			if (mode === "create") {
				await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/categories`,
					payload,
					{
						headers: {
							Authorization: `Bearer ${user?.token}`,
						},
					}
				);

				router.push("/admin/category?refetch=true");
			}

			if (mode === "update") {
				// Update logic here
			}

			toast.success(
				`Category ${mode === "create" ? "created" : "updated"} successfully`
			);

			// close the dialog after submission
			const cancelButton = document.getElementById("category-cancel-button");
			cancelButton?.click();
		} catch (error) {
			toast.error(
				`Failed to ${mode === "create" ? "create" : "update"} category`
			);
		}
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
					onSubmit={handleSubmit(onSubmit)}
					id="category-form"
					className="flex flex-col gap-4"
				>
					<div className="space-y-2">
						<Label htmlFor="categoryName">Category</Label>
						<Input
							{...register("name")}
							id="categoryName"
							placeholder="Input Category"
						/>

						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name.message}</p>
						)}
					</div>
				</form>

				<DialogFooter className="sm:justify-end">
					<DialogClose asChild id="category-cancel-button">
						<Button
							type="button"
							className="cursor-pointer"
							variant="secondary"
						>
							Cancel
						</Button>
					</DialogClose>
					<Button
						type="submit"
						form="category-form"
						className="cursor-pointer"
						disabled={isSubmitting || Object.keys(errors).length > 0}
					>
						{isSubmitting ? (
							<LoaderCircle className="animate-spin" />
						) : mode === "create" ? (
							"Create"
						) : (
							"Save Changes"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AdminCategoryForm;
