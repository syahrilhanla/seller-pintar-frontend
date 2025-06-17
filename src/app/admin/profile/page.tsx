"use client";

import { useReadLocalStorage } from "usehooks-ts";
import Profile from "@/components/Profile";

import { LoaderCircle } from "lucide-react";
import { User } from "@/types/user.type";

const AdminProfilePage = () => {
	const userData: User | null = useReadLocalStorage("user");

	if (!userData) {
		return (
			<div className="max-w-lg mx-auto flex justify-center items-center h-[calc(100dvh-5rem)]">
				<LoaderCircle
					className="animate-spin mx-auto mt-4 text-blue-600"
					size={24}
				/>
			</div>
		);
	}

	return (
		<div className="p-4 h-full">
			<div className="w-full h-full rounded-lg p-4 bg-white shadow">
				<Profile userData={userData} role="Admin" />
			</div>
		</div>
	);
};

export default AdminProfilePage;
