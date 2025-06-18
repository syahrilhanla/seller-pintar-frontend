"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";

interface Props {
	currentPage: number;
	totalItems: number;
}

const PaginationComponent = ({ currentPage, totalItems }: Props) => {
	const pathname = usePathname();

	const totalPages = Math.ceil(totalItems / 10);
	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	return (
		<Pagination className="mt-8 mb-12 flex justify-center">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`${pathname}?page=${Math.max(1, currentPage - 1)}`}
						className={`${currentPage === 1 ? "hidden" : ""}`}
					>
						Prev
					</PaginationPrevious>
				</PaginationItem>
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							href={`${pathname}?page=${page}`}
							isActive={page === currentPage}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						href={`${pathname}?page=${currentPage + 1}`}
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
