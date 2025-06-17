"use client";

import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const navbarTitle =
		pathname === "/admin"
			? "Articles"
			: pathname === "/admin/profile"
			? "User Profile"
			: "";

	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full">
				<Navbar logoTheme="light" navbarTitle={navbarTitle} />

				<main className="bg-gray-100 h-[calc(100dvh-4rem)] flex flex-col">
					{/* <SidebarTrigger /> */}
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
};

export default AdminLayout;
