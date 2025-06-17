import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<Navbar logoTheme="light" />

			<main>
				{/* <SidebarTrigger /> */}
				{children}
			</main>
		</SidebarProvider>
	);
};

export default AdminLayout;
