"use client";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	Bold,
	Italic,
	Strikethrough,
	List,
	ListOrdered,
	Undo2,
	Redo2,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { TextAlignButton } from "../tiptap-ui/text-align-button";
import { TextAlign } from "@tiptap/extension-text-align";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) return null;
	return (
		<div className="flex gap-2 border-b p-4 rounded-t-lg text-slate-500">
			<button
				onClick={() => editor.chain().focus().undo().run()}
				type="button"
				title="Undo"
				className={`${
					editor.can().undo()
						? "cursor-pointer"
						: "opacity-50 cursor-not-allowed"
				} px-1`}
			>
				<Undo2 className="w-4 h-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().redo().run()}
				type="button"
				title="Redo"
				className={`${
					editor.can().redo()
						? "cursor-pointer"
						: "opacity-50 cursor-not-allowed"
				} px-1`}
			>
				<Redo2 className="w-4 h-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={`${
					editor.isActive("bold") ? "text-blue-600" : ""
				} cursor-pointer px-1`}
				type="button"
				title="Bold"
			>
				<Bold className="w-4 h-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={`${
					editor.isActive("italic") ? "text-blue-600" : ""
				} cursor-pointer px-1`}
				type="button"
				title="Italic"
			>
				<Italic className="w-4 h-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={`${
					editor.isActive("strike") ? "text-blue-600" : ""
				} cursor-pointer px-1`}
				type="button"
				title="Strikethrough"
			>
				<Strikethrough className="w-4 h-4" />
			</button>

			<span className="flex items-center h-6 mt-1">
				<Separator orientation="vertical" />
			</span>

			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={`${
					editor.isActive("bulletList") ? "text-blue-600" : ""
				} cursor-pointer px-1`}
				type="button"
				title="Bullet List"
			>
				<List className="w-4 h-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={`${
					editor.isActive("orderedList") ? "text-blue-600" : ""
				} cursor-pointer px-1`}
				type="button"
				title="Numbered List"
			>
				<ListOrdered className="w-4 h-4" />
			</button>

			<span className="flex items-center h-6 mt-1">
				<Separator orientation="vertical" />
			</span>

			{/* text alignments */}
			<TextAlignButton align="left" editor={editor} />
			<TextAlignButton align="center" editor={editor} />
			<TextAlignButton align="right" editor={editor} />
		</div>
	);
};

const ArticleRichTextEditor = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({ types: ["paragraph", "headings"] }),
		],
		content: "<p>Type a content...</p>",
		onUpdate: ({ editor }) => {
			// You can handle the content update here if needed
			const emptyText = editor.getText().trim();
			const htmlContent = editor.getHTML();
		},
	});

	const word =
		editor && editor.getText().trim().split(/\s+/)
			? editor.getText().trim().split(/\s+/)
			: [];

	const wordCount = word[0] === "" ? 0 : word.length;

	return (
		<div className="mt-4 border rounded-lg shadow bg-white">
			<MenuBar editor={editor} />
			<EditorContent
				editor={editor}
				className="min-h-[200px] p-4 text-sm outline-none text-slate-500 bg-slate-100/70"
			/>

			<p className="p-4 text-sm text-slate-600">{wordCount} Words</p>
		</div>
	);
};

export default ArticleRichTextEditor;
