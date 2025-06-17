"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";

interface Props {
	children: ReactNode;
}

type User = {
	role: "Admin" | "User";
	token: string;
};

export default function AuthGuard({ children }: Props) {
	const router = useRouter();
	const user: User | null = useReadLocalStorage("user");

	// Redirect to login if user is not authenticated
	// Needs to be used in client components
	useEffect(() => {
		if (!user || user.role !== "User") {
			router.replace("/login");
		}
	}, [router, user]);

	return <>{children}</>;
}
