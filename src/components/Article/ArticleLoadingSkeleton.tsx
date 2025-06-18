import { Skeleton } from "@/components/ui/skeleton";

const ArticleLoadingSkeleton = () => {
	return (
		<>
			<Skeleton className="h-5 w-48 mb-2" />
			<Skeleton className="h-10 w-3/4 mb-4" />
			<Skeleton className="w-full h-64 rounded-lg mb-4" />
			<Skeleton className="h-32 w-full mb-4" />
			<div className="w-full mt-4 md:px-8">
				<Skeleton className="h-8 w-40 mb-2" />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} className="h-48 w-full" />
					))}
				</div>
			</div>
		</>
	);
};

export default ArticleLoadingSkeleton;
