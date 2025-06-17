import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full">
				<Navbar logoTheme="light" navbarTitle="Articles" />

				<main className="bg-gray-100">
					{/* <SidebarTrigger /> */}
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
};

export default AdminLayout;
