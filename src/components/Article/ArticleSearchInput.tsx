"use client";

import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

const ArticleSearchInput = () => {
	const [search, setSearch] = useState("");

	const [debouncedSearch] = useDebounceValue(search, 500);

	const router = useRouter();
	const searchParams = new URLSearchParams();

	const updateSearchParams = useCallback(() => {
		if (debouncedSearch) {
			searchParams.set("search", debouncedSearch.trim());
			router.push(`/article?${searchParams.toString()}`);
		} else {
			searchParams.delete("search");
			router.push(`/article?${searchParams.toString()}`);
		}

		// eslint-disable-next-line no-console
	}, [debouncedSearch]);

	useEffect(() => {
		updateSearchParams();
	}, [debouncedSearch, updateSearchParams]);

	return (
		<div className="relative w-full">
			<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
				<Search size={18} />
			</span>
			<Input
				placeholder="Search articles"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full pl-10 bg-white text-slate-900"
			/>
		</div>
	);
};

export default ArticleSearchInput;
