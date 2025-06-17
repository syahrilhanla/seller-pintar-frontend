import { PlusIcon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import ArticleFilterSection from "../Article/ArticleFilterSection";

const DataTable = () => {
	return (
		<div className="p-8">
			<div className="rounded-md border overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow className="bg-white">
							<TableHead colSpan={5} className="p-4">
								Total Articles: 25
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow className="bg-white">
							<TableCell colSpan={5} className="p-4 font-semibold">
								<div className="flex items-center justify-between">
									<ArticleFilterSection role="Admin" />
									<Button className="text-slate-50 cursor-pointer bg-blue-600 hover:bg-blue-500 transition-colors duration-200">
										<PlusIcon />
										Add Articles
									</Button>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default DataTable;
