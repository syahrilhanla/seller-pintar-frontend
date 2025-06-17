"use client";

import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

const ArticleSearchInput = () => {
	const [search, setSearch] = useState("");

	const [debouncedSearch] = useDebounceValue(search, 500);

	const router = useRouter();
	const pathname = usePathname();

	const searchParams = new URLSearchParams();

	const updateSearchParams = useCallback(() => {
		if (debouncedSearch) {
			searchParams.set("search", debouncedSearch.trim());
		} else {
			searchParams.delete("search");
		}

		router.push(`${pathname}?${searchParams.toString()}`);

		// eslint-disable-next-line no-console
	}, [debouncedSearch]);

	useEffect(() => {
		updateSearchParams();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
