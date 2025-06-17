"use client";

import { User } from "@/types/user.type";
import { useReadLocalStorage } from "usehooks-ts";
import { LoaderCircle } from "lucide-react";
import Profile from "@/components/Profile";

const UserProfilePage = () => {
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
	return <Profile userData={userData} role="User" />;
};

export default UserProfilePage;
