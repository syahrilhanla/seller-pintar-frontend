import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { ImagePlus } from "lucide-react";

// types from "react-hook-form"
import {
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
	UseFormUnregister,
} from "react-hook-form";
import { ArticleFormData } from "@/components/AdminArticle/AdminArticleForm";

interface Props {
	thumbnailData?: File;
	imageUrl?: string;
	formActions: {
		register: UseFormRegister<ArticleFormData>;
		unregister: UseFormUnregister<ArticleFormData>;
		setValue: UseFormSetValue<ArticleFormData>;
		errors: FieldErrors<ArticleFormData>;
	};
}

const AdminArticleThumbnail = ({
	formActions,
	thumbnailData,
	imageUrl,
}: Props) => {
	const { register, unregister, setValue, errors } = formActions;

	return (
		<div className="grid w-full max-w-sm items-center gap-2">
			<Label htmlFor="thumbnail">Thumbnail</Label>
			<Input
				id="thumbnail"
				{...register("thumbnail")}
				type="file"
				accept="image/jpeg, image/png, image/jpg"
				className="hidden"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) {
						setValue("thumbnail", file, { shouldValidate: true });
					}
				}}
			/>
			{thumbnailData?.name || imageUrl ? (
				<>
					<div className="h-40 w-64 border border-gray-300 text-xs text-slate-500 p-1 rounded-md text-center hover:bg-gray-50 transition-colors flex flex-col gap-2 items-center justify-center">
						<Image
							// if thumbnailData is provided, use it; otherwise, use the imageUrl
							src={
								thumbnailData?.name
									? URL.createObjectURL(thumbnailData)
									: imageUrl!
							}
							alt="Thumbnail Preview"
							width={256}
							height={256}
							className="object-cover rounded-md w-48 h-28"
						/>

						<div className="w-full flex justify-center gap-2">
							<Button
								variant="link"
								className="w-16 h-4 text-blue-600 underline cursor-pointer"
								onClick={() => document.getElementById("thumbnail")?.click()}
							>
								Change
							</Button>

							<Button
								variant="link"
								className="w-16 h-4 text-red-500 underline cursor-pointer"
								onClick={() => {
									unregister("thumbnail");
								}}
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

			{!thumbnailData?.name && errors.thumbnail ? (
				<p className="text-red-500 text-sm">Please select a thumbnail</p>
			) : errors.thumbnail ? (
				<p className="text-slate-500 text-sm">{errors.thumbnail.message}</p>
			) : null}
		</div>
	);
};

export default AdminArticleThumbnail;
