import { LogOut, Newspaper, Tag } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
	{
		title: "Articles",
		url: "/admin",
		icon: Newspaper,
	},
	{
		title: "Category",
		url: "/admin/category",
		icon: Tag,
	},
	{
		title: "Logout",
		url: "/admin/logout",
		icon: LogOut,
	},
];

export const AppSidebar = () => {
	return (
		<Sidebar variant="sidebar" color="primary">
			<SidebarHeader>
				<Image
					src="/Logo.svg"
					alt="Logo"
					width={150}
					height={50}
					className="p-4"
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="px-2">
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										className="text-white hover:bg-blue-500 transition-colors duration-200 hover:text-white"
										asChild
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};

export default AppSidebar;
