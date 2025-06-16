import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
	currentPage: number;
	totalItems: number;
}

const PaginationComponent = ({ currentPage, totalItems }: Props) => {
	const totalPages = Math.ceil(totalItems / 9);

	console.log(
		"Total Pages:",
		totalPages,
		"Current Page:",
		currentPage,
		totalItems
	);

	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	return (
		<Pagination className="m-10 flex justify-center">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`/article?page=${Math.max(1, currentPage - 1)}`}
						className={`${currentPage === 1 ? "hidden" : ""}`}
					>
						Prev
					</PaginationPrevious>
				</PaginationItem>
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							href={`/article?page=${page}`}
							isActive={page === currentPage}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						href={`/article?page=${currentPage + 1}`}
						className={`${currentPage === totalPages ? "hidden" : ""}`}
					>
						Next
					</PaginationNext>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationComponent;
