"use client";

import Navbar from "@/components/Navbar/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const navbarTitle =
		pathname === "/admin"
			? "Articles"
			: pathname === "/admin/profile"
			? "User Profile"
			: pathname === "/admin/category"
			? "Category"
			: "";

	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full">
				<Navbar logoTheme="light" navbarTitle={navbarTitle} />

				<main className="bg-gray-100 min-h-[calc(100dvh-4rem)] flex flex-col">
					{/* <SidebarTrigger /> */}
					<div className="fixed left-2 p-2 md:hidden">
						<SidebarTrigger className="w-8 h-8 rounded-full p-3 bg-slate-200 cursor-pointer" />
					</div>
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
};

export default AdminLayout;
