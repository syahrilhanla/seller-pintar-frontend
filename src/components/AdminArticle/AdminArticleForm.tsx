"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ArticleFilterSelect from "@/components/Article/ArticleFilterSelect";

import { ArrowLeft, ImagePlus } from "lucide-react";
import ArticleRichTextEditor from "./ArticleRichTextEditor";

const AdminArticleForm = () => {
	return (
		<div className="p-8">
			<div className="p-4 rounded-md border overflow-hidden bg-white">
				<Button variant="ghost" className="mb-8 p-0 text-slate-900">
					<ArrowLeft className="right-4" />
					Create Articles
				</Button>

				<div className="flex flex-col gap-4 px-4">
					{/* thumbnail upload */}
					<div className="grid w-full max-w-sm items-center gap-3">
						<Label htmlFor="thumbnail">Thumbnail</Label>
						<Input
							id="thumbnail"
							type="file"
							accept="image/jpeg, image/png"
							className="hidden"
						/>
						<div
							className="h-40 w-64 border-dashed border-2 border-gray-300 text-xs text-slate-500 p-4 rounded-md text-center cursor-pointer hover:bg-gray-50 transition-colors flex flex-col gap-2 items-center justify-center"
							onClick={() => document.getElementById("thumbnail")?.click()}
						>
							<ImagePlus size={18} />
							<p className="underline">Click to select a file</p>
							<p>Support File Type: jpg or png</p>
						</div>
					</div>
					{/* thumbnail upload */}

					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							type="text"
							placeholder="Input title"
							className="w-full"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<ArticleFilterSelect
							categoryList={[]}
							onSelectWithoutQuery={(categoryId) => {
								console.log("Selected category ID:", categoryId);
							}}
						/>
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
					</div>

					<ArticleRichTextEditor />
				</div>

				<div className="flex justify-end mt-12 gap-2">
					<Button className="bg-white text-slate-900 hover:bg-slate-100 duration-300 cursor-pointer">
						Cancel
					</Button>
					<Button className="bg-slate-200  text-slate-900 hover:bg-slate-300 duration-300 cursor-pointer">
						Preview
					</Button>
					<Button className="bg-blue-600 text-slate-50 hover:bg-blue-700 duration-300 cursor-pointer">
						Upload
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdminArticleForm;
