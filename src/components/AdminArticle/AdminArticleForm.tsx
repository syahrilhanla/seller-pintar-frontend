"use client";

import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ArticleFilterSelect from "@/components/Article/ArticleFilterSelect";
import ArticleRichTextEditor from "./ArticleRichTextEditor";
import AdminArticleThumbnail from "./AdminArticleThumbnail";

import { ArrowLeft, LoaderCircle } from "lucide-react";

import { fileToBase64 } from "@/lib/helpers";

import { Category } from "@/types/category.type";
import { User } from "@/types/user.type";
import { Article, ArticlePreview } from "@/types/article.type";

const schema = z.object({
	title: z.string().min(1, "Please enter title"),
	category: z.string().min(1, "Please select a category"),
	thumbnail: z
		.instanceof(File)
		.refine(
			(file) => {
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

export type ArticleFormData = z.infer<typeof schema>;

interface Props {
	article: Article | null;
	categoryList: Category[];
}

const AdminArticleForm = ({ article, categoryList }: Props) => {
	const user = useReadLocalStorage<User | null>("user");
	const [preview, setPreview] = useLocalStorage<ArticlePreview>(
		"preview",
		null
	);

	const {
		register,
		unregister,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<ArticleFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: article?.title || "",
			category: article?.categoryId || "",
			content: article?.content || "",
			// thumbnail is using only the imageUrl
		},
	});

	const handlePreview = async () => {
		const thumbnail = await fileToBase64(watch("thumbnail"));

		const previewData = {
			title: watch("title"),
			category: watch("category"),
			content: watch("content"),
			thumbnail: thumbnail,
			user: user,
		};

		// set the preview data in local storage
		setPreview(previewData);

		setTimeout(() => {
			// redirect to the preview page
			window.open("/article/blob/preview", "_blank", "noopener,noreferrer");
		}, 500);
	};

	const onSubmit: SubmitHandler<ArticleFormData> = async (
		data: ArticleFormData
	) => {
		const payload = {
			title: data.title,
			categoryId: data.category,
			content: data.content,
		};

		try {
			const formData = new FormData();
			formData.append("image", data.thumbnail);

			const { data: uploadData } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/upload`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${user?.token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/articles`,
				{
					...payload,
					imageUrl: uploadData.imageUrl,
				},
				{
					headers: {
						Authorization: `Bearer ${user?.token}`,
					},
				}
			);

			toast.success("Article uploaded successfully!");
		} catch (error) {
			toast.error("Failed to upload article. Please try again.");
		}
	};

	const thumbnailData = watch("thumbnail");
	const formComplete =
		watch("title") && watch("category") && watch("content") && thumbnailData;

	return (
		<div className="p-8">
			<div className="p-4 rounded-md border overflow-hidden bg-white">
				<Link href="/admin" className="flex items-center">
					<Button
						variant="ghost"
						className="mb-8 p-0 text-slate-900 cursor-pointer"
					>
						<ArrowLeft className="right-4" />
						Create Articles
					</Button>
				</Link>

				<form
					id="article-form"
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 px-4"
				>
					{/* thumbnail upload */}
					<AdminArticleThumbnail
						thumbnailData={thumbnailData}
						imageUrl={article?.imageUrl || undefined}
						formActions={{
							register,
							unregister,
							setValue,
							errors,
						}}
					/>
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
							categoryList={categoryList}
							defaultCategoryId={article?.categoryId || ""}
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
							onUpdate={(htmlContent) => {
								setValue("content", htmlContent, { shouldValidate: true });
							}}
						/>

						{errors.content && (
							<p className="text-red-500 text-sm">{errors.content.message}</p>
						)}
					</div>
				</form>

				<div className="flex justify-end mt-12 gap-2">
					<Link href="/admin">
						<Button className="bg-white text-slate-900 hover:bg-slate-100 duration-300 cursor-pointer">
							Cancel
						</Button>
					</Link>
					<Button
						className="bg-slate-200  text-slate-900 hover:bg-slate-300 duration-300 cursor-pointer"
						onClick={handlePreview}
						type="button"
						disabled={!formComplete || isSubmitting}
					>
						Preview
					</Button>
					<Button
						type="submit"
						form="article-form"
						className="bg-blue-600 text-slate-50 hover:bg-blue-700 duration-300 cursor-pointer"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<LoaderCircle className="animate-spin" />
						) : (
							"Submit"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdminArticleForm;
