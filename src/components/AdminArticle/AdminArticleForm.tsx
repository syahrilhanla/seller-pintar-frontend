"use client";

import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ArticleFilterSelect from "@/components/Article/ArticleFilterSelect";
import ArticleRichTextEditor from "./ArticleRichTextEditor";

import { ArrowLeft, ImagePlus } from "lucide-react";

const schema = z.object({
	title: z.string().min(1, "Please enter title"),
	category: z.string().min(1, "Please select a category"),
	thumbnail: z
		.instanceof(File)
		.refine(
			(file) => {
				console.log(file);

				return file.size > 0;
			},
			{
				message: "Please enter picture",
			}
		)
		.refine(
			(file) => {
				const validTypes = ["image/jpeg", "image/png"];
				return validTypes.includes(file.type);
			},
			{
				message: "Please upload a valid image file (jpg or png)",
			}
		),
	content: z.string().min(1, "Please enter content"),
});

type FormData = z.infer<typeof schema>;

const AdminArticleForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
		console.log("Form submitted with data:", data);
	};

	return (
		<div className="p-8">
			<div className="p-4 rounded-md border overflow-hidden bg-white">
				<Button variant="ghost" className="mb-8 p-0 text-slate-900">
					<ArrowLeft className="right-4" />
					Create Articles
				</Button>

				<form
					id="article-form"
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 px-4"
				>
					{/* thumbnail upload */}
					<div className="grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="thumbnail">Thumbnail</Label>
						<Input
							id="thumbnail"
							{...register("thumbnail")}
							type="file"
							accept="image/jpeg, image/png"
							className="hidden"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) {
									setValue("thumbnail", file, { shouldValidate: true });
								}
							}}
						/>
						{getValues("thumbnail")?.name ? (
							<>
								<div
									className="h-40 w-64 border border-gray-300 text-xs text-slate-500 p-1 rounded-md text-center cursor-pointer hover:bg-gray-50 transition-colors flex flex-col gap-2 items-center justify-center"
									onClick={() => document.getElementById("thumbnail")?.click()}
								>
									<Image
										src={URL.createObjectURL(getValues("thumbnail"))}
										alt="Thumbnail Preview"
										width={256}
										height={256}
										className="object-cover rounded-md w-48 h-28"
									/>

									<div className="w-full flex justify-center gap-2">
										<Button
											variant="link"
											className="w-16 h-4 text-blue-600 underline cursor-pointer"
										>
											Change
										</Button>

										<Button
											variant="link"
											className="w-16 h-4 text-red-500 underline cursor-pointer"
										>
											Remove
										</Button>
									</div>
								</div>
							</>
						) : (
							<div
								className="h-40 w-64 border-dashed border-2 border-gray-300 text-xs text-slate-500 p-4 rounded-md text-center cursor-pointer hover:bg-gray-50 transition-colors flex flex-col gap-2 items-center justify-center"
								onClick={() => document.getElementById("thumbnail")?.click()}
							>
								<ImagePlus size={18} />
								<p className="underline">Click to select a file</p>
								<p>Support File Type: jpg or png</p>
							</div>
						)}

						{!getValues("thumbnail")?.name && errors.thumbnail ? (
							<p className="text-red-500 text-sm">Please select a thumbnail</p>
						) : errors.thumbnail ? (
							<p className="text-slate-500 text-sm">
								{errors.thumbnail.message}
							</p>
						) : null}
					</div>
					{/* thumbnail upload */}

					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							type="text"
							placeholder="Input title"
							className="w-full"
							{...register("title")}
						/>
						{errors.title && (
							<p className="text-red-500 text-sm">{errors.title.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<ArticleFilterSelect
							categoryList={[]}
							onSelectWithoutQuery={(categoryId) => {
								setValue("category", categoryId, { shouldValidate: true });
							}}
						/>

						{errors.category ? (
							<p className="text-red-500 text-sm">Please select a category</p>
						) : (
							<p className="text-slate-500">
								The existing category list can be seen in the{" "}
								<span className="text-blue-500 underline hover:text-blue-700 duration-300">
									<Link
										href="/admin/category"
										target="_blank"
										rel="noopener noreferrer"
									>
										category
									</Link>
								</span>{" "}
								menu
							</p>
						)}
					</div>

					<div className="space-y-2">
						<ArticleRichTextEditor
							onUpdate={(content, htmlContent) => {
								setValue("content", content, { shouldValidate: true });
							}}
						/>

						{errors.content && (
							<p className="text-red-500 text-sm">{errors.content.message}</p>
						)}
					</div>
				</form>

				<div className="flex justify-end mt-12 gap-2">
					<Button className="bg-white text-slate-900 hover:bg-slate-100 duration-300 cursor-pointer">
						Cancel
					</Button>
					<Button className="bg-slate-200  text-slate-900 hover:bg-slate-300 duration-300 cursor-pointer">
						Preview
					</Button>
					<Button
						type="submit"
						form="article-form"
						className="bg-blue-600 text-slate-50 hover:bg-blue-700 duration-300 cursor-pointer"
					>
						Upload
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdminArticleForm;
